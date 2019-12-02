angular.module('vrTheraphy').controller('sessionedit_controller', ['$scope', '$http', '$state', '$stateParams', '$localStorage', '$sessionStorage', '$rootScope', 'srvLogin',
    function ($scope, $http, $state, $stateParams, $localStorage, $sessionStorage, $rootScope, srvLogin) {
        $scope.init = function () {
            if ($rootScope.$storage.back == 'toedit' || $rootScope.$storage.back == 'sessionedit') {
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
            $rootScope.$storage.back = 'sessionedit'
            $.Pages.init();
        };
        $scope.initer = function () {
            
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

        //seans ekleme fonksiyonu başlangıç
        $scope.session = function (sesForm) {
            if ($scope.form.$valid) {
                delete $rootScope.$storage.sessiondate;
                var smt = document.getElementById("Inputdate").value;
                $scope.$storage = $sessionStorage.$default({
                    sessiondate: smt
                });
                $scope.editform = {
                    infoid: $rootScope.$storage.infoid,
                    editid: $rootScope.$storage.seseditid,
                    Time: $scope.mytime,
                    Date: $scope.$storage.sessiondate,
                    Timezone: new Date().getTimezoneOffset()
                }
                var newstr = $scope.mytime.toString();
                $scope.editform.GMT = ((new Date().getTimezoneOffset())/(-60));
                var promiseGet = srvLogin.SesEdit($scope.editform);
                promiseGet.then(function (result) {
                    $rootScope.$storage = $sessionStorage.$default({
                        newses: result.data,
                    });
                    if ($rootScope.$storage.newses.available == true) {
                        $rootScope.$storage.back = 'tologgedin'
                        $state.go('loggedin', {});
                        delete $rootScope.$storage.newses;
                    }
                    else {
                        alert('Geçmiş bir tarihe seans ayarlanamaz!');
                        delete $rootScope.$storage.newses;
                    }
                });
            }
        };
        //seans ekleme fonksiyonu son


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
            maxDate: new Date(2030, 1, 1),
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

        //Timepicker için gerekli fonksiyon ve değişkenler BAŞLANGIÇ
        $scope.mytime = new Date();

        $scope.hstep = 1;
        $scope.mstep = 15;

        $scope.ismeridian = false;
        //Timepicker için gerekli fonksiyon ve değişkenler SON

        $scope.changed = function () {
            $scope.mytime = new Date($scope.mytime)
        };
    }]);