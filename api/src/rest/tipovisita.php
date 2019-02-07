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

	$obj = new Tipovisita(
		NULL,
		$data['descricao']
	);
	$control = new TipovisitaControl($obj);
	$response = $control->cadastrar();
	if ($response['success']===false) die(json_encode($response));

	$response = $visitaControl->cadastrar();
	echo json_encode($response);
}
function buscarPorId () {
	$data = $_POST['data'];
	$control = new TipovisitaControl(new Tipovisita($data['id']));
	$obj = $control->buscarPorId();
	if(!empty($obj)) {
		echo json_encode($obj);
	}
}
function listar () {
	$control = new TipovisitaControl();
	$lista = $control->listar();
	if(!empty($lista)) {
		echo json_encode($lista);
	}
}
function atualizar () {
	$data = $_POST['data'];
	$obj = new Tipovisita(
		$data['descricao']
	);
	$control = new TipovisitaControl($obj);
	$response = $control->atualizar();
	echo json_encode($response);
}
function deletar () {
	$data = $_POST['data'];
	$banco = new Tipovisita();
	$banco->setId($data['id']);
	$control = new TipovisitaControl($banco);
	echo $control->deletar();
}


// Classe gerada com BlackCoffeePHP 1.0 - by Adelson Guimarães
?>