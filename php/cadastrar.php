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
    <link href="../css/style.css" rel="stylesheet">
    <title>Cadastro de Usuários</title>
</head>

<body>
    <div>
        <form action="" method="post">
            <h1>CimaEsc - Cadastro de Usuário</h1>
            <p>Preencha os dados abaixo:</p>

            <div class="input-group">
                <label>Email</label>
                <input type="email" name="email" placeholder="Digite seu email" value="<?php echo htmlspecialchars($_POST['email']); ?>" required>
            </div>

            <div class="input-group">
                <label>Nome</label>
                <input type="text" name="nome" placeholder="Digite seu nome" value="<?php echo htmlspecialchars($_POST['nome']); ?>" minlength="5" required>
            </div>

            <div class="input-group">
                <label>Senha</label>
                <input type="password" name="senha" placeholder="Digite sua senha" value="<?php echo htmlspecialchars($_POST['senha']); ?>" minlength="6" required>
            </div>

            <div class="input-group">
                <label>Confirme a Senha</label>
                <input type="password" name="confSenha" placeholder="Confirme sua senha" value="<?php echo htmlspecialchars($_POST['confSenha']); ?>" required>
            </div>

            <button class="btn-blue" type="submit">Cadastrar</button>

        </form>

    <?php
    if (isset($_POST['nome'])) {
        $nome = addslashes($_POST['nome']);
        $telefone = addslashes($_POST['telefone']);
        $email = addslashes($_POST['email']);
        $senha = addslashes($_POST['senha']);
        $confirmarSenha = addslashes($_POST['confSenha']);

        if (!empty($nome) && !empty($email) && !empty($senha) && !empty($confirmarSenha)) {
            $u->conectar("cimaer", "localhost", "cimaer", "cimaer");
            //echo "Conectado!";

            if ($u->getMsgErro() == "") { //conexao com o db ok
                
                if ($senha == $confirmarSenha) {
                    if ($u->cadastrar($nome, $telefone, $email, password_hash($senha, PASSWORD_DEFAULT))) {
    ?>
                        <div id="msg-sucesso">
                            Cadastrado com sucesso! Acesse para entrar!
                        </div>
                    <?php
                    } else {
                    ?>
                        <div class="msg-erro">
                            <?php echo "Erro: " . $u->getMsgErro(); ?>
                        </div>
                    <?php
                    }
                } else {
                    ?>
                    <div class="msg-erro">
                        Senha não confere com a senha confirmada!
                    </div>
                <?php
                }
            } else {
                ?>
                <div class="msg-erro">
                    Preencha todos os campos obrigatórios!
                </div>
    <?php
            }
        }
    }
    ?>
    </div>
</body>

</html>