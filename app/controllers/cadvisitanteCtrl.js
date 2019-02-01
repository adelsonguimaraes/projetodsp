angular.module(module).controller('cadvisitanteCtrl', function ($rootScope, $scope, $location, genericAPI, $uibModal, SweetAlert, $timeout, especialCharMask) {
    //Verifica Sessao e permissão de acesso
    if (!$rootScope.usuario) { $location.path("/login"); return false; }

    $scope.title = 'Cadastro de Visita';

    $scope.obj = {
        idvisitante: 0,
        nome: '',
        cpfcnpj: '',
        data: '',
        horario: '',
    }

    $rootScope.listarTarefas = function () {
        // verificando se o filtro está preenchido
        if ($scope.filtro !== "") {
            $scope.filtrarMinhasTarefas($scope.filtro);
            return false;
        }
        
        var data = { "metodo": "listarMinhasTarefas", "data": '', "class": "agenda", request: 'GET' };

        $rootScope.loadon();

        genericAPI.generic(data)
            .then(function successCallback(response) {
                //se o sucesso === true
                if (response.data.success == true) {
                    $scope.tarefasOrigem = response.data.data;
                    $scope.tarefas = grouped(response.data.data);
                    $scope.setaTipoView($scope.view.tipo);
                    $rootScope.loadoff();
                } else {
                    SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
                }
            }, function errorCallback(response) {
                //error
            });	
    }

    // veirificando se o usuário já existe
    $scope.verificaUsuario = function (obj) {
        if (obj.cpfcnpj === undefined || obj.cpfcnpj === '') return false;
        if (valCPF(obj.cpfcnpj)) {
            var data = {
                "metodo": "buscarPorCpfCnpj",
                "data": obj,
                "class": "visitante"
            };

            $rootScope.loadon();

            genericAPI.generic(data)
                .then(function successCallback(response) {
                    //se o sucesso === true
                    if (response.data.success == true) {
                        if (response.data.data!==null) {
                            $scope.obj.nome = response.data.data.nome;
                            $scope.obj.idvisitante = response.data.data.id;
                            SweetAlert.swal({ html: true, title: "Atenção", text: "Visitante já cadastrado nesse Local, dados recuperados, siga com o agendamento.", type: "info" });
                        }
                        $rootScope.loadoff();
                    } else {
                        SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
                    }
                }, function errorCallback(response) {
                    //error
                });	
        }
    }

    $scope.cadastrar = function (obj) {
        
        var data = { 
            "metodo": "cadastrar", 
            "data": obj,
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

                    $scope.obj = {
                        idvisitante: 0,
                        nome: '',
                        cpfcnpj: '',
                        data: '',
                        horario: '',
                    }
                } else {
                    SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
                }
            }, function errorCallback(response) {
                //error
            });	
    }

    function valCPF(cpf) {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf == '') return false;
        // Elimina CPFs invalidos conhecidos    
        if (cpf.length != 11 ||
            cpf == "00000000000" ||
            cpf == "11111111111" ||
            cpf == "22222222222" ||
            cpf == "33333333333" ||
            cpf == "44444444444" ||
            cpf == "55555555555" ||
            cpf == "66666666666" ||
            cpf == "77777777777" ||
            cpf == "88888888888" ||
            cpf == "99999999999")
            return false;
        // Valida 1o digito 
        add = 0;
        for (i = 0; i < 9; i++)
            add += parseInt(cpf.charAt(i)) * (10 - i);
        rev = 11 - (add % 11);
        if (rev == 10 || rev == 11)
            rev = 0;
        if (rev != parseInt(cpf.charAt(9)))
            return false;
        // Valida 2o digito 
        add = 0;
        for (i = 0; i < 10; i++)
            add += parseInt(cpf.charAt(i)) * (11 - i);
        rev = 11 - (add % 11);
        if (rev == 10 || rev == 11)
            rev = 0;
        if (rev != parseInt(cpf.charAt(10)))
            return false;
        return true;
    }

});