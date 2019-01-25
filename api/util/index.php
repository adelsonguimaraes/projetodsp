<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
</head>
<body>
<div class="container">
<?php


    require_once 'Pessoa.php';
    require_once 'Pessoafisica.php';
    require_once 'Pessoajuridica.php';
    require_once 'Conexao.php';

/*
    $pj = new Pessoajuridica();
    $pj->setTipo('PJ');
    $pj->setCnpj('02123321000101');
    $pj->setRazaosocial('Corretores online');
    $pj->setInsmunicipal('8879001');

    $pjControl = new PessoajuridicaControl($pj);

    echo '<pre>';
    var_dump($pjControl->cadastrarPJ());



    $pf = new Pessoafisica();
    $pf->setTipo('PF');
    $pf->setNome('Fabiano Costa');
    $pf->setRg('1379126-5');
    $pf->setEmail('fabiano_81@hotmail.com');
    $pf->setSexo('M');


    $pfCopntrol = new PessoafisicaControl($pf);
echo '<pre>';
    var_dump($pfCopntrol->cadastrarPF());
*/

$pessoaControl = new PessoaControl(new Pessoa());
echo '<pre>';
var_dump( $pessoaControl->listarPessoas() );


?>
</div>



</body>
</html>