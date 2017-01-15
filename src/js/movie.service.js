(function() {
    'use strict';

    angular
        .module('app')
        .factory('MovieFactory', MovieFactory);

    MovieFactory.$inject = ['$http', '$q', '$log', '$stateParams'];

    /* @ngInject */
    function MovieFactory($http, $q, $log, $stateParams) {
        var service = {
            getMoviesForHero: getMoviesForHero
        };
        return service;

        ////////////////

        function getMoviesForHero() {

            var defer = $q.defer();
            $http({
                    method: 'GET',
                    url: '/movies-for-hero/' + $stateParams.hero
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
