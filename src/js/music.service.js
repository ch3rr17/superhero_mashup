(function() {
    'use strict';

    angular
        .module('app')
        .factory('MusicFactory', MusicFactory);

    MusicFactory.$inject = ['$http', '$log', '$q', '$stateParams'];

    /* @ngInject */
    function MusicFactory($http, $log, $q, $stateParams) {
        var service = {
            getMusicForHero: getMusicForHero
        };
        return service;

        ////////////////

        function getMusicForHero(){
        	var defer = $q.defer();
            $http({
                    method: 'GET',
                    url: '/album-for-movie/' + $stateParams.movie
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