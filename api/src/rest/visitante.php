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
	case 'buscarPorCpfCnpj':
		buscarPorCpfCnpj();
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

	$idvisitante = $data['idvisitante'];
	if ($idvisitante===0) {

		$obj = new Visitante(
			NULL,
			$data['nome'],
			$data['documento']
		);
		$control = new VisitanteControl($obj);
		$response = $control->cadastrar();
		if ($response['success']===false) die(json_encode($response));

		$idvisitante = $response['data'];
	}


	// visita
	$objvisita = new Visita();
	$objvisita->setIdpessoa($usuario['idpessoa'])
			->setIdtipovisita($data['idtipovisita'])
			->setIdlocal($usuario['idlocal'])
			->setObjvisitante(new Visitante($idvisitante))
			->setDatainicio($data['datainicio'])
			->setDataFim($data['comperiodo'] ? $data['datafim'] : $data['datainicio']) // se tem periodo
			->setHorario($data['horario']);
    $visitaControl = new VisitaControl($objvisita);
    $response = $visitaControl->cadastrar();
	if ($response['success']===false) die(json_encode($response));
	$idvisita = $response['data'];

	// periodo
	if ($data['comperiodo']) {
		foreach ($data['periodo'] as $key => $value) {
			if ($value) {
				$controlPeriodoVisita = new PeriodovisitaControl(
					new Periodovisita(
						NULL,
						new Visita ($idvisita),
						strtoupper($key)
					)
				);
				$response = $controlPeriodoVisita->cadastrar();
				if ($response['success']===false) die(json_encode($response));
			}
		}
	}

	echo json_encode($response);
}
function buscarPorId () {
	$data = $_POST['data'];
	$control = new VisitanteControl(new Visitante($data['id']));
	$obj = $control->buscarPorId();
	if(!empty($obj)) {
		echo json_encode($obj);
	}
}

function buscarPorCpfCnpj () {
	$data = $_POST['data'];
	$control = new VisitanteControl();
	$resp = $control->buscarPorCpfCnpj($data['cpfcnpj']);
	echo json_encode($resp);
}

function listar () {
	$data = $_POST['data'];
	$usuario = $_POST['usuario'];

	$control = new VisitanteControl();
	$lista = $control->listar($usuario['idpessoa']);
	if(!empty($lista)) {
		echo json_encode($lista);
	}
}
function atualizar () {
	$data = $_POST['data'];
	$obj = new Visitante(
		$data['id'],
		$usuario['idpessoa'],
        $usuario['idlocal'],
        $data['nome'],
		$data['documento']
	);
	$control = new VisitanteControl($obj);
	$response = $control->atualizar();
	echo json_encode($response);
}
function deletar () {
	$data = $_POST['data'];
	$banco = new Visitante();
	$banco->setId($data['id']);
	$control = new VisitanteControl($banco);
	echo $control->deletar();
}


// Classe gerada com BlackCoffeePHP 1.0 - by Adelson Guimarães
?>