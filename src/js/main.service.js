(function() {
    'use strict';

    angular
        .module('app')
        .factory('MainFactory', MainFactory);

    MainFactory.$inject = ['$http', '$q', 'apiUrl'];

    /* @ngInject */
    function MainFactory($http, $q, apiUrl) {
        var service = {
            getHeroes: getHeroes
        };
        return service;

        ////////////////


        function getHeroes() {
            var defer = $q.defer();
            $http({
                    method: 'GET',
                    url: 'heroes.json'
                })
                .then(
                    function(response) {
                        defer.resolve(response);
                    },
                    function(error) {
                        defer.reject(error.data);
                    }
                );

            return defer.promise;
        }

    }
})();
