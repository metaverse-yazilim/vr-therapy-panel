angular.module('vrTheraphy').controller('patientinfo_controller', ['$scope', '$http', '$state', '$stateParams', '$localStorage', '$sessionStorage', '$rootScope', '$uibModal', 'srvLogin',
    function ($scope, $http, $state, $stateParams, $localStorage, $sessionStorage, $rootScope, $uibModal, srvLogin) {
        $scope.init = function () {
            $.Pages.init();
        };

        $scope.initer = function () {
            $scope.patientinfo();
            $scope.sessionlist();
        };
        //$scope.sessioneditformf = function (){
        //    $scope.sessioneditform = {
        //        Date: document.getElementById("Text2").value
        //    };
        //}

        $scope.testa = {};
        $scope.testa = $rootScope.$storage;

        //Danışan bilgilerinin alındığı fonksiyon
        $scope.patientinfo = function () {
            var loginForm = $scope.testa;
            var promiseGet = srvLogin.Patinfo(loginForm);
            promiseGet.then(function (result) {
                delete $rootScope.$storage.patinfo;

                $rootScope.$storage = $sessionStorage.$default({
                    patinfo: result.data,
                });
            });
        };

        //Modal için gerekli değişkenler başlangıç
        $scope.selIdxx = -1;

        $scope.selses = function (idxx) {
            $scope.selIdxx = idxx;
        }
        $scope.isSes = function (idxx) {
            return (idxx === $scope.selIdxx);
        }
        //Modal için gerekli değişkenler son

        //Siyah-gri details&edit için gerekli fonksiyonlar başlangıç
        $scope.findsrc = function (bool) {
            if (bool == true) {
                var answer = "../Images/check.png";
                return answer;
            }
            else {
                var answer = "../Images/not.jpg";
                return answer;
            }
        }

        $scope.findesrc = function (bool) {
            if (bool == true) {
                var answer = "../Images/edit-gray.png";
                return answer;
            }
            else {
                var answer = "../Images/edit.png";
                return answer;
            }
        }

        $scope.findetrgt = function (bool) {
            if (bool == true) {
                var answer = "";
                return answer;
            }
            else {
                var answer = "#editModal";
                return answer;
            }
        }

        $scope.findetog = function (bool) {
            if (bool == true) {
                var answer = "";
                return answer;
            }
            else {
                var answer = "modal";
                return answer;
            }
        }

        $scope.finddsrc = function (bool) {
            if (bool == true) {
                var answer = "../Images/details.png";
                return answer;
            }
            else {
                var answer = "../Images/details-gray.png";
                return answer;
            }
        }

        $scope.godetails = function (bool) {
            if (bool == true) {
                $state.go('aftersession', {});
            }
            else {
            }
        }
        //Siyah-gri details&edit için gerekli fonksiyonlar son

        //sorting değişkeni
        $scope.sortTypee = 'next_session';

        //sayfayı yeniden yükleme fonksiyonu
        $scope.myreload = function () {
            $state.reload();
        }

        //seans silme fonksiyonu başlangıç
        $scope.sesdel = function () {
            var smt = document.getElementById("Text1").value;
            $rootScope.$storage = $sessionStorage.$default({
                sesdelid: smt,
            });

            var loginForm = $scope.testa;
            var promiseGet = srvLogin.SesDel(loginForm);
            promiseGet.then(function (result) {
                delete $rootScope.$storage.sesdelid;
                $scope.myreload();
            });

            //$('#eraseModal').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        }
        //seans silme fonksiyonu son

        //seans editleme fonksiyonları
        $scope.sessionedit = function (seseditForm) {
            if ($scope.form.$valid) {
                $rootScope.$storage.seseditdate = $scope.form.date.$viewValue;
                $scope.sesedit();
                //var promiseGet = srvLogin.addsession(sesForm);
                //promiseGet.then(function (result) {
                //    delete $rootScope.$storage.addses;
                //    $rootScope.$storage = $sessionStorage.$default({
                //        addses: result.data,
                //    });
                //    if ($rootScope.$storage.addses.available == false) {
                //        $state.go('loggedin', {});
                //    }
                //    else {
                //        alert('Seans ayarlamak için çok yanlış bir tarih :)');
                //    }
                //});
            }
        };
        //2018/03/03 11:00:00
        $scope.sesedit = function () {
            var smt = document.getElementById("Text2").value;
            $rootScope.$storage = $sessionStorage.$default({
                seseditid: smt,
            });

            var loginForm = $scope.testa;
            var promiseGet = srvLogin.SesEdit(loginForm);
            promiseGet.then(function (result) {
                delete $rootScope.$storage.seseditid;
                delete $rootScope.$storage.seseditdate;
                $rootScope.$storage = $sessionStorage.$default({
                    newses: result.data,
                });
                if ($rootScope.$storage.newses.available == false) {
                    $scope.myreload();
                    delete $rootScope.$storage.newses;
                }
                else {
                    alert('Seans ayarlamak için çok yanlış bir tarih :)');
                    delete $rootScope.$storage.newses;
                }
            });


            //$('#editModal').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
            
        }
        //seans editleme fonksiyonları

        //seans listesi fonksiyonları
        $scope.sessionlist = function () {
            var loginForm = $scope.testa;
            var promiseGet = srvLogin.PatSesList(loginForm);
            promiseGet.then(function (result) {
                delete $rootScope.$storage.patseslist;

                $rootScope.$storage = $sessionStorage.$default({
                    patseslist: result.data,
                });
            });
        }
        //seans listesi fonksiyonları

        //Seans başlatma fonksiyonu
        $scope.startSession = function () {
            $scope.patientinfo();
            if ($scope.testa.patinfo.available == true) {
                $scope.$storage = $sessionStorage.$default({
                    newsessionername: $scope.testa.infoname,
                    newsessionersurname: $scope.testa.infosurname,
                    sesid: $scope.testa.next_session_id
                });
                $state.go('startsession', {});
            }
            else {
                alert('Sıradaki seans saati seans başlatmak için uygun değil!');
            }
        };

        //Terapist Logout fonksiyonu
        $scope.userLogout = function () {
            $localStorage.$reset();
            $sessionStorage.$reset();
            delete $scope.$storage;
            $state.go('login', {});
        };
    }]);