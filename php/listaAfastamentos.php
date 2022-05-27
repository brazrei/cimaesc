<?php
include ('showErrors.php');
function get_all_records($con){
    //$con = getdb();
    include ('top.php');
    $Sql = "SELECT * FROM afastamentos";
    $result = mysqli_query($con, $Sql);  
    
    if (mysqli_num_rows($result) > 0) {
       echo "<div class='table-responsive'><table id='myTable' class='table table-striped table-bordered'><thead><tr>".
                          "<th>LEGENDA</th>".
                          "<th>NOME DE GUERRA</th>".
                          "<th>DATA INICIO</th>".
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
}

ob_start();
include ('connect.php');
ob_end_clean();
get_all_records($con);
$con->close();
