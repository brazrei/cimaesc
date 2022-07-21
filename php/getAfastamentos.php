<?php
include('showErrors.php');
function get_all_records($con)
{
    //$con = getdb();
    //include('top.php');
    $Sql = "SELECT legenda,data_inicio,data_fim,descricao,carga_horaria FROM afastamentos";
    $result = mysqli_query($con, $Sql);
    $arr_Leg = [];
    $cont = 0;
    if (mysqli_num_rows($result) > 0) {
        echo '';
        while ($row = mysqli_fetch_assoc($result)) {
            $cont++;
            /*echo "<tr><td>" . 
            $row['saram']."</td><td>" . 
            $row['email']."</td><td>" . 
            $row['cpf']."</td><td>" . 
            $row['telefone']."</td><td>" . 
            "</td></tr>";        */
            if ($row['legenda'] !== "") {
                $risaer = "";

                if (strtoupper($row['descricao']) == 'RISAER')
                    $risaer = 'RISAER';
                $carga = $row['carga_horaria'];
                $linha = $row['data_inicio'] . "," . $row['data_fim'] . $risaer . "," . $carga;
                $arr_Leg[$cont . "-" . $row['legenda']] = $linha;
                //   echo $linha . '<br>';
            }
        }
        echo json_encode($arr_Leg);

        //include('bottom.php');
    } else {
        echo "Nenhum Afastamento Encontrado!";
    }
}

ob_start();
include('connect.php');
ob_end_clean();
get_all_records($con);
$con->close();
