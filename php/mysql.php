<?php
include ('showErrors.php');
include ('connect.php');


$sql = "SELECT * FROM operadores;";
//$sql = "INSERT INTO operadores (nome_completo,nome_de_guerra) VALUES ('FABIO ANTUNES DA SILVA','DA SILVA');";

$query = mysqli_query($conn,$sql);


  //output data of each row
  while($row = mysqli_fetch_array($query)) {
    echo "id: " . $row["id"]. " - Nome: " . $row["nome_completo"]. " - Nome de Guerra: " . $row["nome_de_guerra"]. "<br>";
  }

$conn->close();
?>
