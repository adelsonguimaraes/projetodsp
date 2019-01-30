angular.module(module).controller('cadvisitanteCtrl', function ($rootScope, $scope, $location, genericAPI, $uibModal, SweetAlert, $timeout, especialCharMask) {
    //Verifica Sessao e permissão de acesso
    if (!$rootScope.usuario) { $location.path("/login"); return false; }

    $scope.title = 'Cadastro de Visita';

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
                } else {
                    SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
                }
            }, function errorCallback(response) {
                //error
            });	
    }

});