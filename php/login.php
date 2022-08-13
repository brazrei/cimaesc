<?php
require_once 'CLASSES/usuarios.php';
$u = new Usuario;
?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="css/estilo.css" rel="stylesheet">
    <title>CimaEsc - Login</title>
    <link rel="stylesheet" href="../css/style.css">
</head>

<body>
    <div>
    <form action="" method="post">
        <h1>CimaEsc</h1>
        <p>Faça login para continuar</p>

        <div class="input-group">
            <label>Email</label>
            <input type="text" name="email" placeholder="Digite seu email" value="<?php echo htmlspecialchars($_POST['email']); ?>" required>
        </div>

        <div class="input-group">
            <label>Senha</label>
            <input type="password" name="senha" placeholder="Digite sua senha" value="<?php echo htmlspecialchars($_POST['senha']); ?>" required>
        </div>

        <p><button class="btn-blue" type="submit">Acessar</button></p>

        <a href="cadastrar.php">Ainda não tenho cadastro</a>

    </form>
    <?php
    if (isset($_POST['email'])) {
        $email = addslashes($_POST['email']);
        $senha = addslashes($_POST['senha']);

        if (!empty($email) && !empty($senha)) {
            $u->conectar("cimaer", "localhost", "cimaer", "cimaer");

            if ($u->getMsgErro() == "") { //conexao com o db ok
                if ($u->logar($email, $senha)) {
                    // login ok
                    header("location: index.php");
                } else {
                    ?>
                        <div class="msg-erro">
                            <?php echo "Erro: " . $u->getMsgErro(); ?>
                        </div>
                    <?php
                }
            }
        }
    }
    ?>
    </div>
</body>

</html>