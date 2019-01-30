angular.module(module).service("genericAPI", function ($http, $rootScope) {

    function _generic (data, scope) {
        return $http({
            method: 'POST',
            url: api + "src/rest/autoload.php",
            data: {
                metodo: data.metodo,
                data: data.data,
                class: data.class,
                usuario: $rootScope.usuario
            }
        });
    };

    return {
        generic: _generic
    };
});