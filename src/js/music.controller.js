(function() {
    'use strict';

    angular
        .module('app')
        .controller('MusicController', MusicController);

    MusicController.$inject = ['MusicFactory', '$log', '$stateParams', '$sce', '$timeout'];

    /* @ngInject */
    function MusicController(MusicFactory, $log, $stateParams, $sce, $timeout) {
        var vm = this;
        vm.title = 'MusicController';

        vm.noAlbum = false;
        vm.noPhotos = false;
        vm.albumEmbedPlayer = '';

        vm.musicLoaded = false;
        vm.photosLoaded = false;

        vm.loading = true;

        ////////////////

        function hideLoader() {
            $timeout(function() {
                vm.loading = false;
            }, 500);
        }

        vm.movie = $stateParams.movie;

        vm.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
        };

        vm.getMusic = function() {
            MusicFactory.getMusicForHero()
                .then(
                    function(response) {
                        vm.album = response.data.albums.items[0];
                        if (vm.album == null) {
                          vm.noAlbum = true;
                        } else {
                          vm.albumEmbedPlayer = "https://embed.spotify.com/?uri=spotify%3Aalbum%3A" + vm.album.id;
                        }
                        vm.musicLoaded = true;
                        if(vm.photosLoaded){
                            hideLoader();
                        }
                    },
                    function(error) {
                        hideLoader();
                        $log.error(error);
                    });

        };

        vm.getMusic();

        vm.getLifestyle = function(){
        	MusicFactory.getLifeStyleForHero()
        		.then(
                    function(response) {
                        // has music also loaded? then loading = false
                        vm.lifestyleImages = response.data.images;
                        if (vm.lifestyleImages.length === 0) {
                          vm.noPhotos = true;
                        }
                        vm.photosLoaded = true;
                        if(vm.musicLoaded){
                            hideLoader();
                        }
                    },
                    function(error) {
                        hideLoader();
                        $log.error(error);
                    });
        };

        vm.getLifestyle();
    }
})();
