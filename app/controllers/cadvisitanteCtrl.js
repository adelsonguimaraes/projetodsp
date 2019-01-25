angular.module(module).controller('tarefasCtrl', function ($rootScope, $scope, $location, genericAPI, $uibModal, SweetAlert, $timeout, especialCharMask) {
    //Verifica Sessao e permissão de acesso
    if (!$rootScope.usuario) { $location.path("/login"); return false; }

    $scope.tarefas = [];
    $scope.tarefasOrigem = [];
    $scope.filtro = "";

    // filtrando tarefas para gestao
    $scope.filtrarMinhasTarefas = function (filtro) {
        if ($scope.filtro === "") return false;

        var requestData = {
            filtro: filtro
        };

        var data = { "metodo": "filtrarMinhasTarefas", "data": requestData, "class": "agenda", request: 'GET' };

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
    $scope.limparFiltro = function () {
        $scope.filtro = "";
        $rootScope.listarTarefas();
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
    $rootScope.listarTarefas();

    function grouped(tarefas) {
        var res = tarefas.reduce(function (res, currentValue) {
            if (res.indexOf(currentValue.idescopo) === -1) {
                res.push(currentValue.idescopo);
            }
            return res;
        }, [])
            .map(function (group) {
                return {
                    id: group,
                    collapsed: false,
                    itens: tarefas.filter(function (_el) {
                        return _el.idescopo === group;
                    }).map(function (_el) { return _el; })
                }
            });
        var ls = 'tarefas_groups';

        if (localStorage[ls] && $scope.filtro === "") {
            var groups = JSON.parse(localStorage[ls]);
            for (var r of res) {
                var naotem = true;
                for (var g of groups) {
                    if (+r.id === +g.id) {
                        r.collapsed = g.collapsed;
                        naotem = false;
                    }
                }
                if (naotem) {
                    groups.push(r);
                    localStorage[ls] = JSON.stringify(groups);
                }
            }
            // remover os itens não encontrados
            for (var i in groups) {
                var naotem = true;
                for (e of res) {
                    if (groups[i].id === e.id) {
                        naotem = false;
                    }
                }
                if (naotem) {
                    groups.splice(i, 1);
                    localStorage[ls] = JSON.stringify(groups);
                }
            }
        } else {
            if ($scope.filtro === "") localStorage[ls] = JSON.stringify(res);
        }

        return res;
    }

    $scope.view = {
        tipo: 'AGRUPADO',
        html: 'app/views/tarefasAgrupado.html'
    }
    document.body.addEventListener('click', function (e) {
        if (e.target.id !== 'listmode') {
            var listmode = document.getElementById('listmode');
            if (listmode) listmode.querySelector('div').style.display = 'none';
        }
    });
    $scope.tipoVisualizacoes = function () {
        document.getElementById('listmode').querySelector('div').style.display = 'block';
    }
    $scope.setaTipoView = function (tipo) {
        if (tipo === 'HOJE') {
            $scope.view.tipo = tipo;
            $scope.view.html = 'app/views/tarefasLista.html';
            $scope.tarefas = $scope.tarefasOrigem;
            var array = [];
            for (var e of $scope.tarefas) {
                if (moment(e.data + ' ' + e.horario).valueOf() === moment().valueOf()) {
                    array.push(e);
                }
            }
            $scope.tarefas = array;
            MyToast.show('Visualizando Hoje');
        }else if (tipo === 'CRONOLOGICO') {
            $scope.view.tipo = tipo;
            $scope.view.html = 'app/views/tarefasLista.html';
            $scope.tarefas = $scope.tarefasOrigem;
            MyToast.show('Visualizando Cronológico Decrescente');
        }else{
            $scope.view.tipo = tipo;
            $scope.view.html = 'app/views/tarefasAgrupado.html';
            $scope.tarefas = grouped($scope.tarefasOrigem);
            MyToast.show('Visualizando Agrupado');
        }
    }

    $scope.collapse = function (obj) {
        obj.collapsed = !obj.collapsed;
        if (obj.collapsed) {
            MyToast.show('Ocutando tarefas');
        } else {
            MyToast.show('Exibindo tarefas');
        }
        var ls = 'tarefas_groups';
        var groups = JSON.parse(localStorage[ls]);
        for (var e of groups) {
            if (obj.id === e.id) {
                e.collapsed = obj.collapsed;
            }
        }
        localStorage[ls] = JSON.stringify(groups);
    }

    // verificando se o agendamento está em atraso
    $scope.emAtraso = function (obj) {
        var result = false;
        if (moment(obj.data + ' ' + obj.horario).valueOf() < moment().valueOf()) {
            result = true;
        }
        return result;
    }

    $scope.verStatus = function (status) {
        var str = '';
        switch (status) {
            case 'PENDENTE':
                str = 'Tarefa pendente, não visualizada.';
                break;
            case 'VISUALIZADO':
                str = 'Tarefa aguardando ser iniciada.';
                break;
            case 'INICIADO':
                str = 'Tarefa iniciada e em andamento.';
                break;
            case 'FINALIZADO':
                str = 'Tarefa finalizada.';
                break;
            case 'AUDITADO':
                str = 'Tarefa auditada.';
                break;
        }

        MyToast.show(str);
    }

    var getCordenates = function (url) {
        var regexCords = /[@|q]=?-?[0-9]+.[0-9]+,-?[0-9]+.[0-9]+,?[0-9.]+z?/;
        var match = url.match(regexCords);
        var coord = false;
        if (match !== null) {
            split = match[0].split(',');
            coord = {
                lat: split[0].replace(/[@|q|=]/g, ''),
                lon: split[1]
            }
        }
        return coord;
    };

    $scope.geolocationIsValid = function (geolocation) {
        return (geolocation === undefined || geolocation === '' || !getCordenates(geolocation)) ? false : true;
    }

    $rootScope.statusTarefa = 'fa-clock-o';
    var verificaStatusTarefa = function (obj) {
        if (obj.status === 'PENDENTE' || obj.status === 'VISUALIZADO') {
            $rootScope.statusTarefa = 'fa-clock-o';
        } else if (obj.status === 'INICIADO') {
            $rootScope.statusTarefa = 'fa-thumbs-up';
        }else {
            $rootScope.statusTarefa = 'fa-thumbs-up text-muted';
        }
    }

    var visualizarTarefa = function (obj) {
        var requestData = {
            data: {
                idagendatarefafuncionario: obj.id,
                status: 'VISUALIZADO'
            }
        };

        var data = { "metodo": "visualizarTarefaPorUsuario", "data": requestData, "class": "agenda", request: 'PUT' };

        $rootScope.loadon();

        genericAPI.generic(data)
            .then(function successCallback(response) {
                //se o sucesso === true
                if (response.data.success == true) {
                    $rootScope.loadoff();
                    $rootScope.listarTarefas();
                } else {
                    SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
                }
            }, function errorCallback(response) {
                //error
            });	
    }

    var carregaMapa = function (obj) {
        var coord = getCordenates(obj.geolocalinicio);
        if (coord) {
            setTimeout(function () {
                var container = L.DomUtil.get('map');
                if (container != null) {
                    container._leaflet_id = null;
                }
                
                var map = L.map('map').setView([coord.lat, coord.lon], 13);

                L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
                    maxZoom: 18,
                    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                    id: 'mapbox.streets',
                    accessToken: 'pk.eyJ1IjoibnV2aW9zb2x1Y29lcyIsImEiOiJjamp1OXYyNjU4d3F2M3FyNThlM3NqNjN0In0.2PBDsYj0P2Slvf_ybDqWKQ' // api key nuvio
                }).addTo(map);

                L.marker([coord.lat, coord.lon]).addTo(map)
                    .bindPopup(obj.localinicio + '<br><small>' + moment(obj.data).format('DD/MM/YYYY') + ' ' + obj.horario + '</small>')
                    .openPopup();
            }, 100);
        }
    }

    $scope.verificandoNivelCritico = function (obj) {
        var maxDificuldade = '';
        for (x of obj.ocorrenciasnaolidas) {
            if (x.dificuldade === null || x.dificuldade === 'BAIXA') maxDificuldade = 'dificuldade-' + x.dificuldade.toLowerCase();
            if (x.dificuldade === null || x.dificuldade === 'BAIXA' || x.dificuldade === 'NORMAL') maxDificuldade = 'dificuldade-' + x.dificuldade.toLowerCase();
            if (x.dificuldade === null || x.dificuldade === 'BAIXA' || x.dificuldade === 'NORMAL' || x.dificuldade === 'MODERADO') maxDificuldade = 'dificuldade-' + x.dificuldade.toLowerCase();
            if (x.dificuldade === null || x.dificuldade === 'BAIXA' || x.dificuldade === 'NORMAL' || x.dificuldade === 'MODERADO' || x.dificuldade === 'GRAVE') maxDificuldade = 'dificuldade-' + x.dificuldade.toLowerCase();
        }

        return maxDificuldade;
    };

    $scope.setarOcorrenciasComoLidas = function (obj) {

        var requestData = {
            ocorrencias: obj.ocorrenciasnaolidas
        };

        var data = { "metodo": "cadastrar", "data": requestData, "class": "ocorrenciaagendatarefafuncionario", request: 'POST' };

        $rootScope.loadon();

        genericAPI.generic(data)
            .then(function successCallback(response) {
                //se o sucesso === true
                if (response.data.success == true) {
                    $rootScope.loadoff();
                    $rootScope.listarTarefas();
                    // $rootScope.fecharDetalhes();
                    obj.ocorrenciasnaolidas = [];
                    // if (window.innerWidth >= 1020) $rootScope.listarOcorrencias(obj);
                } else {
                    SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
                }
            }, function errorCallback(response) {
                //error
            });	
    };

    $scope.verDetalhes = function (obj) {
        $scope.detalhes = obj;
        $scope.detailsClass = 'show-details';

        // abre a time line caso desktop
        if (window.innerWidth >= 1020) {
            $scope.setarOcorrenciasComoLidas(obj); // limpa as ocorrencias e abre a timeline
            $rootScope.listarOcorrencias(obj);
        }

        // setando que o usuário visualisou
        if (obj.status === 'PENDENTE') visualizarTarefa(obj);

        verificaStatusTarefa(obj); // setando o inicone de acordo com o status

        if (obj.geolocalinicio) {
            carregaMapa(obj);
        }
    };

    $rootScope.fecharDetalhes = function (obj) {
        $scope.detailsClass = '';
    };

    $scope.verMembros = function (obj) {
        var modalInstance = $uibModal.open({
            templateUrl: 'app/views/modal/equipeModal.html',
            controller: equipeModalCtrl,
            size: 'lg',
            backdrop: 'static',
            resolve: {
                obj: function () {
                    return obj;
                }
            }
        });
    }

    $scope.verOcorrencias = function (item) {
        var tl = document.querySelector('.main-timeline-sidebar-box');
        
        // caso seja na versão mobile
        if (window.innerWidth < 1020) {
            tl.classList.add('show-timeline-sidebar');
            // document.querySelector('#tarefas').style.display = 'none';
        }

        $scope.detalhes = item;
        // setando não visualizadas como visualizadas e listando ocorrencias
        $scope.setarOcorrenciasComoLidas(item);
        $rootScope.listarOcorrencias(item);
    }

    function equipeModalCtrl($scope, $uibModalInstance, obj) {
        $scope.obj = obj;
        
        $scope.ok = function () {
            $uibModalInstance.dismiss('cancel');
        }
    }

    $scope.verMapa = function (obj) {
        var modalInstance = $uibModal.open({
            templateUrl: 'app/views/modal/mapaModal.html',
            controller: verMapaModalCtrl,
            size: 'lg',
            backdrop: 'static',
            resolve: {
                obj: function () {
                    carregaMapa(obj);
                    return obj;
                }
            }
        });
    }

    function verMapaModalCtrl($scope, $uibModalInstance, obj) {
        $scope.obj = obj;

        var coord = getCordenates(obj.geolocalinicio);

        $scope.comoChegar = function () {
            window.open("https://www.google.com/maps/dir/?api=1&origin=my+location&destination=" + coord.lat + "," + coord.lon ,"_blank");
        }

        $scope.ok = function () {
            $uibModalInstance.dismiss('cancel');
        }
    }

    $scope.acaoTarefa = function (obj, $event) {
        $event.stopPropagation();
        var status = 'INICIAR';
        switch (obj.status) {
            case 'PENDENTE':
                confirmIniciarTarefa();
                break;
            case 'VISUALIZADO':
                confirmIniciarTarefa();
                break;
            case 'INICIADO':
                modalFinalizar();
                break;
            case 'FINALIZADO':
                SweetAlert.swal({ html: true, title: "Atenção", text: "Você já finalizou está tarefa, aguardando a auditoria.", type: "info" });
                return false;
            case 'AUDITADO':
                SweetAlert.swal({ html: true, title: "Atenção", text: "Tarefa finalizada e auditada.", type: "info" });
                return false;
        }

        function confirmIniciarTarefa () {
            SweetAlert.swal({
                title: "Atenção",
                text: "Deseja realmente iniciar a tarefa?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#5cb85c",
                confirmButtonText: "Sim, iniciar!",
                cancelButtonText: "Não, cancele!",
                closeOnConfirm: false,
                closeOnCancel: false
            },
                function (isConfirm) {
                    swal.close();
                    if (isConfirm) {
                        var requestData = {
                            data: {
                                idescopo: obj.idescopo,
                                idescopotarefa: obj.idescopotarefa,
                                idagenda: obj.idagenda,
                                idagendatarefafuncionario: obj.id,
                                status: 'INICIADO'
                            }
                        };

                        var data = { "metodo": "iniciarTarefaPorUsuario", "data": requestData, "class": "agenda", request: 'PUT' };

                        $rootScope.loadon();

                        genericAPI.generic(data)
                            .then(function successCallback(response) {
                                //se o sucesso === true
                                if (response.data.success == true) {
                                    $rootScope.loadoff();
                                    $rootScope.listarTarefas();
                                    // $rootScope.fecharDetalhes();
                                    obj.status = 'INICIADO';
                                    verificaStatusTarefa(obj);
                                    if (window.innerWidth >= 1020) $rootScope.listarOcorrencias(obj);
                                    SweetAlert.swal({ html: true, title: "Iniciado", text: "Você iniciou a tarefa.", type: "success" });
                                } else {
                                    SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
                                }
                            }, function errorCallback(response) {
                                //error
                            });	
                    }
                });
        }

        

        function modalFinalizar () {
            var modalInstance = $uibModal.open({
                templateUrl: 'app/views/modal/finalizarTarefaJustificativa.html',
                controller: finalizarModalCtrl,
                size: 'lg',
                backdrop: 'static',
                resolve: {
                    obj: function () {
                        return obj;
                    }
                }
            });

            function finalizarModalCtrl($scope, $uibModalInstance, obj) {
                $scope.obj = obj;
                $scope.ok = function () {

                    var requestData = {
                        data: {
                            idescopo: obj.idescopo,
                            idescopotarefa: obj.idescopotarefa,
                            idagenda: obj.idagenda,
                            idagendatarefafuncionario: obj.id,
                            justificativa: obj.justificativa || ''
                        }
                    };

                    var data = { "metodo": "finalizarTarefaPorUsuario", "data": requestData, "class": "agenda", request: 'PUT' };

                    $rootScope.loadon();

                    genericAPI.generic(data)
                        .then(function successCallback(response) {
                            //se o sucesso === true
                            if (response.data.success == true) {
                                $rootScope.loadoff();
                                $rootScope.listarTarefas();
                                // $rootScope.fecharDetalhes();
                                $uibModalInstance.dismiss('cancel');
                                obj.status = 'FINALIZADO';
                                verificaStatusTarefa(obj);
                                if (window.innerWidth >= 1020) $rootScope.listarOcorrencias(obj);
                                SweetAlert.swal({ html: true, title: "Finalizado", text: "Tarefa finalizada, aguarde a auditoria.", type: "success" });
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
    }

});