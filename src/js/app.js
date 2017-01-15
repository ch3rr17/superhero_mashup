(function() {
    'use strict';

    angular
        .module('app', [
        	'ui.router'
        ])

        .config(function($stateProvider, $urlRouterProvider, $httpProvider) {

            //$httpProvider.interceptors.push('httpInterceptor');

            $urlRouterProvider.otherwise('/');

            //Create state for each page
            $stateProvider.state('main', { url: '/', templateUrl: 'partials/main.html', controller: 'MainController as vm' })
                          .state('movies', { url: '/movies/{hero}',  templateUrl: 'partials/movies.html', controller: 'MovieController as vm' })
                          .state('music', { url: '/music/{hero}/{movie}',  templateUrl: 'partials/music.html', controller: 'MusicController as vm' });

        })
        .run(function($rootScope) {
          $rootScope.currentUniverse = 'marvel';
        })
        .directive('backImg', function(){
          return function(scope, element, attrs){
            var url = attrs.backImg;
            element.css({
              'background-image': 'url(' + url +')'
            });
          };
        })

        .value('apiUrl', 'http://localhost:3000');
})();
