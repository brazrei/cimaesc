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
}

ob_start();
include ('connect.php');
ob_end_clean();
get_all_records($con);
$con->close();
