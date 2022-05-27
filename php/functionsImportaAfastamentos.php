<?php
include ('showErrors.php');

function convertDateToMySQL($date){
	$aux = explode("/",$date);
  if (count ($aux) <3)
    return '"NULL"';
  try { 
    $result = $aux[2]."/".$aux[1]."/".$aux[0];
  } catch (Exception $e) {
    echo $date;
    $result = '"NULL"';
  }
	return $result;
}

function get_all_records_afastamentos($con){
    //$con = getdb();
    include ('top.php');
    $Sql = "SELECT * FROM afastamentos";
    $result = mysqli_query($con, $Sql);  
    
    if (mysqli_num_rows($result) > 0) {
       echo "<div class='table-responsive'><table id='myTable' class='table table-striped table-bordered'><thead><tr>".
                          "<th>LEGENDA</th>".
                          "<th>NOME DE GUERRA</th>".
                          "<th>DATA INICIAL</th>".
                          "<th>DATA FINAL</th>".
                          "<th>DESCRIÇÃO</th>".
                          "</tr></thead><tbody>";
       while($row = mysqli_fetch_assoc($result)) {
         echo "<tr><td>" . 
            $row['legenda']."</td><td>" . 
            $row['nome_de_guerra']."</td><td>" . 
            $row['data_inicio']."</td><td>" . 
            $row['data_fim']."</td><td>" . 
            $row['descricao']."</td><td>" . 
            "</td></tr>";        
       }
    
       echo "</tbody></table></div>";
       include ('bottom.php');
     
    } else {
       echo "Nenhum Afastamento Cadastrado!";
    }
    $con->close();
}

ob_start();

include ('connect.php');

if(isset($_POST["Import"])){
    
    $filename=$_FILES["file"]["tmp_name"];    
     if($_FILES["file"]["size"] > 0)
     {
        $file = fopen($filename, "r");
        echo "Arquivo CSV aberto!";
        while (($getData = fgetcsv($file, 10000, ",")) !== FALSE) {
          echo $getData[0];
          
          if ($getData[0] !== "" && $getData[1] !== "" && $getData[2] !== "" && $getData[3] !== "" && $getData[5] !== ""){ 
            $inicio = convertDateToMySQL($getData[2]);
            $fim = convertDateToMySQL($getData[3]);
            $sql = "INSERT INTO afastamentos (legenda,nome_de_guerra,data_inicio,data_fim,descricao) values ('".$getData[0]."','".$getData[1]."','".$inicio."','".$fim."','".$getData[5]."')";
            echo $sql;
            $result = mysqli_query($con, $sql);
            echo $result;
          }
        }

        fclose($file);  
        //ob_end_clean();
        get_all_records_afastamentos($con);

    } 
  }   else {
    echo "Favor selecionar um arquivo .csv!";
  }
  $con->close();
 ?>
