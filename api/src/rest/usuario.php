<?php
if(!$_POST){ // Se POST estiver vazio.
    $_POST = json_decode ( file_get_contents ( "php://input" ), true ); //convertendo em array
}

// require_once '../php/LogSistema/Cadastrar.php';

switch ($_POST['metodo']) {

    case 'cadastrarUsuarioCupom':
        cadastrarUsuarioCupom();
        break;

    case 'resetar_senha':
        resetarSenha();
        break;

    case 'redefinir_senha':
        redefinirSenha();
        break;

    case 'mudarsenha':
        mudarsenha();
        break;

    case 'ativarUsuario':
        ativarUsuario();
        break;

    case 'listar':
        listar_usuario();
        break;
    case 'listarInativos':
        listarInativos();
        break;

    case 'cadastrar':
        cadastrar_usuario();
        break;

    case 'atualizar':
        alterar_usuario();
        break;

    case 'deletar':
        deletar();
        break;
    case 'consultar':
        consultar();
        break;

    default;
        break;

}

function cadastrar_usuario()
{
    $data = $_POST['data'];

    /*
        Pessoa
    */
    $objPessoa = new Pessoa();
    $objPessoa
        ->setTipo( 'PF' )
        ->setEmail1( $data['email1'] )
        ->setCelular( $data['celular'] );

    $pessoaControl = new PessoaControl( $objPessoa );
    $resp = $pessoaControl->cadastrar();
    if ( $resp['success'] === false ) die( json_encode( $resp ) );
    $idpessoa = $resp['data'];

    /*
        Pessoa Fisica
    */
    $objPessoaFisica = new Pessoafisica();
    $objPessoaFisica
        ->setObjpessoa( new Pessoa( $idpessoa ) )
        ->setNome( $data['nome'] )
        ->setCpf( $data['cpf'] );

    $PessoafisicaControl = new PessoafisicaControl( $objPessoaFisica );
    $resp = $PessoafisicaControl->cadastrar();
    if ( $resp['success'] === false ) die( json_encode( $resp ) );
    $idpessoafisica = $resp['data'];

    /*
        Usuario
    */
    $obj = new Usuario();
    $obj
        ->setObjpessoafisica( new Pessoafisica( $idpessoafisica ) )
        ->setObjperfil( new Perfil( $data['idperfil'] ) )
        ->setUsuario( $data['usuario'] )
        ->setSenha( $data['senha'] );

    $control = new UsuarioControl( $obj );
    $response = $control->cadastrar();

    echo json_encode( $response );

}

function alterar_usuario()
{
    $data = $_POST['data'];

    /*
        Pessoa
    */
    $objPessoa = new Pessoa();
    $objPessoa
        ->setId( $data['idpessoa'] )
        ->setTipo( $data['tipo'] )
        ->setEmail1( $data['email1'] )
        ->setCelular( $data['celular'] );

    $pessoaControl = new PessoaControl( $objPessoa );
    $resp = $pessoaControl->atualizar();
    if ( $resp['success'] === false ) die( json_encode( $resp ) );
    
    /*
        Pessoa Fisica
    */
    $objPessoaFisica = new Pessoafisica();
    $objPessoaFisica
        ->setId( $data['idpessoafisica'] )
        ->setObjpessoa( new Pessoa( $data['idpessoa']) )
        ->setNome( $data['nome'] )
        ->setCpf( $data['cpf'] );

    $PessoafisicaControl = new PessoafisicaControl( $objPessoaFisica );
    $resp = $PessoafisicaControl->atualizar();
    if ( $resp['success'] === false ) die( json_encode( $resp ) );
    
    /*
        Usuario
    */
    $obj = new Usuario();
    $obj
        ->setId( $data['id'] )
        ->setObjpessoafisica( new Pessoafisica( $data['idpessoafisica'] ) )
        ->setObjperfil( new Perfil( $data['idperfil'] ) )
        ->setUsuario( $data['usuario'] );
    
    $control = new UsuarioControl( $obj );
    $response = $control->atualizar();

    echo json_encode( $response );

}

function resetarSenha()
{
    $parametro['senha'] = "123";
    $data = $_POST['data'];
    $usuario = new Usuario($data['id']);

    $usuario->setSenha(md5($parametro['senha']))
        ->setAtivo(1);

    $uControl = new UsuarioControl($usuario);
    if($uControl->redefinir_senha()){
        echo json_encode(array('result'=> true));
    }else{
        echo json_encode(array('result'=> false, 'msg'=> 'Não foi possível resetar a senha!'));
    }


}


function mudarsenha () {
    $data = $_POST['data'];

    $control = new UsuarioControl();
    $response = $control->mudarSenha( $data );
    echo json_encode( $response );
}

function ativarUsuario () {
    $data = $_POST['data'];

    $control = new UsuarioControl();
    $response = $control->ativarUsuario( $data['id'] );
    echo json_encode( $response );
}

function listar_usuario()
{
    $control = new UsuarioControl(new Usuario());
    $listaDeUsuario = $control->listarTodos();

    echo json_encode($listaDeUsuario);
}

function listarInativos () {
    $control = new UsuarioControl();
    $response = $control->listarInativos();
    echo json_encode( $response );
}

function deletar()
{

    $data = $_POST['data'];

    $obj = new Usuario( $data['id'] );
    
    $Control = new UsuarioControl($obj);
    $response = $Control->deletar();
    if ( $response['success'] === false ) die (json_encode( $response ));

    //deleta pessoa fisica
    // $controlPF = new PessoafisicaControl( new Pessoafisica($data['idpessoafisica']) );
    // $resp = $controlPF->deletar();
    // if ( $resp['success'] === false ) die ( json_encode( $resp ) );

    // // deleta pessoa
    // $controlPessoa = new PessoaControl( new Pessoa( $data['idpessoa']) );
    // $resp = $controlPessoa->deletar();
    // if ( $resp['success'] === false ) die ( json_encode( $resp ) );

    echo json_encode( $response );    
}

function consultar () {
    $data = $_POST['data'];

    $control = new UsuarioControl();
    $response = $control->consultar( $data );
    echo json_encode( $response );
}

function buscarUsuarioPorUsuario () {

        $data = $_POST['data'];

        $obj = new Usuario();
        $obj->setUsuario($data['usuario']);
        $control = new UsuarioControl($obj);
        $obj = $control->buscarPorUsuario();
        echo json_encode($obj);
    }


function redefinirSenha()
{
    $data = $_POST['data'];

    $obj = new Usuario($data['usuario']['idusuario']);
    $control = new UsuarioControl($obj);
    $usuario = $control->buscarPorId();
    if($usuario->getSenha() === $data['atual']){
        $usuario->setSenha($data['nova']);
        $usuario->setAtivo(0);
        $control->setOUsuario($usuario);
        $control->redefinir_senha();

        if($data['idadminempresa']){
            $ae = new AdminEmpresa($data['idadminempresa']);
            $ae->setObservacao("");
            $ae->setStatus('ATIVO');
            $aeCon = new AdminEmpresaControl($ae);
            $aeCon->trocarStatus();
        }

        echo json_encode(array('result' => true));
    }else{
        echo json_encode(array('result' => false));
    }
}


