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
        // periodos
        periodo: {
            todo: false,
            segunda: false,
            terca: false,
            quarta: false,
            quinta: false,
            sexta: false,
            sabado: false,
            domingo: false
        }
    }

    $scope.edicao = false;

    $scope.comPeriodo = false;
    function escolhePeriodo() {
        SweetAlert.swal({
            title: "Atenção",
            text: "Escolha um tipo de visita?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#5cb85c",
            confirmButtonText: "Dia Único",
            cancelButtonText: "Período",
            closeOnConfirm: true,
            closeOnCancel: true
        },
            function (isConfirm) {
                if (isConfirm) {
                    $scope.comPeriodo = false;
                    $scope.novo = true;
                } else {
                    $scope.comPeriodo = true;
                    $scope.novo = true;
                }
            }
        );
    }

    $scope.novo = false;
    $scope.cadNovo = function () {
        escolhePeriodo();
    }
    $scope.cancelaNovo = function () {
        $scope.novo = false;
        $scope.edicao = false;
        $scope.comPeriodo = false;
        
        $scope.obj = {
            idvisitante: 0,
            idtipovisita: 0,
            nome: '',
            documento: '',
            datainicio: new Date(),
            datafim: new Date(),
            horario: new Date(moment().format('YYYY-MM-DD HH:mm')),
            // periodos
            periodo: {
                todo: false,
                segunda: false,
                terca: false,
                quarta: false,
                quinta: false,
                sexta: false,
                sabado: false,
                domingo: false
            }
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

    $scope.todasVisitas = false;

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
                $scope.todasVisitas = false;
            }, function errorCallback(response) {
                //error
            });
    }
    $scope.listarVisitas();

    $scope.visualizarTodasVisitas = function () {
        if ($scope.todasVisitas) {
            $scope.listarVisitas();
        }else{
            var data = { "metodo": "listarTudo", "data": '', "class": "visita", request: 'GET' };

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
        // recebe o oposto
        $scope.todasVisitas = !$scope.todasVisitas;
    }

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
                            $scope.obj.idvisitante = visitante.idvisitante;
                            $scope.obj.nome = visitante.nome;
                            $scope.obj.documento = visitante.documento;
                            $scope.obj.idtipovisita = $scope.tiposvisita[0].id;
                        }
                    }
                );
            }
        }
    }

    // periodos
    $scope.setaPeriodo = function (dia) {
        // verificando o dia que foi clicado do periodo
        switch (dia) {
            // caso o valor do botão clicado tenha do sido todo
            case 'todo': {
                // getamos o valor atual da variável "todo"
                var x = !$scope.obj.periodo.todo;
                for (var e in $scope.obj.periodo) {
                    // fazemos um laço com todos os botões e setamos o valor
                    $scope.obj.periodo[e] = x;
                }
                break;
            }
            default: {
                // caso o botão clicado seja de um dia específico, setamos o valor inverso do valor atual true/false
                $scope.obj.periodo[dia] = !$scope.obj.periodo[dia];
                // também setamos false para o botão todo, para desabilita-lo
                $scope.obj.periodo.todo = false;
                break;
            }
        };
    }

    $scope.cadastrar = function (obj) {
     
        var copy = angular.copy(obj);
        copy.datainicio = moment(obj.datainicio).format('YYYY-MM-DD');
        copy.datafim = moment(obj.datafim).format('YYYY-MM-DD');
        copy.horario = moment(obj.horario).format('HH:mm:ss');
        copy.comperiodo = $scope.comPeriodo;

        // trativas para caso seja visita com periodo
        if ($scope.comPeriodo) {
            if (moment(copy.datainicio).valueOf() > moment(copy.datafim).valueOf()) {
                SweetAlert.swal({ html: true, title: "Atenção", text: "A data de saída não pode ser anterior a data de entrada!", type: "error" });
                return false;    
            }
            var v = false;
            for (var i in $scope.obj.periodo) {
                if ($scope.obj.periodo[i]) {
                    v = true;
                }
            }
            if (!v) {
                SweetAlert.swal({ html: true, title: "Atenção", text: "É preciso selecionar os dias do período!", type: "error" });
                return false;    
            }
        } 

        if (moment(copy.datainicio + ' ' + copy.horario).valueOf() <= moment().valueOf()) {
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

    function escolhePeriodoAgendamento(obj) {
        SweetAlert.swal({
            title: "Atenção",
            text: "Escolha um tipo de visita?",
            type: "info",
            showCancelButton: true,
            confirmButtonColor: "#5cb85c",
            confirmButtonText: "Dia Único",
            cancelButtonText: "Período",
            closeOnConfirm: true,
            closeOnCancel: true
        },
            function (isConfirm) {
                $scope.edicao = true;
                $scope.obj.idvisitante = obj.idvisitante;
                $scope.obj.nome = obj.nome;
                $scope.obj.documento = obj.documento;
                $scope.obj.idtipovisita = $scope.tiposvisita[0].id;
                
                if (isConfirm) {
                    $scope.comPeriodo = false;
                    $scope.novo = true;
                } else {
                    $scope.comPeriodo = true;
                    $scope.novo = true;
                }
            }
        );
    }

    $scope.novoAgendamento = function (obj) {
        for (i of $scope.visitas) {
            // if (+i.idvisitante === +obj.idvisitante) {
            //     SweetAlert.swal({ html: true, title: "Atenção", text: "Este visitante já possui uma visita ativa, será necessário desativar a visita para criar uma nova!", type: "error" });
            //     return false;
            // }
        }

        SweetAlert.swal({
            title: "Atenção",
            text: "Deseja agendar uma nova visita?",
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
                    escolhePeriodoAgendamento(obj);
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
            text: "Deseja cancelar está visita?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#5cb85c",
            confirmButtonText: "Sim, cancele!",
            cancelButtonText: "Não, mantenha!",
            closeOnConfirm: false,
            closeOnCancel: true
        },
            function (isConfirm) {
                // swal.close();
                if (isConfirm) {
                    var copy = angular.copy(obj);
                    copy.data = moment(obj.data).format('YYYY-MM-DD');
                    copy.horario = moment(obj.horario, 'HH:mm:ss').format('HH:mm:ss');
                    copy.status = "CANCELADO";

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
                                SweetAlert.swal({ html: true, title: "Sucesso", text: 'Visita cancelada com sucesso!', type: "success" });

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

    $scope.historico = function (obj) {
        var data = {
            "metodo": "historico",
            "data": obj,
            "class": "visita",
            request: 'POST'
        };

        $rootScope.loadon();

        genericAPI.generic(data)
            .then(function successCallback(response) {
                //se o sucesso === true
                if (response.data.success == true) {
                    $rootScope.loadoff();
                    $scope.modalHistorico(obj, response.data);
                } else {
                    SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
                }
            }, function errorCallback(response) {
                //error
            });	
    }

    $scope.modalHistorico = function (obj, data) {
        var modalInstance = $uibModal.open({
            templateUrl: 'app/views/modal/modalHistorico.html',
            controller: modalHistoricoCtrl,
            size: 'lg',
            backdrop: 'static',
            resolve: {
                obj: function () {
                    return obj;
                },
                data: data
            }
        });

        function modalHistoricoCtrl($scope, $uibModalInstance, obj, data) {
            $scope.obj = obj;
            $scope.visitas = data.data;
            
            $scope.ok = function (obj) {

                if (obj === undefined) {
                    SweetAlert.swal({ html: true, title: "Atenção", text: "Informe pelo menos um campo para filtrar", type: "error" });
                    return false;
                }

                var copy = angular.copy(obj);
                copy.valoracima = desformataValor(obj.valoracima);
                copy.valorabaixo = desformataValor(obj.valorabaixo);
                copy.entradaacima = desformataValor(obj.entradaacima);
                copy.entradaabaixo = desformataValor(obj.entradaabaixo);
                copy.parcelaacima = desformataValor(obj.parcelaacima);
                copy.parecelaabaixo = desformataValor(obj.parecelaabaixo);

                var data = { "metodo": "filtrar", "data": copy, "class": "cartacredito", request: 'GET' };

                $rootScope.loadon();

                genericAPI.generic(data)
                    .then(function successCallback(response) {
                        //se o sucesso === true
                        if (response.data.success == true) {
                            parentScope.cartas = response.data.data;
                            $rootScope.loadoff();
                            $uibModalInstance.dismiss('cancel');
                        } else {
                            SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
                        }
                    }, function errorCallback(response) {
                        //error
                    });

            }
            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            }
        }
    }

});