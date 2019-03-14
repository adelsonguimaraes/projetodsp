<?php

//inclui autoload
require_once 'autoload.php';

//verifica requisição
switch ($_POST['metodo']) {
	case 'cadastrar':
		cadastrar();
		break;
	case 'buscarPorId':
		buscarPorId();
		break;
	case 'listar':
		listar();
		break;
	case 'listarTudo':
		listarTudo();
		break;
	case 'historico':
		historico();
		break;
	case 'atualizar':
		atualizar();
		break;
	case 'deletar':
		deletar();
		break;
}

function cadastrar () {
    $data = $_POST['data'];
	$usuario = $_POST['usuario'];

	$visitaControl = new VisitaControl(
        new Visita(
            NULL, //id
			$usuario['idpessoa'],
			$data['idtipovisita'],
			$usuario['idlocal'],
			new Visitante($data['idvisitante']),
			NULL,
			$data['data'],
            $data['horario']
        )
    );
    $response = $visitaControl->cadastrar();
	echo json_encode($response);
}
function buscarPorId () {
	$data = $_POST['data'];
	$control = new VisitaControl(new Visitante($data['id']));
	$obj = $control->buscarPorId();
	if(!empty($obj)) {
		echo json_encode($obj);
	}
}

function listar () {
	$data = $_POST['data'];
	$usuario = $_POST['usuario'];

	$control = new VisitaControl();
	$lista = $control->listar($usuario['idpessoa']);
	echo json_encode($lista);
}
function listarTudo () {
	$data = $_POST['data'];
	$usuario = $_POST['usuario'];

	$control = new VisitaControl();
	$lista = $control->listarTudo($usuario['idpessoa']);
	echo json_encode($lista);
}
function historico () {
	$data = $_POST['data'];
	$usuario = $_POST['usuario'];

	$control = new VisitaControl();
	$lista = $control->historico($data['idvisitante']);
	echo json_encode($lista);
}
function atualizar () {
	$data = $_POST['data'];
	$usuario = $_POST['usuario'];

	$obj = new Visita(
		$data['id'], //id
		$usuario['idpessoa'],
		$data['idtipovisita'],
		$usuario['idlocal'],
		new Visitante($data['idvisitante']),
		NULL,
		$data['datainicio'],
		$data['datafim'],
		$data['horario'],
		$data['status']
	);
	$control = new VisitaControl($obj);
	$response = $control->atualizar();
	echo json_encode($response);
}
function deletar () {
	$data = $_POST['data'];
	$banco = new Visitante();
	$banco->setId($data['id']);
	$control = new VisitaControl($banco);
	echo $control->deletar();
}


// Classe gerada com BlackCoffeePHP 1.0 - by Adelson Guimarães
?>