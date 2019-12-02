angular.module('vrTheraphy').controller('startsession_controller', ['$scope', '$http', '$state', '$stateParams', '$localStorage', '$sessionStorage', '$rootScope', '$uibModal',
    function ($scope, $http, $state, $stateParams, $localStorage, $sessionStorage, $rootScope, $uibModal) {
        $scope.init = function () {
            if ($rootScope.$storage.back == 'loggedintostart' || $rootScope.$storage.back == 'sessionscenario' || $rootScope.$storage.back == 'aftertostart' || $rootScope.$storage.back == 'startsession') {
            }
            else {
                if ($rootScope.$storage.login == '1') {
                    $rootScope.$storage.back = 'tologgedin';
                    $state.go('loggedin', {});
                }
                else {
                    $localStorage.$reset();
                    $sessionStorage.$reset();
                    delete $rootScope.$storage;
                    $state.go('login', {});
                }
            }
            $scope.height1 = document.getElementById("ul1").clientHeight;
            $scope.height2 = document.getElementById("ul2").clientHeight;
            $scope.height3 = document.getElementById("ul3").clientHeight;
            if ($scope.height1 != $scope.height2 || $scope.height1 != $scope.height3 || $scope.height3 != $scope.height2) {
                $state.go('startsession', {});
            }
            $rootScope.$storage.back = 'startsession'
            $.Pages.init();
            delete $scope.testa;
            $scope.testa = $rootScope.$storage;
        };

        delete $scope.testa;
        $scope.testa = $rootScope.$storage;

        $scope.userLogout = function () {
            $localStorage.$reset();
            $sessionStorage.$reset();
            delete $scope.$storage;
            $state.go('login', {});
        };


    }]);