angular.module(module).service("authenticationAPI", function ($q, $location, $rootScope, $uibModal, $http) {
	
	function _genericAuthentication (data) {
		return $http({
			method: 'POST',
			url: api + "src/rest/autoload.php",
			data: {
				metodo: data.metodo,
				data: data.data,
				class: data.class
			}
		});
	};


	function _createSession (data, infinity) {
		//verifica se o cookie não foi marcado
		if(!infinity) infinity = false;
		//alimenta a variavel usuario com data;
		$rootScope.usuario = data;
		//criar a sessionStorage com oss dados do data
        sessionStorage["usuario"] = JSON.stringify(data);
        //cria obj Date com a data atual
        var now = new Date();
        //criar o obj do localStorage sessionCandidatoOficial
        var sessionCandidatoOficial = {
            "usuario": 	data, //alimenta os dados da session usuario
            "infinity": infinity, //passa true ou false para o cookie infinito
            "dataExp": 	new Date(now.getTime()+50000) //passa a data atual + 1 minuto para dataExp
        };

        //cria o local storage
        localStorage["sessionCandidatoOficial"] = JSON.stringify(sessionCandidatoOficial);
    }

	function _sessionCtrl () {

		
		/*
			Function generica para as várias operaçõesss abaixo
		*/
		function atualizaLocalStorage () {
			//converte json string para obj e armazena em session.
			var session = JSON.parse(localStorage['sessionCandidatoOficial']);
			//cria um novo obj de data atual
			var now = new Date();
			//atualiza o tempo da sessão, a hora atual +5 minutos
			session.dataExp = new Date(now.getTime()+50000);
			//atualiza a sessionStorage mynuvio cupom
			localStorage['sessionCandidatoOficial'] = JSON.stringify(session);
			//converte o obj em json string e salva em sessionStorage
			sessionStorage['usuario'] = JSON.stringify(session.usuario);
			//converte json string para obj e passa para o scopo usuario
			$rootScope.usuario = JSON.parse(sessionStorage['usuario']);
		}

		/*
			Verifica se existe sessionStore.usuario
		*/
		if(sessionStorage['usuario']) {

			atualizaLocalStorage();
			
		/*
			Caso não exista sessionStorage
		*/
		}else{
			/*
				Verifica se existe localStorage
			*/
			if(localStorage['sessionCandidatoOficial']) {
				//converte json string para obj e armazena em session.
				var session = JSON.parse(localStorage['sessionCandidatoOficial']);
				/*
					Verifica se a sessão tem conf infinita,
					sendo que o usuario está sempre logado
				*/
				if(session.infinity) {

					atualizaLocalStorage();

				}else{
					//cria um novo obj de data atual
					var now = new Date();
					//converte a string data da sessao em obj
					var dataSessao = new Date(session.dataExp);
					/*
						Compara se o tempo de sessão ainda está no prazo,
						convertendo as duas datas em milisegundos
					*/
					if(now.getTime() <= dataSessao.getTime()) {
						
						atualizaLocalStorage();
					
					}else{
					
						$rootScope.logout();
					
					}//fim if data.getTime
				}//fim if session infinity
			}//fim de if localStorage
		}//fim if sessionStorage

	}

	// logout global
    $rootScope.logout = function () {

		window.sessionStorage.removeItem("usuario");
		window.localStorage.removeItem("sessionCandidatoOficial");
		$rootScope.usuario = "";
		
		//delete $rootScope.menus;
		$location.path("/home");
    }

    
	return {
		genericAuthentication: _genericAuthentication,
		// verificaSessao : _verificaSessao,
		createSession: _createSession,
		sessionCtrl: _sessionCtrl
	};
});