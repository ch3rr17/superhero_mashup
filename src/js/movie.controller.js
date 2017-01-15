(function() {
    'use strict';

    angular
        .module('app')
        .controller('MovieController', MovieController);

    MovieController.$inject = ['MovieFactory', '$log', '$stateParams'];

    /* @ngInject */
    function MovieController(MovieFactory, $log, $stateParams) {
        var vm = this;
        vm.title = 'MovieController';



        ////////////////


        vm.hero = $stateParams.hero;

        vm.getMovies = function() {
            MovieFactory.getMoviesForHero()
                .then(
                    function(response) {
                        vm.movies = response.data.data.results.titles;
                        console.log(response.data);
                    },
                    function(error) {
                        $log.error(error);
                    });
        }

        vm.getMovies();

    }
})();
