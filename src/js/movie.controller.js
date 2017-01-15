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
        vm.noMovies = false;

        ////////////////

        vm.hero = $stateParams.hero;

        vm.getMovies = function() {
            MovieFactory.getMoviesForHero()
                .then(
                    function(response) {
                        vm.movies = response.data.data.results.titles;
                        if (vm.movies == null) {
                          vm.noMovies = true;
                        }
                    },
                    function(error) {
                        $log.error(error);
                    });
        }

        vm.getMovies();

    }
})();
