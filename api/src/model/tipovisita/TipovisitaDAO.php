<?php

class TipovisitaDAO
{
    private $con;
    private $sql;
    private $obj;
    private $lista = array();
    private $superdao;

    function __construct($con)
    {
        $this->con = $con;
        $this->superdao = new SuperDAO('tipovisita');
    }

    //cadastrar
    function cadastrar (Visita $obj) {
       
        $this->sql = sprintf("INSERT INTO tipovisita(descricao)
        VALUES('%s')",
            mysqli_real_escape_string($this->con, $obj->getDescricao()));

        $this->superdao->resetResponse();

        if(!mysqli_query($this->con, $this->sql)) {
            $this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), get_class( $obj ), 'Cadastrar' ) );
        }else{
            $id = mysqli_insert_id( $this->con );

            $this->superdao->setSuccess( true );
            $this->superdao->setData( $id );
        }
        return $this->superdao->getResponse();
    }

    //atualizar
    function atualizar (Visita $obj) {
        
        $this->sql = sprintf("UPDATE tipovisita SET descricao = '%s', dataedicao = curdate() WHERE id = %d ",
            mysqli_real_escape_string($this->con, $obj->getDescricao()),
            mysqli_real_escape_string($this->con, $obj->getId()));
        
        $this->superdao->resetResponse();

        if(!mysqli_query($this->con, $this->sql)) {
            $this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), get_class( $obj ), 'Atualizar' ) );
        }else{
            $this->superdao->setSuccess( true );
            $this->superdao->setData( true );
        }
        return $this->superdao->getResponse();
    }

    

    //deletar
    function deletar (Visita $obj) {
        $this->superdao->resetResponse();

        // buscando por dependentes
        // $dependentes = $this->superdao->verificaDependentes($obj->getId());
        // if ( $dependentes > 0 ) {
        //     $this->superdao->setMsg( resolve( '0001', $dependentes, get_class( $obj ), 'Deletar' ));
        //     return $this->superdao->getResponse();
        // }

        // $this->sql = sprintf("DELETE FROM tipovisita WHERE id = %d",
        //     mysqli_real_escape_string($this->con, $obj->getId()));

         $this->sql = sprintf("UPDATE tipovisita SET ativo = 'NAO' WHERE id = %d",
            mysqli_real_escape_string($this->con, $obj->getId()));
        $result = mysqli_query($this->con, $this->sql);

        if ( !$result ) {
            $this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), get_class( $obj ), 'Deletar/Desativar' ));
            return $this->superdao->getResponse();
        }

        $this->superdao->setSuccess( true );
        $this->superdao->setData( true );

        return $this->superdao->getResponse();
    }

    /* -- Buscar por ID -- */
    function buscarPorID(Visita $obj)
    {
        $this->sql = sprintf("SELECT * FROM tipovisita WHERE id = %d",
            mysqli_real_escape_string($this->con, $obj->getId()));
        $result = mysqli_query($this->con, $this->sql);

        $this->superdao->resetResponse();

        if(!$result) {
            $this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), get_class( $obj ), 'BuscarPorId' ) );
        }else{
            while($row = mysqli_fetch_object($result)) {
                //classe pessoa
                // $controlPessoa = new PessoaControl(new Pessoa($row->idpessoa));
                // $objPessoa = $controlPessoa->buscarPorId();
                $this->obj = $row;
            }
            $this->superdao->setSuccess( true );
            $this->superdao->setData( $this->obj );
        }
        return $this->superdao->getResponse();
    }

    function listar()
    {
        $this->sql = "SELECT * FROM tipovisita";
        $result = mysqli_query($this->con, $this->sql);

        $this->superdao->resetResponse();

        if(!$result) {
            $this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), 'Pessoa' , 'Listar' ) );
        }else{
            while($row = mysqli_fetch_assoc($result)) {
               array_push($this->lista, $row);
            }
            $this->superdao->setSuccess( true );
            $this->superdao->setData( $this->lista );
        }
        return $this->superdao->getResponse();
    }

    function qtdTotal()
    {
        $this->sql = "SELECT count(*) as quantidade FROM tipovisita";
        $result = mysqli_query($this->con, $this->sql);
        if (!$result) {
            die ('[ERRO]: ' . mysqli_error($this->con));
        }
        $total = 0;
        while ($row = mysqli_fetch_object($result)) {
            $total = $row->quantidade;
        }

        return $total;
    }
}