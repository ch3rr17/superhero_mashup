(function() {
    'use strict';

    angular
        .module('app')
        .controller('MainController', MainController);

    MainController.$inject = ['MainFactory', '$log', '$rootScope'];

    /* @ngInject */
    function MainController(MainFactory, $log, $rootScope) {
        var vm = this;
        vm.title = 'MainController';
        vm.marvelUniverse = true;
        $rootScope.currentUniverse = 'marvel';

        ////////////////

        vm.setUniverse = function(universe) {
          $rootScope.currentUniverse = universe;
          vm.marvelUniverse = $rootScope.currentUniverse == 'marvel';
        };

        vm.grabMarvels = function() {
            MainFactory.getHeroes()
                       .then(
                       	function(response){
                       		vm.marvel = response.data.marvel;
                       		vm.dc = response.data.dc;
                       		console.log(response.data);
                       	},
                       	function(error){
                       		$log.error(error);
                       	});

        };

        vm.grabMarvels();
    }
})();
