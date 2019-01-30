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
    private $objvisitante;
    private $data;
    private $horario;
    private $datacadastro;
    private $dataedicao;

    //constutor
    public function __construct
    (
        $id = NULL,
        Visitante $objvisitante = NULL,
        $data = NULL,
        $horario = NULL,
        $datacadastro = NULL,
        $dataedicao = NULL
    )
    {
        $this->id   = $id;
        $this->objvisitante = $objvisitante;
        $this->data = $data;
        $this->horario = $horario;
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
    public function getObjvisitante() {
        return $this->objvisitante;
    }
    public function setObjvisitante($objvisitante) {
        $this->objvisitante = $objvisitante;
        return $this;
    }
    public function getData() {
        return $this->data;
    }
    public function setData($data) {
        $this->data = $data;
        return $this;
    }
    public function getHorario() {
        return $this->horario;
    }
    public function setHorario($horario) {
        $this->horario = $horario;
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
            "objvisitante"   => $this->objvisitante,
            "data" => $this->data,
            "horario"   => $this->horario,
            "datacadastro"  => $this->datacadastro,
            "dataedicao"    => $this->dataedicao
        ];
    }
}

// Classe gerada com BlackCoffeePHP 1.0 - by Adelson Guimarães
?>