angular.module(module).controller('cadvisitanteCtrl', function ($rootScope, $scope, $location, genericAPI, $uibModal, SweetAlert, $timeout, especialCharMask) {
    //Verifica Sessao e permissão de acesso
    if (!$rootScope.usuario) { $location.path("/login"); return false; }

    $scope.title = 'Cadastro de Visita';
    $scope.novo = false;

    $scope.obj = {
        idvisitante: 0,
        idtipovisita: 0,
        nome: '',
        documento: '',
        data: new Date(),
        horario: new Date(moment().format('YYYY-MM-DD HH:mm')),
    }

    $scope.novo = false;
    $scope.cadNovo = function () {
        $scope.novo = true;
    }
    $scope.cancelaNovo = function () {
        $scope.novo = false;

        $scope.obj = {
            idvisitante: 0,
            idtipovisita: 0,
            nome: '',
            documento: '',
            data: new Date(),
            horario: new Date(moment().format('YYYY-MM-DD HH:mm')),
        }
    }

    $scope.visitantes = [];
    $scope.listarVisitantes = function () {
        var data = { "metodo": "listar", "data": '', "class": "visitante", request: 'GET' };

        $rootScope.loadon();

        genericAPI.generic(data)
            .then(function successCallback(response) {
                //se o sucesso === true
                if (response.data.success == true) {
                    $scope.visitantes = response.data.data;
                    $rootScope.loadoff();
                } else {
                    SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
                }
            }, function errorCallback(response) {
                //error
            });	
    }
    $scope.listarVisitantes();

    $scope.tiposvisita = [];
    $scope.listarTipoVisitas = function () {
        var data = { "metodo": "listar", "data": '', "class": "tipovisita", request: 'GET' };

        $rootScope.loadon();

        genericAPI.generic(data)
            .then(function successCallback(response) {
                //se o sucesso === true
                if (response.data.success == true) {
                    $scope.tiposvisita = response.data.data;
                    $scope.obj.idtipovisita = $scope.tiposvisita[0].id;
                    $rootScope.loadoff();
                } else {
                    SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
                }
            }, function errorCallback(response) {
                //error
            });
    }
    $scope.listarTipoVisitas();

    // // veirificando se o usuário já existe
    // $scope.verificaUsuario = function (obj) {
    //     if (obj.cpfcnpj === undefined || obj.cpfcnpj === '') return false;
    //     if (valCPF(obj.cpfcnpj)) {
    //         var data = {
    //             "metodo": "buscarPorCpfCnpj",
    //             "data": obj,
    //             "class": "visitante"
    //         };

    //         $rootScope.loadon();

    //         genericAPI.generic(data)
    //             .then(function successCallback(response) {
    //                 //se o sucesso === true
    //                 if (response.data.success == true) {
    //                     if (response.data.data!==null) {
    //                         $scope.obj.nome = response.data.data.nome;
    //                         $scope.obj.idvisitante = response.data.data.id;
    //                         SweetAlert.swal({ html: true, title: "Atenção", text: "Visitante já cadastrado nesse Local, dados recuperados, siga com o agendamento.", type: "info" });
    //                     }
    //                     $rootScope.loadoff();
    //                 } else {
    //                     SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
    //                 }
    //             }, function errorCallback(response) {
    //                 //error
    //             });	
    //     }
    // }

    $scope.cadastrar = function (obj) {
        
        var copy = angular.copy(obj);
        copy.data = moment(obj.data).format('YYYY-MM-DD');
        copy.horario = moment(obj.horario).format('HH:mm:ss');

        if (moment(copy.data + ' ' + copy.horario).valueOf() <= moment().valueOf()) {
            SweetAlert.swal({ html: true, title: "Atenção", text: "A data do agendamento não pode ser igual ou menor a data e hora atual.", type: "error" });
            return false;
        }

        var data = { 
            "metodo": "cadastrar", 
            "data": copy,
            "class": "visitante", 
            request: 'POST' 
        };

        $rootScope.loadon();

        genericAPI.generic(data)
            .then(function successCallback(response) {
                //se o sucesso === true
                if (response.data.success == true) {
                    $rootScope.loadoff();
                    SweetAlert.swal({ html: true, title: "Sucesso", text: 'Visita cadastrada com sucesso!', type: "success" });

                    $scope.cancelaNovo();
                } else {
                    SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
                }
            }, function errorCallback(response) {
                //error
            });	
    }

});