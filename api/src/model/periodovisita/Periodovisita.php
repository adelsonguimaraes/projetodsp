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

Class Periodovisita implements JsonSerializable {
    //atributos
    private $id;
    private $idvisita;
    private $dia;
    private $datacadastro;
    
    //constutor
    public function __construct
    (
        $id = NULL,
        Visita $idvisita = NULL,
        $dia = NULL,
        $datacadastro = NULL
    )
    {
        $this->id   = $id;
        $this->idvisita = $idvisita;
        $this->dia = $dia;
        $this->datacadastro = $datacadastro;
    }

    //Getters e Setters
    public function getId() {
        return $this->id;
    }
    public function setId($id) {
        $this->id = $id;
        return $this;
    }
    public function getIdvisita() {
        return $this->idvisita;
    }
    public function setIdvisita($idvisita) {
        $this->idvisita = $idvisita;
        return $this;
    }
    public function getDia() {
        return $this->dia;
    }
    public function setDia($dia) {
        $this->dia = $dia;
        return $this;
    }
    public function getDatacadastro() {
        return $this->datacadastro;
    }
    public function setDatacadastro($datacadastro) {
        $this->datacadastro = $datacadastro;
        return $this;
    }
    
    //Json Serializable
    public function JsonSerialize () {
        return [
            "id"    => $this->id,
            "idvisita" => $this->idvisita,
            "dia" => $this->dia,
            "datacadastro"  => $this->datacadastro
        ];
    }
}

// Classe gerada com BlackCoffeePHP 1.0 - by Adelson Guimarães
?>