(function() {
    'use strict';

    angular
        .module('app')
        .controller('MovieController', MovieController);

    MovieController.$inject = ['MovieFactory', '$log', '$stateParams' ,'$timeout'];

    /* @ngInject */
    function MovieController(MovieFactory, $log, $stateParams, $timeout) {
        var vm = this;
        vm.title = 'MovieController';
        vm.noMovies = false;
        vm.loading = true;

        ////////////////

        vm.hero = $stateParams.hero;

        vm.getMovies = function() {
            MovieFactory.getMoviesForHero()
                .then(
                    function(response) {
                        vm.movies = response.data.data.results.titles;
                        $timeout(function(){
                            console.log('here');
                            vm.loading = false;
                        }, 750);


                        
                        if (vm.movies == null) {
                          vm.noMovies = true;
                        }
                    },
                    function(error) {
                         $timeout(function(){
                            vm.loading = false;
                        }, 750);

                        $log.error(error);
                    });

        }

        vm.getMovies();

    }
})();
