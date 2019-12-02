angular.module('vrTheraphy')
    .controller('MainCtrl', ['$http', '$scope', '$rootScope', '$state', '$localStorage', '$sessionStorage', '$transitions', function ($http, $scope, $rootScope, $state, $localStorage, $sessionStorage, $transitions) {
        $scope.$storage = $sessionStorage;
        $rootScope.$storage = $sessionStorage;
        $rootScope.$state = $state;

        $transitions.onSuccess({}, function ($transition) {
            window.scrollTo(0, 0);

            //if ($scope.$storage.userId == undefined) {
            //    if (!$state.is('register')) {
            //        event.preventDefault();
            //        $state.go('login');
            //    }
            //}
        });

        $scope.logout = function () {
            $localStorage.$reset();
            $sessionStorage.$reset();
            delete $scope.$storage;
            $state.go('login');
        };


        $scope.base64ToBlob = function (base64data, contentType, sliceSize) {
            contentType = contentType || '';
            sliceSize = sliceSize || 512;

            var byteCharacters = atob(base64data);
            var byteArrays = [];

            for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                var slice = byteCharacters.slice(offset, offset + sliceSize);

                var byteNumbers = new Array(slice.length);
                for (var i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }

                var byteArray = new Uint8Array(byteNumbers);

                byteArrays.push(byteArray);
            }

            var blob = new Blob(byteArrays, { type: contentType });
            return blob;
        };

    }]);

angular.module('vrTheraphy');
