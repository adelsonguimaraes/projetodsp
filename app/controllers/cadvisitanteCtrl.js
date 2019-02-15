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
        datainicio: new Date(),
        datafim: new Date(),
        horario: new Date(moment().format('YYYY-MM-DD HH:mm')),
        
    }

    $scope.edicao = false;

    $scope.novo = false;
    $scope.cadNovo = function () {
        $scope.novo = true;
    }
    $scope.cancelaNovo = function () {
        $scope.novo = false;
        $scope.edicao = false;
        
        $scope.obj = {
            idvisitante: 0,
            idtipovisita: $scope.tiposvisita[0].id,
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

    $scope.visitas = [];
    $scope.listarVisitas = function () {
        var data = { "metodo": "listar", "data": '', "class": "visita", request: 'GET' };

        $rootScope.loadon();

        genericAPI.generic(data)
            .then(function successCallback(response) {
                //se o sucesso === true
                if (response.data.success == true) {
                    $scope.visitas = response.data.data;
                    $rootScope.loadoff();
                } else {
                    SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
                }
            }, function errorCallback(response) {
                //error
            });
    }
    $scope.listarVisitas();

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

    // verifica se visita já está cadastrada
    $scope.verificaVisitante = function (obj) {
        for (i of $scope.visitantes) {
            if(i.nome.toLowerCase().indexOf(obj.nome.toLowerCase())>=0) {
                var visitante = i;
                SweetAlert.swal({
                    title: "Atenção",
                    text: "Visitante já cadastrado, desja agendar uma nova visita?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#5cb85c",
                    confirmButtonText: "Sim, desejo!",
                    cancelButtonText: "Não, cancele!",
                    closeOnConfirm: true,
                    closeOnCancel: true
                },
                    function (isConfirm) {
                        // swal.close();
                        if (isConfirm) {
                            $scope.edicao = true;
                            $scope.novo = true;

                            $scope.obj.idvisitante = visitante.id;
                            $scope.obj.nome = visitante.nome;
                            $scope.obj.documento = visitante.documento;
                            $scope.obj.idtipovisita = $scope.tiposvisita[0].id;
                        }
                    }
                );
            }
        }
    }

    $scope.cadastrar = function (obj) {
        
        var copy = angular.copy(obj);
        copy.data = moment(obj.data).format('YYYY-MM-DD');
        copy.horario = moment(obj.horario, 'HH:mm:ss').format('HH:mm:ss');

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
                    $scope.listarVisitantes();
                    $scope.listarVisitas();
                } else {
                    SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
                }
            }, function errorCallback(response) {
                //error
            });	
    }

    $scope.novoAgendamento = function (obj) {

        for (i of $scope.visitas) {
            if (+i.idvisitante === +obj.id) {
                SweetAlert.swal({ html: true, title: "Atenção", text: "Este visitante já possui uma visita ativa, será necessário desativar a visita para criar uma nova!", type: "error" });
                return false;
            }
        }

        SweetAlert.swal({
            title: "Atenção",
            text: "Deseja agendar uma nova visita?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#5cb85c",
            confirmButtonText: "Sim, desejo!",
            cancelButtonText: "Não, cancele!",
            closeOnConfirm: true,
            closeOnCancel: true
        },
            function (isConfirm) {
                // swal.close();
                if (isConfirm) {
                    $scope.edicao = true;
                    $scope.novo = true;
                    
                    $scope.obj.idvisitante = obj.id;
                    $scope.obj.nome = obj.nome;
                    $scope.obj.documento = obj.documento;
                    $scope.obj.idtipovisita = $scope.tiposvisita[0].id;
                }
            }
        );
    };

    $scope.reagendar = function (obj) {
        console.log(obj);
    }
    
    $scope.desativarVisita = function (obj) {
        SweetAlert.swal({
            title: "Atenção",
            text: "Deseja desativar está visita?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#5cb85c",
            confirmButtonText: "Sim, desejo!",
            cancelButtonText: "Não, cancele!",
            closeOnConfirm: false,
            closeOnCancel: true
        },
            function (isConfirm) {
                // swal.close();
                if (isConfirm) {
                    var copy = angular.copy(obj);
                    copy.data = moment(obj.data).format('YYYY-MM-DD');
                    copy.horario = moment(obj.horario, 'HH:mm:ss').format('HH:mm:ss');
                    copy.ativo = "NAO";

                    var data = {
                        "metodo": "atualizar",
                        "data": copy,
                        "class": "visita",
                        request: 'POST'
                    };

                    $rootScope.loadon();

                    genericAPI.generic(data)
                        .then(function successCallback(response) {
                            //se o sucesso === true
                            if (response.data.success == true) {
                                $rootScope.loadoff();
                                SweetAlert.swal({ html: true, title: "Sucesso", text: 'Visita desativada com sucesso!', type: "success" });

                                $scope.cancelaNovo();
                                // $scope.listarVisitantes();
                                $scope.listarVisitas();
                            } else {
                                SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
                            }
                        }, function errorCallback(response) {
                            //error
                        });	
                }
            }
        );
    }

});