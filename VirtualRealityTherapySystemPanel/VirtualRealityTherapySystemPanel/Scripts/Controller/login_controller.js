angular.module('vrTheraphy').controller('login_controller', ['$scope', '$http', '$state', '$stateParams', '$localStorage', '$sessionStorage', '$rootScope', 'srvLogin', '$window',
    function ($scope, $http, $state, $stateParams, $localStorage, $sessionStorage, $rootScope, srvLogin, $window) {
        
        $scope.Login2 = {
            Username: '',
            Password: ''
        };
        $scope.Login = {
            Username: '',
            Password: ''
        };
        $scope.emailform = {
            email: ''
        }
        $scope.emailform2 = {
            email: ''
        }
        $scope.onExit = function () {
            
        };
        $window.onbeforeunload = $scope.onExit;
        $scope.init = function () {
            $scope.hiddenthing = 0;
            $scope.hiddenthingp = 0;
            $.Pages.init();
            $localStorage.$reset();
            $sessionStorage.$reset();
            delete $rootScope.$storage;
        };

        //Terapist Login Fonksiyonu Başlangıç
        $scope.userLogin = function (loginForm) {
            if (loginForm.Username != null && loginForm.Password != null) {
                //CAPTCHA İÇİN START1
                //if (grecaptcha.getResponse() == "") {
                //    alert("Lütfen güvenlik sorusunu çözünüz.")
                //}
                //else {
                    //var formform = {
                    //    deneme: grecaptcha.getResponse()
                    //}
                    //var prmiseGet = srvLogin.UserCaptcha(formform);
                    //prmiseGet.then(function (result) {
                    //    console.log(result);
                    //    if (result.data == true) {
                        //CAPTCHA İÇİN END1
                            var promiseGet = srvLogin.UserLogin(loginForm);
                            promiseGet.then(function (result) {
                                if (result.data.name != null) {
                                    //alert('You are logged in as ' + result.data.name + ' ' + result.data.surname);
                                    $rootScope.$storage = $sessionStorage.$default({
                                        userId: result.data.userId,
                                        username: result.data.username,
                                        name: result.data.name,
                                        surname: result.data.surname,
                                        day: result.data.birth,
                                        total: result.data.doctorid,
                                        last: result.data.sesid,
                                        back: 'login'
                                    });
                                    $rootScope.reloader == 1
                                    $state.go('loggedin', {});
                                }
                                else {
                                    $('#password').focus();
                                    console.log('login Error');
                                    alert('Wrong username or password!');

                                }
                            },
                                function (error) {
                                    console.log('login Error:', error);
                                    $('#password').focus().select();
                                }
                            );
                        }
                        //CAPTCHA İÇİN START2
                        //else {
                        //    alert("Lütfen güvenlik sorusunu tekrar çözünüz. Problemin devam etmesi halinde sistem saðlayýcýsýna ulaþýnýz")
                        //}
                //    });
                //}


            //}
            //CAPTCHA İÇİN END2
            else {
                console.log('submit fail');
            }
        };
        //Terapist Login Fonksiyonu Son

        //Danışan Login Fonksiyonu Başlangıç
        $scope.hastaLogin = function (loginForm) {
            if (loginForm.Username != null && loginForm.Password != null) {
                var promiseGet = srvLogin.hastaLogin(loginForm);
                promiseGet.then(function (result) {
                    if (result.data.username != null) {
                        $rootScope.$storage = $sessionStorage.$default({
                            userId: result.data.userId,
                            username: result.data.username,
                            docId: result.data.docId,
                        });

                        $state.go('patloggedin', {});
                    }
                    else {
                        $('#password').focus();
                        console.log('login Error');
                        alert('Wrong username or password!');
                    }
                },
                    function (error) {
                        console.log('login Error:', error);
                        $('#password').focus().select();
                    });
            }
            else {
                console.log('submit fail');
            }
        };
        //Danışan Login Fonksiyonu Son

        //Terapist Şifre Yenileme Fonksiyonu Başlangıç
        $scope.resetpass = function (emailForm) {
            if (emailForm.email != null) {
                var newstr = $scope.mytime.toString();
                emailForm.GMT = ((new Date().getTimezoneOffset())/(-60));
                var promiseGet = srvLogin.ResetPass(emailForm);
                promiseGet.then(function (result) {
                    if (result.data == true) {
                        $scope.hiddenthing = 1;
                    }
                    else {
                        $scope.hiddenthing = 2;
                    }
                },
                    function (error) {
                        console.log('email Error:', error);
                        $('#password').focus().select();
                    }
                );
            }
            else {
                console.log('submit fail');
            }
        };
        //Terapist Şifre Yenileme Fonksiyonu Son

        //Danışan Şifre Yenileme Fonksiyonu Başlangıç
        $scope.resetpassp = function (emailForm) {
            if ($scope.form.$valid) {
                var newstr = $scope.mytime.toString();
                emailForm.GMT = ((new Date().getTimezoneOffset())/(-60));
                var promiseGet = srvLogin.ResetPassP(emailForm);
                promiseGet.then(function (result) {
                    if (result.data == true) {
                        $scope.hiddenthingp = 1;
                    }
                    else {
                        $scope.hiddenthingp = 2;
                    }
                },
                    function (error) {
                        console.log('email Error:', error);
                        $('#password').focus().select();
                    }
                );
            }
            else {
                console.log('submit fail');
            }
        };
        //Danışan Şifre Yenileme Fonksiyonu Son

        $scope.erase_p = function () {
            $scope.hiddenthingp = 0;
            document.getElementById("email").value = null;
        }

        $scope.erase = function () {
            $scope.hiddenthing = 0;
            document.getElementById("email").value = null;
        }

        $scope.mytime = new Date();
    }]);