angular.module('vrTheraphy').controller('loggedin_controller', ['$scope', '$http', '$state', '$stateParams', '$localStorage', '$sessionStorage', '$rootScope', '$uibModal', 'srvLogin', '$window',
    function ($scope, $http, $state, $stateParams, $localStorage, $sessionStorage, $rootScope, $uibModal, srvLogin, $window) {
        $scope.init = function () {
            if ($rootScope.$storage.back == 'tologgedin' || $rootScope.$storage.back == 'patregister' || $rootScope.$storage.back == 'newsession' || $rootScope.$storage.back == 'startsession' || $rootScope.$storage.back == 'loggedin' || $rootScope.$storage.back == 'login' || $rootScope.$storage.back == 'aftersessionsaved' || $rootScope.$storage.back == 'sessionedit') {
            }
            else {
                if ($rootScope.$storage.login == '1') {}
                else {
                    $localStorage.$reset();
                    $sessionStorage.$reset();
                    delete $rootScope.$storage;
                    $state.go('login', {});
                }
            }
            $rootScope.$storage.back = 'loggedin';
            $rootScope.$storage.login = '1';
            $.Pages.init();
            //$scope.$storage = $sessionStorage.$default({
            //    exposure: 0
            //});
            if ($rootScope.reloader == 1) {
                $rootScope.reloader = 0
                $state.reload();
            }
        };
        $scope.initer = function () {
            $rootScope.sessioncount();
            $rootScope.userpatientlist();

        };
        $scope.onExit = function () {
        };
        $window.onbeforeunload = $scope.onExit;

        //var scope = angular.element($("#someId")).scope();
        $rootScope.test = {};
        $rootScope.test = $rootScope.$storage;

        $scope.testa = {};
        $scope.testa = $rootScope.$storage;

        //Modal için gerekli değişkenler başlangıç
        $rootScope.selIdx = -1;
        $scope.testa.active = 0;
        $rootScope.selpat = function (idx) {
            $scope.testa.active = 0;
            $rootScope.selIdx = idx;
        }
        $rootScope.isSelPatient = function (idx) {
            return (idx === $rootScope.selIdx);
        }
        //Modal için gerekli değişkenler son
        //Modal için gerekli değişkenler başlangıç
        $scope.selIdxx = -1;

        $scope.selses = function (idxx) {
            $scope.selIdxx = idxx;
        }
        $scope.isSes = function (idxx) {
            return (idxx === $scope.selIdxx);
        }
        //Modal için gerekli değişkenler son

        var answer = "";

        //Siyah-gri details&edit için gerekli fonksiyonlar başlangıç
        $scope.findsrc = function (bool) {
            if (bool !== "-") {
                answer = "../Images/check.png";
                return answer;
            }
            else {
                answer = "../Images/not.jpg";
                return answer;
            }
        }

        $scope.findesrc = function (bool) {
            if (bool !== "-") {
                answer = "../Images/edit-gray.png";
                return answer;
            }
            else {
                answer = "../Images/edit.png";
                return answer;
            }
        }

        $scope.findetrgt = function (bool) {
            if (bool !== "-") {
                answer = "";
                return answer;
            }
            else {
                answer = "#editModal";
                return answer;
            }
        }

        $scope.findetog = function (bool) {
            if (bool !== "-") {
                answer = "";
                return answer;
            }
            else {
                answer = "modal";
                return answer;
            }
        }

        $scope.finddsrc = function (bool) {
            if (bool !== "-") {
                answer = "../Images/details.png";
                return answer;
            }
            else {
                answer = "../Images/details-gray.png";
                return answer;
            }
        }

        $scope.finddtog = function (bool) {
            if (bool !== "-") {
                answer = "modal";
                return answer;
            }
            else {
                answer = "";
                return answer;
            }
        }

        $scope.finddtrgt = function (bool) {
            if (bool !== "-") {
                answer = "#detailModal";
                return answer;
            }
            else {
                answer = "";
                return answer;
            }
        }

        $scope.godetails = function () {
            var smt = document.getElementById("Text6").value;
            var nothingform = {
                sesid : smt,
            }
            var promiseGet = srvLogin.SesFinder(nothingform);
            promiseGet.then(function (result) {
                delete $rootScope.$storage.patid;
                delete $rootScope.$storage.sesid;
                delete $rootScope.$storage.from;
                delete $rootScope.$storage.patname;
                $rootScope.$storage = $sessionStorage.$default({
                    sesid: result.data,
                    patid: $scope.testa.infoid,
                    from: '1',
                    patname: $scope.testa.infoname
                });
                $rootScope.$storage.back = 'loggedintoafter'
                delete $rootScope.$storage.infoid;
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
                $state.go('aftersession', {});
            });

        }
        //Siyah-gri details&edit için gerekli fonksiyonlar son

        //modaldaki sorting değişkenleri
        $scope.sortReversee = false;
        $scope.sortTypee = 'next_session';
        //modaldaki sorting değişkenleri

        //sayfayı yeniden yükleme fonksiyonu
        $scope.myreload = function () {
            $state.reload();
        }

        //seans silme fonksiyonu başlangıç
        $scope.sesdel = function () {
            var smt = document.getElementById("Text4").value;
            $rootScope.$storage = $sessionStorage.$default({
                sesdelid: smt,
            });

            var loginForm = $scope.testa;
            var newstr = $scope.mytime.toString();
            loginForm.GMT = ((new Date().getTimezoneOffset())/(-60));
            var promiseGet = srvLogin.SesDel(loginForm);
            promiseGet.then(function (result) {
                delete $rootScope.$storage.sesdelid;
                $scope.myreload();
            });

            $('.modal-backdrop').remove();
            $('body').removeClass('modal-open');
            $('#eraseModal').modal('hide');
        }
        //seans silme fonksiyonu son

        //seans editleme fonksiyonları
        $scope.goedit = function () {
            var smt = document.getElementById("Text5").value;
            var smt2 = document.getElementById("Text7").value;
            delete $rootScope.$storage.seseditid;
            delete $rootScope.$storage.sesedittime;
            $rootScope.$storage = $sessionStorage.$default({
                seseditid: smt,
                sesedittime: smt2,
            });

            //$('#editModal').modal('hide');
            $rootScope.$storage.back = 'toedit'
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
            $state.go('sessionedit', {});
        }
        //seans editleme fonksiyonları

        //Seans başlatma fonksiyonu
        $scope.startSession = function () {
            var smt = document.getElementById("Text1").value;
            var smt2 = document.getElementById("Text2").value;
            delete $rootScope.$storage.infoid;
            delete $rootScope.$storage.infoname;
            $rootScope.$storage = $sessionStorage.$default({
                infoname: smt,
                infoid: smt2
            });
            var loginForm = $scope.testa;
            var newstr = $scope.mytime.toString();
            loginForm.GMT = ((new Date().getTimezoneOffset())/(-60));
            var promiseGet = srvLogin.Patinfo(loginForm);
            promiseGet.then(function (result) {
                delete $rootScope.$storage.patinfo;

                $rootScope.$storage = $sessionStorage.$default({
                    patinfo: result.data,
                });
                if ($scope.testa.patinfo.available == true) {
                    delete $scope.$storage.newsessionername;
                    delete $scope.$storage.patid;
                    delete $scope.$storage.sesid;
                    $scope.$storage = $sessionStorage.$default({
                        newsessionername: $scope.testa.infoname,
                        patid: $scope.testa.infoid,
                        sesid: $scope.testa.patinfo.sesid
                    });
                    $rootScope.$storage.back = 'loggedintostart'
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                    $state.go('startsession', {});
                }
                else {
                    alert('Sıradaki seans saati seans başlatmak için uygun değil!');
                }
            })
        }

        //Sorting için gerekli değişkenler başlangıç
        $scope.sortType = 'username';
        $scope.sortReverse = false;
        $scope.searchPatient = '';
        $scope.form = {};
        $scope.pageSize = 5;
        $scope.maxSize = 10;
        $scope.currentPage = 1;
        //Sorting için gerekli değişkenler son
        //search function
        $scope.filterfunc = function () {
            $scope.currentPage = 1;
        }


        //Danışan listesi alma fonksiyonu başlangıç
        $rootScope.userpatientlist = function () {
            var loginForm = $rootScope.$storage;
            var newstr = $scope.mytime.toString();
            loginForm.GMT = ((new Date().getTimezoneOffset())/(-60));
            var promiseGet = srvLogin.PatientList(loginForm);
            promiseGet.then(function (result) {
                delete $rootScope.$storage.patient;
                $rootScope.numberOfPatient = result.data.length
                $rootScope.$storage = $sessionStorage.$default({
                    patient: result.data,
                });
            });
        };
        //Danışan listesi alma fonksiyonu son

        //Seans sayısı alma fonksiyonu başlangıç
        $rootScope.sessioncount = function () {
            var loginForm = $rootScope.$storage;
            var newstr = $scope.mytime.toString();
            loginForm.GMT = ((new Date().getTimezoneOffset())/(-60));
            var promiseGet = srvLogin.opensescont(loginForm);
            promiseGet.then(function (result) {
                if (result.data.doctorid == "999") {

                }
                else {
                    delete $rootScope.$storage.last;
                    $rootScope.$storage = $sessionStorage.$default({
                        last: result.data.doctorid,
                    });
                    delete $scope.testa ;
                    $scope.testa = $rootScope.$storage
                }

            });
        };
        //Seans sayısı alma fonksiyonu son

        //Danışan bilgileri alma fonksiyonu başlangıç
        $scope.patinfo = function () {
            var smt = document.getElementById("Text1").value;
            var smt2 = document.getElementById("Text2").value;
            delete $rootScope.$storage.infoid;
            delete $rootScope.$storage.infoname;
            $rootScope.$storage = $sessionStorage.$default({
                infoname: smt,
                infoid: smt2
            });
            var loginForm = $scope.testa;
            var newstr = $scope.mytime.toString();
            loginForm.GMT = ((new Date().getTimezoneOffset())/(-60));
            var promiseGet = srvLogin.Patinfo(loginForm);
            promiseGet.then(function (result) {
                delete $rootScope.$storage.patinfo;

                $rootScope.$storage = $sessionStorage.$default({
                    patinfo: result.data,
                });
            });
            var promiseGet = srvLogin.PatSesList(loginForm);
            promiseGet.then(function (result) {
                delete $rootScope.$storage.patseslist;

                $rootScope.$storage = $sessionStorage.$default({
                    patseslist: result.data,
                });
            });

        };
        //Danışan bilgileri alma fonksiyonu son

        //Terapist Logout fonksiyonu
        $scope.userLogout = function () {
            $localStorage.$reset();
            $sessionStorage.$reset();
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
            delete $rootScope.$storage;
            $state.go('login', {});
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

        $scope.changed = function () {
            $scope.mytime = new Date($scope.mytime)
        };
        //Timepicker için gerekli fonksiyon ve değişkenler SON
    }]);