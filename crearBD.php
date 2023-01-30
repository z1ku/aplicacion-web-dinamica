<?php
    include "functions.php";
    include "config.php";

    $conexion=conectarBD($dbhost,$dbuser,$dbpass);

    $sentencia=$conexion->prepare("DROP DATABASE IF EXISTS $dbname");
    $sentencia->execute();
    echo "Base de datos anterior borrada<br>-------------------------<br>";

    $sentencia=$conexion->prepare("CREATE DATABASE IF NOT EXISTS $dbname");
    $sentencia->execute();
    echo "Base de datos nueva creada<br>-------------------------<br>";

    $conexion->select_db($dbname);

    echo "Base de datos seleccionada <br>-------------------------<br>";

    $sentencia=$conexion->prepare("CREATE TABLE IF NOT EXISTS $dbtable(
                                id VARCHAR(20),
                                name VARCHAR(50),
                                date date,
                                price DECIMAL(6,2),
                                image VARCHAR(500),
                                category VARCHAR(30),
                                PRIMARY KEY(id));");
    $sentencia->execute();
    echo "Tabla creada correctamente<br>-----------------------------------------<br>";


    $sentencia=$conexion->prepare("INSERT INTO $dbtable VALUES 
                        ('rec43w3ipXvP28vog',
                        'espada bastarda',
                        '2023/01/05',
                        30.5,
                        'https://eltiromedieval.com/9047-large_default/espada-bastarda-magnus-3-calimacil.jpg',
                        'espada'),

                        ('rec4f2RIftFCb7aHh',
                        'coraza de templario',
                        '2023/01/02',
                        55.25,
                        'https://lojareidasespadas.com/24556-home_default/peto-templario-para-armadura-peto-de-los-caballeros-templarios-la-orden-de-los-pobres-caballeros-de-cristo-latin-pauperes-commil.jpg',
                        'armadura'),

                        ('reclotisftFCb7aHh',
                        'trozeadora',
                        '2023/01/02',
                        188.25,
                        'https://m.media-amazon.com/images/I/31N26zwjIaL._AC_SY1000_.jpg',
                        'hacha'),

                        ('rec8kkCmSiMkbkiko',
                        'arco largo',
                        '2023/01/08',
                        25.5,
                        'https://mortisdraco.com/wp-content/uploads/2019/10/989626-Rattanbogen-kurz56bb8c8479fd5.jpg',
                        'arco'),

                        ('recquomSiMkbkiko',
                        'sable pistola',
                        '2023/01/08',
                        99.5,
                        'https://i.seadn.io/gae/pUOxk4cgkjcARhgnHbUD6tw3_u80vaRdk3m0GcaZDIiFVicVAxqzdNodY5oiDCE_TPMO6WUMxAX1k_PaTmHUH6H2KcUDwtOPdhZHfA?auto=format&w=1000',
                        'espada'),

                        ('recBohCqQsot4Q4II',
                        'martillo de guerra',
                        '2023/01/08',
                        45.2,
                        'https://lacasadelrecreador-431a.kxcdn.com/5837-large_default/martillo-de-armas.jpg',
                        'martillo'),

                        ('recDG1JRZnbpRHpoy',
                        'hacha corrupta',
                        '2023/01/01',
                        225.35,
                        'https://www.zonadisfraces.com/16568-thickbox_default/hacha-gigante-skeleton.jpg',
                        'hacha'),

                        ('recDeekyZnbpRHpoy',
                        'leon dorado',
                        '2023/01/01',
                        255.35,
                        'https://www.enfieldsports.com/wp-content/uploads/2021/02/King-Llane-World-Of-Warcraft-Sword.jpg',
                        'espada'),

                        ('recWAHDERZnbpRHpoy',
                        'arco elfico',
                        '2023/01/01',
                        95.35,
                        'https://i.pinimg.com/474x/e1/63/c8/e163c865a428ee846eae2cacbe42bbfe.jpg',
                        'arco'),

                        ('recxaxyfeoFCb7aHh',
                        'matadioses',
                        '2023/01/20',
                        235.5,
                        'https://m.media-amazon.com/images/I/712x9Y3xnxL.jpg',
                        'hacha'),

                        ('recGD4JRZnbpRHpoy',
                        'espada matadragones',
                        '2023/01/02',
                        359.45,
                        'https://madswords.us/media/catalog/product/b/e/berserk-guts-dragon-slayer-sword-black.png',
                        'espada'),

                        ('recjMK1jgTb2ld7sv',
                        'yelmo de gladiador',
                        '2023/01/04',
                        45.35,
                        'https://www.eviltailors.com/77462-large_default_2x/gladiator-maximus-helmet-with-spikes-16-mm-steel-with-leather-liner.jpg',
                        'armadura'),

                        ('recmg2a1ctaEJNZhu',
                        'escudo de torre',
                        '2023/01/04',
                        65.35,
                        'https://www.larpdistribution.com/wp-content/uploads/2021/02/MCI-3719.png',
                        'armadura'),

                        ('recOP4a1ctaEJNZhu',
                        'casco vikingo',
                        '2023/01/18',
                        65.35,
                        'https://i.etsystatic.com/21866880/r/il/d28060/2559748272/il_570xN.2559748272_jp6c.jpg',
                        'armadura'),

                        ('recvKMNR3YFw0bEt3',
                        'gladius',
                        '2023/01/06',
                        35.15,
                        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Uncrossed_gladius.jpg/800px-Uncrossed_gladius.jpg',
                        'espada'),

                        ('recHGJ13YFw0bEt4',
                        'agonía de escarcha',
                        '2023/01/06',
                        200.25,
                        'https://mlyazqwnm7ri.i.optimole.com/cb:mrhB.22221/w:auto/h:auto/q:mauto/f:avif/id:8af6a418af48e62828d71febb3a8cfff/https://www.espadasymas.com/Espada-Frostmourne-Real-de-Acero.jpg',
                        'espada'),

                        ('recxaXFy5IW539sgM',
                        'doomhammer',
                        '2023/01/06',
                        35.15,
                        'https://mlyazqwnm7ri.i.optimole.com/cb:mrhB.22221/w:auto/h:auto/q:mauto/f:avif/id:aa0d2806a7c1142142541ae819c396a3/https://www.espadasymas.com/MTA0MTQtbWFydGlsbG8tZG9vbWhhbW1lci13b3JsZC1vZi13YXJjcmFmdC05NTMyLmpwZzE5MDgwMjE1NDc0Mw3D3D.jpg',
                        'martillo')
                        ;");
    if($sentencia->execute()){
        echo "Datos insertados correctamente<br>--------------------------------------<br>";
    }else{
        echo $sentencia->error();
    }

    header( "refresh:3;url=index.html" );
?>