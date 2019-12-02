angular.module('vrTheraphy').controller('newsession_controller', ['$scope', '$http', '$state', '$stateParams', '$localStorage', '$sessionStorage', '$rootScope', 'srvLogin',
    function ($scope, $http, $state, $stateParams, $localStorage, $sessionStorage, $rootScope, srvLogin) {
        if ($rootScope.$storage.back == 'patregister' || $rootScope.$storage.back == 'newsession' || $rootScope.$storage.back == 'startsession' || $rootScope.$storage.back == 'sessionedit' || $rootScope.$storage.back == 'loggedin') {
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
        $rootScope.$storage.back = 'newsession'
        $scope.init = function () {
            $.Pages.init();
        };
        $scope.initer = function () {
            $scope.userpatientlist();
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

        //kullanıcı listesi başlangıç
        $scope.userpatientlist = function () {
            var loginForm = $rootScope.$storage;
            var promiseGet = srvLogin.PatientList(loginForm);
            promiseGet.then(function (result) {
                delete $rootScope.$storage.patient;
                $rootScope.numberOfPatient = result.data.length
                $rootScope.$storage = $sessionStorage.$default({
                    patient: result.data,
                });
            });
        };
        //kullanıcı listesi son

        //seans ekleme fonksiyonu başlangıç
        $scope.session = function (sesForm) {
            if ($scope.form.$valid) {
                delete $rootScope.$storage.sessiondate;
                var smt = document.getElementById("Inputdate").value;
                sesForm.docid = $rootScope.$storage.userId
                $scope.$storage = $sessionStorage.$default({
                    sessiondate: smt
                });
                sesForm.Time = $scope.mytime;
                var newstr = sesForm.Time.toString();
                sesForm.GMT = ((new Date().getTimezoneOffset())/(-60));
                sesForm.Date = $scope.$storage.sessiondate;

                sesForm.Timezone = new Date().getTimezoneOffset();

                var promiseGet = srvLogin.addsession(sesForm);
                promiseGet.then(function (result) {
                    delete $rootScope.$storage.addses;
                    $rootScope.$storage = $sessionStorage.$default({
                        addses: result.data,
                    });
                    if ($rootScope.$storage.addses.available == true) {
                        $state.go('loggedin', {});
                    }
                    else {
                        alert('Geçmiş bir tarihe seans ayarlanamaz!');
                    }
                    delete $rootScope.$storage.sessiondate;
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