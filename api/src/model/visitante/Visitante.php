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

Class Visitante implements JsonSerializable {
    //atributos
    private $id;
    private $nome;
    private $documento;
    private $datacadastro;
    private $dataedicao;

    //constutor
    public function __construct
    (
        $id = NULL,
        $nome = NULL,
        $documento = NULL,
        $datacadastro = NULL,
        $dataedicao = NULL
    )
    {
        $this->id   = $id;
        $this->nome = $nome;
        $this->documento = $documento;
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
    public function getNome() {
        return $this->nome;
    }
    public function setNome($nome) {
        $this->nome = $nome;
        return $this;
    }
    public function getDocumento() {
        return $this->documento;
    }
    public function setDocumento($documento) {
        $this->documento = $documento;
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
            "nome"   => $this->nome,
            "documento" => $this->documento,
            "datacadastro"  => $this->datacadastro,
            "dataedicao"    => $this->dataedicao
        ];
    }
}

// Classe gerada com BlackCoffeePHP 1.0 - by Adelson Guimarães
?>