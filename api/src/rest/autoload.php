<?php
/*
	Projeto: AdminSPE.
	Project Owner: Priscila.
	Gerente de Projeto: Nilton Caldas Jr.
	Desenvolvedor: Adelson Guimarães Monteiro.
	Data de início: 02/05/2017.
	Data Atual: 07/05/2017.
*/

// header('Content-type:application/json; charset=utf-8');

/* Trata $_POST */
if(!$_POST){ $_POST =  file_get_contents ( "php://input" ); }
$_POST = json_decode ($_POST, true);

/*
	Require da Conex�o
*/
require_once("../../util/Conexao.php");

/*
	Require da Resolve
*/
require_once("../../util/ResolveMysqlError.php");


/*
	Fun��o AutoLoad, Carrega as Classes quando
	tenta-se criar uma nova instancia de uma Classe.
	Exemplo: new Cupom(), new UsuarioDAO(), new EmpresaControl()... 
*/
function carregaClasses($class){
	/*
		Verifica se existe "Control" no nome da classe
	*/
//  	if(strripos($class, "Control")) {
	if(strrpos($class, "Control")) {
 		/*	require na Control */ 
 		require_once("../control/".$class.".php");
 	}
 	/*
		Verifica se existe "Control" no nome da classe
	*/
 	else if(strrpos($class, "DAO")) {
 		/* Monta o nome da Bean */
 		$bean = strtolower(substr($class, 0, strrpos($class, "DAO")));
 		/*	require na DAO */
 		require_once "../model/".$bean."/".$class.".php";
 	/*
		Se n�o for DAO nem Control � Model.
	*/
 	}else{
 		/* Monta o nome da Bean */
 		$bean = strtolower($class);
 		/*	require na model */
 		require_once "../model/".$bean."/".$class.".php";
 	}
}

/*
	Chama o AutoLoad
*/
spl_autoload_register("carregaClasses");

/*
	Geta o Rest
*/
function getRest($class) {
	if($class) {
		require_once $class.".php";
	}
}

/*
	Chama a fun��o GetRest
*/
getRest($_POST['class']);

?>