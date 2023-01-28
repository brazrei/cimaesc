<?php
include('showErrors.php');
function get_all_records($con)
{
    //$con = getdb();
    //include('top.php');
    $Sql = "SELECT posto_grad,nome_de_guerra,legenda,email,cpf FROM operadores";
    $result = mysqli_query($con, $Sql);
    $arr_Leg = [];
    if (mysqli_num_rows($result) > 0) {
        echo '';
        while ($row = mysqli_fetch_assoc($result)) {
            /*echo "<tr><td>" . 
            $row['saram']."</td><td>" . 
            $row['email']."</td><td>" . 
            $row['cpf']."</td><td>" . 
            $row['telefone']."</td><td>" . 
            "</td></tr>";        */
            if ($row['legenda'] !== "") {
                $linha = '{ "nome" : "'  . $row['posto_grad'] . ' ' . $row['nome_de_guerra'] . '", "email" : "' . $row['email'] .  '"}';
                //$arr_Leg[$row['legenda']] = $linha;
                $arr_Leg[$row['legenda']] = [];
                $arr_Leg[$row['legenda']]["nome"] = $row['posto_grad'] . ' ' . $row['nome_de_guerra'];
                $arr_Leg[$row['legenda']]["email"] = $row['email'];
                $arr_Leg[$row['legenda']]["cpf"] = $row['cpf'];

             //   echo $linha . '<br>';
            }
        }
        $resp = [];
        $resp['data'] = $arr_Leg;

        $resp['status'] = 'success';

        echo json_encode($resp);

        //include('bottom.php');
    } else {
        echo "Nenhum Operador Cadastrado!";
    }
}

ob_start();
include('connect.php');
ob_end_clean();
get_all_records($con);
$con->close();
