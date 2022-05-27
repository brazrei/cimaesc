<?php
include ('showErrors.php');
function get_all_records($con){
    //$con = getdb();
    include ('top.php');
    $Sql = "SELECT * FROM operadores";
    $result = mysqli_query($con, $Sql);  
    
    if (mysqli_num_rows($result) > 0) {
       echo "<div class='table-responsive'><table id='myTable' class='table table-striped table-bordered'><thead><tr>".
                          "<th>SARAM</th>".
                          "<th>POSTO / GRAD</th>".
                          "<th>NOME DE GUERRA</th>".
                          "<th>NOME COMPLETO</th>".
                          "<th>LEGENDA</th>".
                          "<th>EMAIL</th>".
                          "<th>CPF</th>".
                          "<th>TELEFONE</th>".
                          "</tr></thead><tbody>";
       while($row = mysqli_fetch_assoc($result)) {
         echo "<tr><td>" . 
            $row['saram']."</td><td>" . 
         		$row['posto_grad']."</td><td>" . 
         		$row['nome_de_guerra']."</td><td>" . 
         		$row['nome_completo']."</td><td>" . 
         		$row['legenda']."</td><td>" . 
            $row['email']."</td><td>" . 
            $row['cpf']."</td><td>" . 
            $row['telefone']."</td><td>" . 
            "</td></tr>";        
       }
    
       echo "</tbody></table></div>";
       include ('bottom.php');
     
    } else {
       echo "Nenhum Operador Cadastrado!";
    }
    //$con->close();
}

ob_start();

include ('connect.php');

if(isset($_POST["Import"])){
    
    $filename=$_FILES["file"]["tmp_name"];    
     if($_FILES["file"]["size"] > 0)
     {
        $file = fopen($filename, "r");
        while (($getData = fgetcsv($file, 10000, ",")) !== FALSE) {
          $sql = "INSERT INTO operadores (posto_grad,quadro,saram,legenda,nome_completo,nome_de_guerra,email,cpf,telefone) values ('".$getData[0]."','".$getData[1]."','".$getData[2]."','".$getData[3]."','".$getData[4]."','".$getData[5]."','".$getData[6]."','".$getData[7]."','".$getData[8]."')";
          //echo "'".$getData[0]."','".$getData[1]."','".$getData[2]."','".$getData[3]."','".$getData[4]."')";
          
          $result = mysqli_query($con, $sql);
        }
        /*
        if(!isset($result)){
          echo "<script type=\"text/javascript\"> alert(\"Invalid File:Please Upload CSV File.\"); window.location = \"index.php\" </script>";    
        }
        else {
          echo "<script type=\"text/javascript\"> alert(\"CSV File has been successfully Imported.\"); window.location = \"index.php\" </script>";
        }*/

        fclose($file);  
        ob_end_clean();
        get_all_records($con);

    } 
  }   else {
    echo "Favor selecionar um arquivo .csv!";
  }
  $con->close();
 ?>
