angular.module(module).controller('mainCtrl', function ($rootScope, $scope, authenticationAPI, genericAPI, $location, $uibModal, $timeout) {
    authenticationAPI.sessionCtrl();

    $rootScope.api = api;
    
    $rootScope.loading = 'none';

    $rootScope.rotinas = [];
    $rootScope.listarRotinas = function () {
        return new Promise (resolve => {
            var result = true;
            var dataRequest = {
                tipo: 'WEBAPP'
            }

            var data = { "metodo": "listarPorPerfilUsuarioEmpresaWebApp", "data": dataRequest, "class": "usuariorotina", request: 'GET' };

            genericAPI.generic(data)
                .then(function successCallback(response) {
                    //se o sucesso === true
                    if (response.data.length>0) {
                        for (e of response.data) {
                            $rootScope.rotinas.push({
                                'nome': e.objrotina.nome.replace(' (WebApp)', ''),
                                'icon': e.objrotina.icon,
                                'url': e.objrotina.url
                            });
                        }
                        MyMenu.setMenuItens($rootScope.rotinas);
                        MyMenu.setNameinMenu($rootScope.usuario.usuario);
                        MyMenu.setFooter('<span class="version"> v' + version + '</span><a onclick="angular.element(this).scope().logout()"><i class="fa fa-power-off"></i> Deslogar</a>');
                        resolve(result);
                        // setUrlAccess();
                    } else {
                        alert('Você não tem acesso ao Solverp WebApp.');
                        $rootScope.logout();
                        resolve(result);
                        return false;
                    }
                }, function errorCallback(response) {
                    //error
                });	
        });
    }

    $rootScope.verifyUrlAccess = function () {
        var count = 0;
        for (e of $rootScope.rotinas) {
            var split = window.location.hash.split('/');
            if (e.url === split[1]) count++;
        }
        if (count == 0) $location.path('/' + $rootScope.rotinas[0].url);
    }

    if ($rootScope.usuario) {
        MyMenu.setNameinMenu($rootScope.usuario.usuario);
        MyMenu.setFooter('<span class="version"> v' + version + '</span><a onclick="angular.element(this).scope().logout()"><i class="fa fa-power-off"></i> Deslogar</a>');
        $rootScope.listarRotinas(); // listando as rotinas do usuário
    }

    $rootScope.loadon = function () {
        var load = document.getElementById('loading');
        load.style.display = 'block';
    }
    $rootScope.loadoff = function () {
        var load = document.getElementById('loading');
        load.style.display = 'none';
    }

    $rootScope.clickNotification = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'app/views/modal/notificationModal.html',
            controller: notificationModalCtrl,
            size: 'lg',
            backdrop: 'static',
            resolve: {
                // obj: function () {
                //     return obj;
                // }
            }
        });
    }

    function notificationModalCtrl($scope, $uibModalInstance) {
        // $scope.obj = obj;

        $scope.ok = function () {
            $uibModalInstance.dismiss('cancel');
        }
    }

    // variavel que armazena as webviews ativas
    $rootScope.webView = [];
    // window.onhashchange = function (event) {
    //     console.log('aq');
    //     if ($rootScope.webView.length>0) event.stopPropagation();
    // };
    window.addEventListener('popstate', function (e) {
        // console.log(e);
    });
});