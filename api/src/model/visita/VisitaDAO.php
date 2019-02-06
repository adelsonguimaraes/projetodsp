<?php

class VisitaDAO
{
    private $con;
    private $sql;
    private $obj;
    private $lista = array();
    private $superdao;

    function __construct($con)
    {
        $this->con = $con;
        $this->superdao = new SuperDAO('visita');
    }

    //cadastrar
    function cadastrar (Visita $obj) {
       
        $this->sql = sprintf("INSERT INTO visita(idpessoa, idtipovisita, idlocal, idvisitante, data, horario)
        VALUES(%d, %d, %d, %d, '%s', '%s')",
            mysqli_real_escape_string($this->con, $obj->getIdpessoa()),
            mysqli_real_escape_string($this->con, $obj->getIdtipovisita()),
            mysqli_real_escape_string($this->con, $obj->getIdlocal()),
            mysqli_real_escape_string($this->con, $obj->getObjvisitante()->getId()),
            mysqli_real_escape_string($this->con, $obj->getData()),
            mysqli_real_escape_string($this->con, $obj->getHorario()));
            // mysqli_real_escape_string($this->con, $obj->getAtivo()));

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
        
        $this->sql = sprintf("UPDATE visita SET idpessoa = %d, idtipovisita = %d, idlocal = %d, idvisitante = %d, data = '%s', horario = '%s', dataedicao = curdate() WHERE id = %d ",
            mysqli_real_escape_string($this->con, $obj->getIdpessoa()),
            mysqli_real_escape_string($this->con, $obj->getIdtipovisita()),
            mysqli_real_escape_string($this->con, $obj->getIdlocal()),
            mysqli_real_escape_string($this->con, $obj->getObjvisitante()->getId()),
            mysqli_real_escape_string($this->con, $obj->getData()),
            mysqli_real_escape_string($this->con, $obj->getHorario()),
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

        // $this->sql = sprintf("DELETE FROM visita WHERE id = %d",
        //     mysqli_real_escape_string($this->con, $obj->getId()));

         $this->sql = sprintf("UPDATE visita SET ativo = 'NAO' WHERE id = %d",
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
        $this->sql = sprintf("SELECT * FROM visita WHERE id = %d",
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

    /* -- Listar Todos -- */
    function listarTodos()
    {
        $this->sql = "SELECT usu.*, vp.id AS 'idpessoa', vp.tipo, vp.idpjpf AS 'idpessofisica', vp.nome, vp.cpfcnpj AS 'cpf', vp.email1, vp.celular, p.nome AS 'perfil', IFNULL(vpcol.nome, 'NENHUM') AS 'colegio'";
        $this->sql .= " FROM visita usu";
        $this->sql .= " INNER JOIN view_pessoa vp ON vp.idpjpf = usu.idpessoafisica AND vp.tipo = 'PF'";
        $this->sql .= " LEFT JOIN colegiovisita colu ON colu.idvisita = usu.id";
        $this->sql .= " LEFT JOIN colegio col ON col.id = colu.idcolegio";
        $this->sql .= " LEFT JOIN view_pessoa vpcol ON vpcol.idpjpf = col.idpessoajuridica AND vpcol.tipo = 'PJ'";
        $this->sql .= " INNER JOIN perfil p ON p.id = usu.idperfil";
        $this->sql .= " WHERE usu.ativo = 'SIM'";
        $this->sql .= " ORDER BY usu.id DESC";
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

        return $this->lista;
    }

    // function listarInativos () {
    //     $this->sql = "SELECT usu.*, vp.id AS 'idpessoa', vp.tipo, vp.idpjpf AS 'idpessofisica', vp.nome, vp.cpfcnpj AS 'cpf', vp.email1, vp.celular, p.nome AS 'perfil', IFNULL(vpcol.nome, 'NENHUM') AS 'colegio'";
    //     $this->sql .= " FROM visita usu";
    //     $this->sql .= " INNER JOIN view_pessoa vp ON vp.idpjpf = usu.idpessoafisica AND vp.tipo = 'PF'";
    //     $this->sql .= " LEFT JOIN colegiovisita colu ON colu.idvisita = usu.id";
    //     $this->sql .= " LEFT JOIN colegio col ON col.id = colu.idcolegio";
    //     $this->sql .= " LEFT JOIN view_pessoa vpcol ON vpcol.idpjpf = col.idpessoajuridica AND vpcol.tipo = 'PJ'";
    //     $this->sql .= " INNER JOIN perfil p ON p.id = usu.idperfil";
    //     $this->sql .= " WHERE usu.ativo = 'NAO'";
    //     $this->sql .= " ORDER BY usu.id DESC";

    //     $result = mysqli_query($this->con, $this->sql);

    //     $this->superdao->resetResponse();

    //     if(!$result) {
    //         $this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), 'Pessoa' , 'Listar' ) );
    //     }else{
    //         while($row = mysqli_fetch_assoc($result)) {
    //            array_push($this->lista, $row);
    //         }
    //         $this->superdao->setSuccess( true );
    //         $this->superdao->setData( $this->lista );
    //     }
    //     return $this->superdao->getResponse();

    //     return $this->lista;
    // }

    function listarPaginado($start, $limit)
    {
        $this->sql = "SELECT * FROM visita LIMIT " . $start . ", " . $limit;
        $result = mysqli_query($this->con, $this->sql);
        if (!$result) {
            die ('[ERRO]: ' . mysqli_error($this->con));
        }
        while ($row = mysqli_fetch_assoc($result)) {
            $lista [] = $row;
        }
        return $lista;
    }

    function qtdTotal()
    {
        $this->sql = "SELECT count(*) as quantidade FROM visita";
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

    /* -- Listar Por Nome -- */
    function listarPorNome(Visita $obj)
    {
        /* -- SQL PASSANDO COM %s(String do sprtintf) o percente % do LIKE -- */
        $this->sql = sprintf("SELECT * FROM visita WHERE nome like '%s%s%s' ",
            mysqli_real_escape_string($this->con, '%'),
            mysqli_real_escape_string($this->con, $obj->getNome()),
            mysqli_real_escape_string($this->con, '%'));

        $result = mysqli_query($this->con, $this->sql);
        if (!$result) {
            die ('[ERRO]: ' . mysqli_error($this->con));
        }
        while ($row = mysqli_fetch_object($result)) {

            // busca o perfil desse visita
            $perfil = new Perfil ($row->idperfil);
            $perfilControl = new PerfilControl ($perfil);
            $perfil = $perfilControl->buscarPorId();

            $this->obj = new Visita ($row->id, $row->nome, $row->visita, $row->senha, $row->email, $row->ativo, $row->telefone, $row->datacadastro, $row->dataedicao, $perfil);

            $this->lista [] = $this->obj;
        }

        return $this->lista;
    }

    // function consultar (  $criterio ) {

    //     /*
    //         Buscamos as pessoas que respondem ao critério digitado na busca
    //     */
    //     $pessoaControl = new PessoaControl();
    //     $resp = $pessoaControl->consultar( $criterio );
    //     if ( $resp['success'] === false ) return $resp;
    //     $pessoas = $resp['data'];

    //     $this->superdao->resetResponse();

    //     /*
    //         verificamos se essas pessoas jão são usuários
    //         caso já sejam usuários ficam foram das opções de retorno
    //     */
    //     foreach ( $pessoas as $key ) {
    //         $resp = $this->buscarPorPessoaFisica( $key['idpjpf'] );
    //         if ( $resp['success'] === false ) return $resp;
    //         if ( empty($resp['data']) ) array_push( $this->lista, $key );
    //     }

    //     $this->superdao->setSuccess( true );
    //     $this->superdao->setData( $this->lista );

    //     return $this->superdao->getResponse();

    // }
}