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

Class Usuario implements JsonSerializable {
    //atributos
    private $id;
    private $objpessoafisica;
    private $objperfil;
    private $usuario;
    private $senha;
    private $ativo;
    private $datacadastro;
    private $dataedicao;

    //constutor
    public function __construct
    (
        $id = NULL,
        Pessoafisica $objpessoafisica = NULL,
        Perfil $objperfil = NULL,
        $usuario = NULL,
        $senha = NULL,
        $ativo = NULL,
        $datacadastro = NULL,
        $dataedicao = NULL
    )
    {
        $this->id   = $id;
        $this->objpessoafisica  = $objpessoafisica;
        $this->objperfil    = $objperfil;
        $this->usuario  = $usuario;
        $this->senha    = $senha;
        $this->ativo    = $ativo;
        $this->datacadastro = $datacadastro;
        $this->dataedicao   = $dataedicao;
    }

    public function setData ( $data ) {
        $this->id   = ( !empty($data['id']) ) ? $data['id'] : NULL;
        $this->objpessoafisica  = ( !empty($data['idpessoafisica']) ) ? new Pessoafisica( $data['idpessoafisica'] ) : NULL;
        $this->objperfil    = ( !empty($data['idperfil']) ) ? new Perfil( $data['idperfil'] ) : NULL;
        $this->usuario  = ( !empty($data['usuario']) ) ? $data['usuario'] : NULL;
        $this->senha    = ( !empty($data['senha']) ) ? $data['senha'] : NULL;
        $this->ativo    = ( !empty($data['ativo']) ) ? $data['ativo'] : NULL;
        $this->datacadastro = ( !empty($data['datacadastro']) ) ? $data['datacadastro'] : NULL;
        $this->dataedicao   = ( !empty($data['dataedicao']) ) ? $data['dataedicao'] : NULL;
    }

    //Getters e Setters
    public function getId() {
        return $this->id;
    }
    public function setId($id) {
        $this->id = $id;
        return $this;
    }
    public function getObjpessoafisica() {
        return $this->objpessoafisica;
    }
    public function setObjpessoafisica($objpessoafisica) {
        $this->objpessoafisica = $objpessoafisica;
        return $this;
    }
    public function getObjperfil() {
        return $this->objperfil;
    }
    public function setObjperfil($objperfil) {
        $this->objperfil = $objperfil;
        return $this;
    }
    public function getUsuario() {
        return $this->usuario;
    }
    public function setUsuario($usuario) {
        $this->usuario = $usuario;
        return $this;
    }
    public function getSenha() {
        return $this->senha;
    }
    public function setSenha($senha) {
        $this->senha = $senha;
        return $this;
    }
    public function getAtivo() {
        return $this->ativo;
    }
    public function setAtivo($ativo) {
        $this->ativo = $ativo;
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
            "objpessoafisica"   => $this->objpessoafisica,
            "objperfil" => $this->objperfil,
            "usuario"   => $this->usuario,
            "senha" => $this->senha,
            "ativo" => $this->ativo,
            "datacadastro"  => $this->datacadastro,
            "dataedicao"    => $this->dataedicao
        ];
    }
}

// Classe gerada com BlackCoffeePHP 1.0 - by Adelson Guimarães
?>