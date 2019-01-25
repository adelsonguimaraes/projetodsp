angular.module(module).service("genericAPI", function ($http) {

    function _generic (data, scope) {
        return $http({
            method: 'POST',
            url: "rest/autoload.php",
            data: {
                session: data.session,
                metodo: data.metodo,
                data: data.data,
                class: data.class
            }
        });
    };

    return {
        generic: _generic
    };
});