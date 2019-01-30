// configs
const module = 'projetodps';
const api = "api/";
const version = '1.0.3';

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

    /* Service Worker */
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('./service-worker.js?' + moment().valueOf())
            .then((reg) => {
                console.log('Service Worker Registered');
            })
            .catch((err) => {
                console.log('erro', err);
            });
    }
})();