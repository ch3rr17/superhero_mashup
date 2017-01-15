(function() {
    'use strict';

    angular
        .module('app', [
        	'ui.router'
        ])

        .config(function($stateProvider, $urlRouterProvider, $httpProvider) {

            $urlRouterProvider.otherwise('/');

            //Create state for each page
            $stateProvider.state('main', { url: '/', templateUrl: 'partials/main.html', controller: 'MainController as vm' })
                          .state('movies', { url: '/movies/{hero}',  templateUrl: 'partials/movies.html', controller: 'MovieController as vm' })
                          .state('music', { url: '/music/{movie}',  templateUrl: 'partials/music.html', controller: 'MusicController as vm' })


        })

        .value('apiUrl', 'http://localhost:3000');
})();
