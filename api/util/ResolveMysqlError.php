<?php
// util : resolve

/*
	Projeto: AdminPCE.
	Project Owner: Priscila.
	Gerente de Projeto: Nilton Caldas Jr.
	Desenvolvedor: Adelson Guimarães Monteiro.
	Data de início: 02/05/2017.
	Data Atual: 22/05/2017.
*/

// resolve mysql erro
function resolve ( $cod, $msgerror, $class, $metodo ) {
	$msg = "<strong>Atenção!</strong> Ocorreu um erro, por favor contate o suporte.";

	switch ( $cod ) {

		case '0001':
			$msg .= "<br><strong>[Código]:</strong> ". $cod;
			$msg .= "<br><strong>[Ocorrência]:</strong> Impossível remover este dado, existem ".$msgerror." registro(s) depente(s).";
			$msg .= "<br><strong>[Classe]:</strong> " . $class;
			$msg .= "<br><strong>[Metodo]:</strong> " . $metodo;
			// $msg .= "<br><strong>[Log]:</strong>: " . $msgerror;
			break;

		case '1054':
			$msg .= "<br><strong>[Código]:</strong> ". $cod;
			$msg .= "<br><strong>[Ocorrência]:</strong> Tentativa manipulação em um campo inexistente.";
			$msg .= "<br><strong>[Classe]:</strong> " . $class;
			$msg .= "<br><strong>[Metodo]:</strong> " . $metodo;
			$msg .= "<br><strong>[Log]:</strong>: " . $msgerror;
			break;

		case '1146':
			$msg .= "<br><strong>[Código]:</strong> ". $cod;
			$msg .= "<br><strong>[Ocorrência]:</strong> Tentativa acesso a uma tabela inexistente.";
			$msg .= "<br><strong>[Classe]:</strong> " . $class;
			$msg .= "<br><strong>[Metodo]:</strong> " . $metodo;
			$msg .= "<br><strong>[Log]:</strong> " . $msgerror;
			break;

		case '1452':
			$msg .= "<br><strong>[Código]:</strong> ". $cod;
			$msg .= "<br><strong>[Ocorrência]:</strong> Tentativa de cadastro de uma chave estrangeira inexistente.";
			$msg .= "<br><strong>[Classe]:</strong> " . $class;
			$msg .= "<br><strong>[Metodo]:</strong> " . $metodo;
			$msg .= "<br><strong>[Log]:</strong> " . $msgerror;
			break;

		case '1451':
			$msg .= "<br><strong>[Código]:</strong> ". $cod;
			$msg .= "<br><strong>[Ocorrência]:</strong> Tentativa de exclusão de dados que contém dependentes.";
			$msg .= "<br><strong>[Classe]:</strong> " . $class;
			$msg .= "<br><strong>[Metodo]:</strong> " . $metodo;
			$msg .= "<br><strong>[Log]:</strong> " . $msgerror;
			break;

		case '1064':
			$msg .= "<br><strong>[Código]:</strong> ". $cod;
			$msg .= "<br><strong>[Ocorrência]:</strong> Erro de Sintax no código SQL.";
			$msg .= "<br><strong>[Classe]:</strong> " . $class;
			$msg .= "<br><strong>[Metodo]:</strong> " . $metodo;
			$msg .= "<br><strong>[Log]:</strong> " . $msgerror;
			break;

		default:
			$msg .= "<br><strong>[Código]:</strong> ". $cod;
			$msg .= "<br><strong>[Ocorrência]:</strong>: Indefinida.";
			$msg .= "<br><strong>[Classe]:</strong> " . $class;
			$msg .= "<br><strong>[Metodo]:</strong> " . $metodo;
			$msg .= "<br><strong>[Log]:</strong> " . $msgerror;
			break;
	}

	return  '<p style="text-align:center;">' . $msg . '</p>';
}


?>