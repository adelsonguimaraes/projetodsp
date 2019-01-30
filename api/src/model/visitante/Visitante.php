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
    private $idpessoa;
    private $idlocal;
    private $nome;
    private $cpfcnpj;
    private $datacadastro;
    private $dataedicao;

    //constutor
    public function __construct
    (
        $id = NULL,
        $idpessoa = NULL,
        $idlocal = NULL,
        $nome = NULL,
        $cpfcnpj = NULL,
        $datacadastro = NULL,
        $dataedicao = NULL
    )
    {
        $this->id   = $id;
        $this->idpessoa = $idpessoa;
        $this->idlocal = $idlocal;
        $this->nome = $nome;
        $this->cpfcnpj = $cpfcnpj;
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
    public function getIdlocal() {
        return $this->idlocal;
    }
    public function setIdlocal($idlocal) {
        $this->idlocal = $idlocal;
        return $this;
    }
    public function getNome() {
        return $this->nome;
    }
    public function setNome($nome) {
        $this->nome = $nome;
        return $this;
    }
    public function getCpfcnpj() {
        return $this->cpfcnpj;
    }
    public function setCpfcnpj($cpfcnpj) {
        $this->cpfcnpj = $cpfcnpj;
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
            "idpessoa"   => $this->idpessoa,
            "idlocal" => $this->idlocal,
            "nome"   => $this->nome,
            "cpfcnpj" => $this->cpfcnpj,
            "datacadastro"  => $this->datacadastro,
            "dataedicao"    => $this->dataedicao
        ];
    }
}

// Classe gerada com BlackCoffeePHP 1.0 - by Adelson Guimarães
?>