angular.module('vrTheraphy').controller('dashboard_controller', ['$scope', '$http', '$state', '$stateParams', '$localStorage', '$sessionStorage', '$rootScope', 'srvGeneral',
    function ($scope, $http, $state, $stateParams, $localStorage, $sessionStorage, $rootScope, srvGeneral) {
        $scope.init = function () {
            $scope.todoListGetData();
        };

        $scope.todoListGetData = function () {
            var promiseGet = srvGeneral.TodoListGetData($scope.$storage.userId);
            promiseGet.then(function (result) {
                $scope.VirtualTherapySystemPanel = result.data.Records;
            },
                function (error) {
                    console.log('todoListGetData Error:', error);
                });
        };
    }]);