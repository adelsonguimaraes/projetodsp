<?php
// model : usuario

/*
    Projeto: AdminPCE.
    Project Owner: Priscila.
    Gerente de Projeto: Nilton Caldas Jr.
    Desenvolvedor: Adelson Guimarães Monteiro.
    Data de início: 02/05/2017.
    Data Atual: 22/05/2017.
*/

Class Visita implements JsonSerializable {
    //atributos
    private $id;
    private $idpessoa;
    private $idtipovisita;
    private $idlocal;
    private $objvisitante;
    private $idspirit;
    private $data;
    private $horario;
    private $ativo;
    private $datacadastro;
    private $dataedicao;

    //constutor
    public function __construct
    (
        $id = NULL,
        $idpessoa = NULL,
        $idtipovisita = NULL,
        $idlocal = NULL,
        Visitante $objvisitante = NULL,
        $idspirit = NULL,
        $datainicio = NULL,
        $datafim = NULL,
        $horario = NULL,
        $status = NULL,
        $datacadastro = NULL,
        $dataedicao = NULL
    )
    {
        $this->id   = $id;
        $this->idpessoa = $idpessoa;
        $this->idtipovisita = $idtipovisita;
        $this->idlocal  = $idlocal;
        $this->objvisitante = $objvisitante;
        $this->idspirit = $idspirit;
        $this->datainicio = $datainicio;
        $this->datafim = $datafim;
        $this->horario = $horario;
        $this->status = $status;
        $this->datacadastro = $datacadastro;
        $this->dataedicao   = $dataedicao;
    }

    //Getters e Setters
    public function getId() {
        return $this->id;
    }
    public function setId($id) {
        $this->id = $id;
        return $this;
    }
    public function getIdpessoa() {
        return $this->idpessoa;
    }
    public function setIdpessoa($idpessoa) {
        $this->idpessoa = $idpessoa;
        return $this;
    }
    public function getIdtipovisita() {
        return $this->idtipovisita;
    }
    public function setIdtipovisita($idtipovisita) {
        $this->idtipovisita = $idtipovisita;
        return $this;
    }
    public function getIdlocal() {
        return $this->idlocal;
    }
    public function setIdlocal($idlocal) {
        $this->idlocal = $idlocal;
        return $this;
    }
    public function getObjvisitante() {
        return $this->objvisitante;
    }
    public function setObjvisitante($objvisitante) {
        $this->objvisitante = $objvisitante;
        return $this;
    }
    public function getIdspirit() {
        return $this->idspirit;
    }
    public function setIdspirit($idspirit) {
        $this->idspirit = $idspirit;
        return $this;
    }
    public function getDatainicio() {
        return $this->datainicio;
    }
    public function setDatainicio($datainicio) {
        $this->datainicio = $datainicio;
        return $this;
    }
    public function getDatafim() {
        return $this->datafim;
    }
    public function setDatafim($datafim) {
        $this->datafim = $datafim;
        return $this;
    }
    public function getHorario() {
        return $this->horario;
    }
    public function setHorario($horario) {
        $this->horario = $horario;
        return $this;
    }
    public function getStatus() {
        return $this->status;
    }
    public function setStatus($status) {
        $this->status = $status;
        return $this;
    }
    public function getDatacadastro() {
        return $this->datacadastro;
    }
    public function setDatacadastro($datacadastro) {
        $this->datacadastro = $datacadastro;
        return $this;
    }
    public function getDataedicao() {
        return $this->dataedicao;
    }
    public function setDataedicao($dataedicao) {
        $this->dataedicao = $dataedicao;
        return $this;
    }

    //Json Serializable
    public function JsonSerialize () {
        return [
            "id"    => $this->id,
            "idpessoa" => $this->idpessoa,
            "idtipovisita" => $this->idtipovisita,
            "idlocal"   => $this->idlocal,
            "objvisitante"   => $this->objvisitante,
            "idspirit" => $this->idspirit,
            "data" => $this->data,
            "horario"   => $this->horario,
            "ativo" => $this->ativo,
            "datacadastro"  => $this->datacadastro,
            "dataedicao"    => $this->dataedicao
        ];
    }
}

// Classe gerada com BlackCoffeePHP 1.0 - by Adelson Guimarães
?>