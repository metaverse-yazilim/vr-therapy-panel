angular.module('vrTheraphy').controller('register_controller', ['$scope', '$http', '$state', '$stateParams', '$localStorage', '$sessionStorage', '$rootScope', 'srvregister',
    function ($scope, $http, $state, $stateParams, $localStorage, $sessionStorage, $rootScope, srvregister) {
        $scope.Register = {
            Firstname: '',
            Lastname: '',
            Username: '',
            Password:'',
            Email: ''
        };

        $scope.init = function () {
            $localStorage.$reset();
            $sessionStorage.$reset();
            delete $scope.$storage;
            
        };
        $scope.hiddenthing = 0;


        $scope.userRegister = function (regForm) {
            if ($scope.form.$valid && regForm.Password == regForm.Password_confirm) {
                var promiseGet = srvregister.UserRegister(regForm);
                promiseGet.then(function (result) {
                    if (result.data.name == 'Hata1') {
                        $scope.hiddenthing = 1;
                        //Kullanıcı adı alınmış hatası
                    }
                    else if (result.data.name == 'Hata2'){
                        $scope.hiddenthing = 2;
                        //E-mail daha önce alınmış hatası
                    }
                    else if (result.data.name == 'Hata3') {
                        $scope.hiddenthing = 3;
                        //KEY hatası
                    }
                    else {
                        $rootScope.$storage = $sessionStorage.$default({
                            userId: result.data.userId,
                            username: result.data.username,
                            name: result.data.name,
                            surname: result.data.surname
                        });

                        //$rootScope.$storage = $scope.$storage;
                        $state.go('loggedin', {});

                    }
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