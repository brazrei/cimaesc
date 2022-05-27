<?php
$servername = "localhost";
$username = "cimaer";
$password = "cimaer";
$database = 'cimaer';

// Create connection
try {
$con = new mysqli($servername, $username, $password,$database);
} catch (exception $e) {
  echo "Connection failed: " .$e->getMessage();
}
//$mysqli = mysqli_connect($databaseHost, $databaseUsername, $databasePassword, $databaseName); 

// Check connection
if ($con->connect_error) {
  die("Connection failed: " . $con->connect_error);
}

echo 'Conectado, com sucesso, ao Banco de Dados do CIMAER!'.'<br><br>';

?>
