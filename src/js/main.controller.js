(function() {
    'use strict';

    angular
        .module('app')
        .controller('MainController', MainController);

    MainController.$inject = ['MainFactory', '$log'];

    /* @ngInject */
    function MainController(MainFactory, $log) {
        var vm = this;
        vm.title = 'MainController';
        vm.marvelUniverse = true;
        vm.otherUniverse = 'DC';

       
        ////////////////

        vm.switchUniverse = function() {
        	vm.marvelUniverse = !vm.marvelUniverse;
        	vm.otherUniverse = vm.marvelUniverse ? 'DC' : 'Marvel';
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
