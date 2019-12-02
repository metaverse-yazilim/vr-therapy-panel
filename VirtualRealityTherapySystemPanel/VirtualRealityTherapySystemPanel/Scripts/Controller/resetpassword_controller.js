angular.module('vrTheraphy').controller('resetpassword_controller', ['$scope', '$http', '$state', '$stateParams', '$localStorage', '$sessionStorage', '$rootScope', 'srvLogin',
    function ($scope, $http, $state, $stateParams, $localStorage, $sessionStorage, $rootScope, srvLogin) {
        $scope.resetpass = {
            Password: '',
            Password_confirm: ''
        };

        $scope.respasshash = $stateParams.resetHash;
        $scope.mytime = new Date();
        $scope.initer = function () {
            $localStorage.$reset();
            $sessionStorage.$reset();
            delete $scope.$storage;

            var newstr = $scope.mytime.toString();
            var hashcontForm = {
                respasshash: $scope.respasshash,
                GMT: newstr
            };
            var promiseGet = srvLogin.UserPassCheck(hashcontForm);
            promiseGet.then(function (result) {
                delete $rootScope.$storage.passhash;

                $rootScope.$storage = $sessionStorage.$default({
                    passhash: result.data,
                });
                if ($rootScope.$storage.passhash == false) {
                    $state.go('login', {});
                }



            });
        };


        $scope.ResPass = function (regForm) {
            if ($scope.form.$valid && regForm.Password == regForm.Password_confirm) {
                regForm = {
                    respasshash: $scope.respasshash,
                    Password: $scope.resetpass.Password
                }
                var promiseGet = srvLogin.PassChange(regForm);
                promiseGet.then(function (result) {
                   

                    $state.go('login', {});

                    
                },
                    function (error) {
                        console.log('Registration Error:', error);
                        $('#password').focus().select();
                    });
            }
            else {
                console.log('submit fail');
            }
        };
    }]);