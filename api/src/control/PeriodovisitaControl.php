<?php


Class PeriodovisitaControl {
	//atributos
	protected $con;
	protected $obj;
	protected $objDAO;

	//construtor
	public function __construct(Periodovisita $obj=NULL) {
		$this->con = Conexao::getInstance()->getConexao();
		$this->objDAO = new PeriodovisitaDAO($this->con);
		$this->obj = $obj;
	}

	//metodos
	function cadastrar () {
		return $this->objDAO->cadastrar($this->obj);
	}
	function buscarPorId () {
		return $this->objDAO->buscarPorId($this->obj);
	}
	function listar ($idvisita) {
		return $this->objDAO->listar($idvisita);
	}
	function atualizar () {
		return $this->objDAO->atualizar($this->obj);
	}
	function deletar () {
		return $this->objDAO->deletar($this->obj);
	}
	function listarPaginado ($start, $limit) {
	return $this->objDAO->listarPaginado($start, $limit);
	}
	function qtdTotal () {
		return $this->objDAO->qtdTotal();
	}
}

// Classe gerada com BlackCoffeePHP 1.0 - by Adelson Guimarães
?>