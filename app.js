// configs
const module = 'projetodps';
const api = "http://api.akto.com.br/";
const version = '1.0.3';
// const api = "http://apidweb.solverp.com.br/";
// const api = "http://apipweb.solverp.com.br/";

(function () {
    angular.module(module, [
        'ui.router',                    // Routing
        'oc.lazyLoad',                  // ocLazyLoad
        'ui.bootstrap',                 // Ui Bootstrap
        'pascalprecht.translate',       // Angular Translate
        'ngIdle',                       // Idle timer
        'ngSanitize',                    // ngSanitize
        'ps.inputTime'
    ]);
})();