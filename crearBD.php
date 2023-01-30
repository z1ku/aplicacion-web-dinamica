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

                        ('rec8kkCmSiMkbkiko',
                        'arco largo',
                        '2023/01/08',
                        25.5,
                        'https://mortisdraco.com/wp-content/uploads/2019/10/989626-Rattanbogen-kurz56bb8c8479fd5.jpg',
                        'arco'),

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

                        ('recGD4JRZnbpRHpoy',
                        'espada matadragones',
                        '2023/01/02',
                        359.45,
                        'https://static.wikia.nocookie.net/el-continente-de-arcadia-campana-de-dnd-5e/images/f/f3/Dragonslayer.jpeg/revision/latest?cb=20190406052316&path-prefix=es',
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

                        ('recvKMNR3YFw0bEt3',
                        'gladius',
                        '2023/01/06',
                        35.15,
                        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Uncrossed_gladius.jpg/800px-Uncrossed_gladius.jpg',
                        'espada'),

                        ('recxaXFy5IW539sgM',
                        'doomhammer',
                        '2023/01/06',
                        35.15
                        'https://static.wikia.nocookie.net/wow/images/8/8d/Doomhammer.jpg/revision/latest?cb=20130815234819&path-prefix=es',
                        'martillo')
                        ;");
    $sentencia->execute();

    echo "Datos insertados correctamente<br>--------------------------------------<br>";

    header( "refresh:3;url=index.html" );
?>