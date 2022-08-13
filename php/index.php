<?php
    session_start();
    if (!isset($_SESSION['id_usuario'])) {
        header("location: login.php");
        exit;
    }
?>
<!DOCTYPE html>
<html>
<head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script src="../scripts/jquery-ui-1.9.2.custom.min.js"></script>    
    <script src="../scripts/ip.grid.js"></script>
    <script src="../scripts/scripts.js"></script>

    <link href="../css/style.css" rel="stylesheet" />
    <link href="../css/ip.grid.css" rel="stylesheet" />

     <style>
        body {
            font-family: Arial;
            color: white;
            background-color: #3d3d3d;
            margin: 0;
            padding: 10px;
            position:relative;
        }

        a { color:#46b3ff; text-decoration:dotted; }

        .gridContainer {

            position:relative;
            width:100%;
            height:910px;
        }

        #demo {

            width:100%;
            height:100%;
        }
    </style>

    <title>CIMAESC</title>

</head>
<body>
    <h1 id='h1Titulo'>Escala prevista CMI XX/XXXX</h1>
    <input type="button" class="btn-escala" value="MONTAR ESCALA" onclick="montaEscala()">
    <input type="button" class="btn-escala" value="TELA AUXILIAR" onclick="openTelaAux()">
    <input type="button" class="btn-escala" value="AJUSTAR ESCALA" onclick="montaEscala('legenda', true)">
    <input type="button" class="btn-escala" value="SAIR" onclick="window.location.replace('sair.php');">
    <div class="gridContainer">
        <div id="demo"></div>
    </div>
</body>
</html>
