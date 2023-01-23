"use strict"

//DOM Para mensaje informativo
const alerta=document.querySelector(".alerta");

//DOM Para filtros
const busqueda=document.querySelector(".buscador-input");
const contenedor_productos=document.querySelector(".contenedor_productos");
const categorias=document.querySelector(".categorias");

const precio=document.querySelector(".precio-filtro");
const limite_maximo=document.querySelector(".valor-precio");

const btn_fecha=document.querySelector(".btn-fecha");
const inp_fecha1=document.querySelector(".fecha-filtro1");
const inp_fecha2=document.querySelector(".fecha-filtro2");

//DOM Para el modal
const modal=document.querySelector(".modal");
const cerrar_modal=document.querySelector(".close-btn");
const contenido_modal=document.querySelector(".modal-content");

//DOM Para el carrito
const carrito=document.querySelector(".cart-overlay");
const cerrar_carrito=document.querySelector(".cart-close");
const carrito_productos=document.querySelector(".cart-items");
const abrir_carrito=document.querySelector(".carrito-btn");
const borrar_carrito=document.querySelector(".cart-borrar");
const comprar_carrito=document.querySelector(".cart-comprar");
const total_carrito=document.querySelector(".cart-total");

//CONTROL DE LOS ELEMENTOS EMERGENTES
cerrar_modal.addEventListener("click",()=>{
    modal.classList.remove("open");
});

abrir_carrito.addEventListener("click",()=>{
    carrito.classList.add("show");
});

cerrar_carrito.addEventListener("click",()=>{
    carrito.classList.remove("show");
});

//FILTRO DE FECHA
/////////////////////////////////////////////////////////////////////////
btn_fecha.addEventListener("click",()=>{
    let filtro=[];
    let limite_inferior=new Date(inp_fecha1.value);
    let limite_superior=new Date(inp_fecha2.value);

    limite_inferior.setHours(0);
    limite_superior.setHours(0);

    lista.forEach(item=>{
        let fecha=new Date(item.date);
        if(fecha>=limite_inferior && fecha<=limite_superior){
            filtro.push(item);
        }
    });

    if(filtro.length==0){
        contenedor_productos.innerHTML=`<h3 clas="filter_error">No hay elementos que coincidan con tu búsqueda</h3>`;
    }else{
        renderizar(filtro,contenedor_productos,crearProducto);
    }
});

//FILTRO DE PRECIO
precio.addEventListener("change",() => {
    let filtro;
    let limite = precio.value;
    //ACTUALIZAR EL LIMITE
    limite_maximo.innerText="Limite de precio aplicado: "+limite+" gold";
    //RENDERIZAR EL CONTENIDO
    filtro=lista.filter(item=>item.price<=limite);
    if(filtro.length==0){
        contenedor_productos.innerHTML=`<h3 clas="filter_error">No hay elementos que coincidan con tu búsqueda</h3>`;
    }else{
        renderizar(filtro,contenedor_productos,crearProducto);
    }
});

//FILTRO DE BUSQUEDA
busqueda.addEventListener("keyup",() => {
    let filtro;
    let texto_busqueda = busqueda.value.trim().toLowerCase();
    if (texto_busqueda === "") {
        //NO FILTRAR  
        filtro=[...lista];    
    } else {
        filtro=lista.filter(item=>item.name.toLowerCase().includes (texto_busqueda));
    }
    //RENDERIZAR EL CONTENIDO EN FUNCION DEL FILTRO
    if(filtro.length===0){
        contenedor_productos.innerHTML=`<h3 class="filter_error">No hay elementos que coincidan con tu búsqueda</h3>`;
    }else{
        renderizar(filtro,contenedor_productos,crearProducto);
    }
});

Inicializar();

function Inicializar(){
    //RENDERIZAR LOS PRODUCTOS
    renderizar(lista,contenedor_productos,crearProducto);
  
    //CONSEGUIR UN ARRAY CON LAS CATEGORIAS SIN REPETICION
    const lista_categorias=lista.map(item=>item.category).filter((c,i,array)=>array.indexOf(c)===i);
  
    // CREAR LOS BOTONES DE CADA CATEGORIA PARA EL FILTRO
    categorias.innerHTML=`<button class="categoria-btn">Todas</button>`;
    lista_categorias.forEach(item=>{
        categorias.innerHTML+=`<button class="categoria-btn">${item}</button>`;
    });
  
    //FILTRO POR CATEGORIAS
    categorias.addEventListener("click",(evento) => {
        const activado = evento.target;
        if (activado.matches(".categoria-btn")) {
            //SEGUN QUE CATEGORIA SE HAYA PULSADO 
            //FILTRAR Y RENDERIZAR DE NUEVO
            let filtro;
            if(activado.innerHTML.toLowerCase()==="todas"){
                filtro=[...lista];
            }else{
                filtro=lista.filter(item=>item.category.toLowerCase()===activado.innerText.toLowerCase());
            }
            renderizar(filtro,contenedor_productos,crearProducto);
        }
    })

    //ACTUALIZAR MAXIMO FILTRO DE PRECIO
    const maximo=Math.ceil(lista.map(item=>item.price).sort((a,b)=>b-a)[0]);
    precio.setAttribute("max",maximo);
    precio.value=maximo;
    limite_maximo.innerHTML="Limite de precio aplicado: "+maximo+" gold";

    //ESTABLECER FECHA POR DEFECTO
    ////////////////////////////////////////////////////////////////
    let fecha_actual=new Date().toJSON().slice(0, 10);

    inp_fecha1.setAttribute("value",fecha_actual);
    inp_fecha2.setAttribute("value",fecha_actual);
}

//AL PRINCIPIO COMPLETAR EL CARRITO SI EL LOCALSTORAGE TIENE ALGO
let lista_carrito = JSON.parse(localStorage.getItem("carrito") ?? "[]");

//RENDERIZAR EL CARRITO INICIALMENTE
renderizar(lista_carrito,carrito_productos,crearItemCarrito);

//===========FUNCIONES AUXILIARES============================================
function renderizar(lista_objetos, contenedor_dom, creador_dom) {
    contenedor_dom.innerHTML = "";
    lista_objetos.forEach((item)=>{
        const dom_item=creador_dom(item);
        contenedor_dom.appendChild(dom_item);
    });
}

function crearProducto(p) {
    const producto = document.createElement("article");
    producto.innerHTML = `<article class="product">
      <div class="product-container" data-id="${p.id}">
        <img src="${p.image}" class="product-img img" alt="${p.name}" />
        <div class="product-icons">
          <button class="product-modal-btn product-icon" ">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
      <footer>
        <h4 class="product-name">${p.name}</h4>
        <p class="product-price">Precio: ${p.price} gold coins</p>
        <p class="product-category">Categoria: ${p.category}</p>
        <p class="product-date">Fecha: ${p.date}</p>
      </footer>
    </article> `;
  
    //ABRIR MODAL PARA PRODUCTO
    const lupa = producto.querySelector(".product-modal-btn");
    lupa.addEventListener('click',(evento)=>{
        const contenedor_padre = evento.currentTarget.parentElement.parentElement;
        const id = contenedor_padre.getAttribute("data-id");

        const item_buscado=lista.find(item=>item.id===id);
        contenido_modal.children[0].src=item_buscado.image;
        contenido_modal.children[1].innerText=item_buscado.id;
        contenido_modal.children[2].innerText=item_buscado.name;
        contenido_modal.children[3].innerText="Precio: "+item_buscado.price+" gold";
        modal.classList.add("open");
    });
    
    return producto;
}

//AÑADIR PRODUCTO AL CARRO
const btn_carrito = document.querySelector(".product-cart-btn");
btn_carrito.addEventListener('click',(evento)=>{
    const id_producto = evento.currentTarget.previousElementSibling.previousElementSibling.previousElementSibling.innerText;

    const buscado=lista.find(p=>p.id===id_producto);

    if(lista_carrito.find(p=>p.id===buscado.id)){
        mostrarMensaje("El objeto ya está en la bolsa","danger");
        modal.classList.remove("open");
    }else{
        lista_carrito.push(buscado);

        const nuevo_item_carrito=crearItemCarrito(buscado);
        carrito_productos.appendChild(nuevo_item_carrito);

        localStorage.setItem("carrito",JSON.stringify(lista_carrito));

        modal.classList.remove("open");

        mostrarMensaje("Objeto añadido a la bolsa","success");
    }
});

//BORRAR TODO EL CARRITO
borrar_carrito.addEventListener("click",()=>{
    if(lista_carrito.length==0){
        mostrarMensaje("No has comprado nada todavia","danger");
        carrito.classList.remove("show");
    }else{
        lista_carrito=[];
        localStorage.setItem("carrito",JSON.stringify(lista_carrito));

        total_carrito.innerText="Total: 0 gold";

        mostrarMensaje("Bolsa vaciada con éxito","success");
        carrito.classList.remove("show");
    }
    renderizar(lista_carrito,carrito_productos,crearItemCarrito);
});

//FINALIZAR COMPRA
comprar_carrito.addEventListener("click",()=>{
    if(lista_carrito.length==0){
        mostrarMensaje("No has comprado nada todavia","danger");
        carrito.classList.remove("show");
    }else{
        lista_carrito=[];
        localStorage.setItem("carrito",JSON.stringify(lista_carrito));

        total_carrito.innerText="Total: 0 gold";

        mostrarMensaje("Compra realizada","success");
        carrito.classList.remove("show");
    }
    renderizar(lista_carrito,carrito_productos,crearItemCarrito);
});

function crearItemCarrito(datos_item) {
    const nuevo_item = document.createElement('article');
    nuevo_item.classList.add('cart-item');
    nuevo_item.setAttribute('data-id', datos_item.id);
    nuevo_item.innerHTML = `
    <img src="${datos_item.image}" class="cart-item-img" alt="${datos_item.name}"/>  
    <div>
        <h4 class="cart-item-name">${datos_item.name}</h4>
        <p class="cart-item-price">Precio: ${datos_item.price} gold</p>
        <input type="number" class="cantidad-input" min="0" value="">
        <button class="cart-restar-cantidad">-</button>
        <button class="cart-sumar-cantidad">+</button>
        <button class="cart-item-remove-btn">Eliminar</i></button>
    </div>`;
    
    let cantidad_producto=nuevo_item.querySelector(".cantidad-input");

    //SUMAR CANTIDAD DE PRODUCTO
    const btn_sumar_producto=nuevo_item.querySelector(".cart-sumar-cantidad");
    btn_sumar_producto.addEventListener("click",()=>{
        let valor=cantidad_producto.value;
        valor=20;
        cantidad_producto.setAttribute("value",valor);

        renderizar(lista_carrito,carrito_productos,crearItemCarrito);
    });

    //RESTAR CANTIDAD DE PRODUCTO
    const btn_restar_producto=nuevo_item.querySelector(".cart-restar-cantidad");
    btn_restar_producto.addEventListener("click",()=>{
        
    });

    //BORRAR PRODUCTO DEL CARRITO
    const btn_borrar_producto=nuevo_item.querySelector(".cart-item-remove-btn");
    btn_borrar_producto.addEventListener("click",(evento)=>{
        const contenido_producto=evento.currentTarget.parentElement.parentElement;
        const clave_producto=contenido_producto.getAttribute("data-id");
        lista_carrito.findIndex(p=>p.id===clave_producto);
        lista_carrito.splice(1,0);
        localStorage.setItem("carrito", JSON.stringify(lista_carrito));
        contenido_producto.remove();
        renderizar(lista_carrito,carrito_productos,crearItemCarrito);
    });
    
    return nuevo_item;
}

function mostrarMensaje(texto, clase) {
    alerta.innerHTML = `<h3>${texto}</h3>`;
  
    alerta.classList.add(clase);

    setTimeout(() => {
        alerta.innerText = "";
        alerta.classList.remove(clase);
    }, 2000);
}

