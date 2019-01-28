angular.module(module).controller('loginCtrl', function ($rootScope, $scope, $location, authenticationAPI, SweetAlert, $uibModal, $timeout) {
    //Verifica Sessao e permissão de acesso
    if ($rootScope.usuario) { $location.path("/tarefas"); return false; }

    $scope.obj = {
        cpf: null,
        senha: null,
        remember: null
    }

    $scope.logar = function(obj) {

        if (obj.cpf === null || obj.senha === null) {
            SweetAlert.swal({ html: true, title: "Atenção", text: 'Preencha corretamente os campos.', type: "error" });
            return false;
        }

        $rootScope.loadon();
        
        var dataRequest = {
            cpf: obj.cpf,
            senha: MD5(obj.senha),
            remember: obj.remember || false
        }

        var data = { "metodo": "logar", "data": dataRequest, "class": "authentication", request: 'POST' };

        authenticationAPI.genericAuthentication(data)
            .then(function successCallback(response) {
                //se o sucesso === true
                if (response.data.success == true) {
                    //criamos a session
                    authenticationAPI.createSession(response.data.data, dataRequest.remember);
                    $rootScope.listarRotinas().then((result)=>{
                        // $location.path('/' + $rootScope.rotinas[0].url);
                        window.location.replace('#' + $rootScope.rotinas[0].url);
                        $rootScope.loadoff();
                    }); // listando rotinas
                } else {
                    $rootScope.loadoff();
                    SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
                }
            }, function errorCallback(response) {
                //error
            });	
    }
});