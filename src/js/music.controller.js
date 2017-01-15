(function() {
    'use strict';

    angular
        .module('app')
        .controller('MusicController', MusicController);

    MusicController.$inject = ['MusicFactory', '$log', '$stateParams', '$sce'];

    /* @ngInject */
    function MusicController(MusicFactory, $log, $stateParams, $sce) {
        var vm = this;
        vm.title = 'MusicController';

        vm.albumEmbedPlayer = '';


        ////////////////

        vm.movie = $stateParams.movie;

        vm.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
        }

        vm.getMusic = function() {
            MusicFactory.getMusicForHero()
                .then(
                    function(response) {
                        vm.album = response.data.albums.items[0];

                        vm.albumEmbedPlayer = "https://embed.spotify.com/?uri=spotify%3Aalbum%3A" + vm.album.id;
                        console.log(response.data);
                    },
                    function(error) {
                        $log.error(error);
                    });
        }

        vm.getMusic();
    }
})();
