angular.module('vrTheraphy').controller('patregister_controller', ['$scope', '$http', '$state', '$stateParams', '$localStorage', '$sessionStorage', '$rootScope', 'srvregister',
    function ($scope, $http, $state, $stateParams, $localStorage, $sessionStorage, $rootScope, srvregister) {
        if ($rootScope.$storage.back == 'patregister' || $rootScope.$storage.back == 'newsession' || $rootScope.$storage.back == 'startsession' || $rootScope.$storage.back == 'loggedin' || $rootScope.$storage.back == 'sessionedit') {
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
        $rootScope.$storage.back = 'patregister'
        $scope.init = function () {
            $.Pages.init();
        };
        $scope.Register1 = {
            Firstname: '',
            Lastname: '',
            Username: '',
            Password: '',
            Birth: '2000-01-01 01:01:01'
        };

        $scope.testa = {};
        $scope.testa = $rootScope.$storage;
        //Terapist Logout fonksiyonu
        $scope.userLogout = function () {
            $localStorage.$reset();
            $sessionStorage.$reset();
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
            delete $rootScope.$storage;
            $state.go('login', {});
        };

        $scope.hiddenthing = 0;

        //Yeni danışan kayıt fonksiyon
        $scope.patRegister = function (regForm) {
            if ($scope.form.$valid && regForm.Password == regForm.Password_confirm) {
                regForm.docid = $rootScope.$storage.userId
                delete $scope.$storage.sessiondate;
                var smt = document.getElementById("Inputdate").value;
                $scope.$storage = $sessionStorage.$default({
                    sessiondate: smt
                });
                delete regForm.Birth;
                regForm.Birth = $scope.$storage.sessiondate;
                var promiseGet = srvregister.PatRegister(regForm);
                promiseGet.then(function (result) {
                    if (result.data.name == 'Hata1') {
                        $scope.hiddenthing = 1;
                        //Kullanıcı adı alınmış hatası
                    }
                    else if (result.data.name == 'Hata2') {
                        $scope.hiddenthing = 2;
                        //E-mail daha önce alınmış hatası
                    }
                    else {
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

        //Datepicker için gerekli fonksiyon ve değişkenler BAŞLANGIÇ
        $scope.format = 'yyyy-MM-dd';
        $scope.today = function () {
            $scope.dt = new Date();
        };
        $scope.today();
        $scope.inlineOptions = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: false
        };
        $scope.altInputFormats = ['M!/d!/yyyy'];
        $scope.dateOptions = {
            //dateDisabled: disabled,
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };
        $scope.toggleMin = function () {
            $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
            $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
        };
        $scope.toggleMin();
        $scope.open1 = function () {
            $scope.popup1.opened = true;
        };
        $scope.popup1 = {
            opened: false
        };
        //Datepicker için gerekli fonksiyon ve değişkenler SON

        function getDayClass(data) {
            var date = data.date,
                mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        }
        //Datepicker için gerekli fonksiyon ve değişkenler SON


    }]);