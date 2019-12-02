angular.module('vrTheraphy').controller('patloggedin_controller', ['$scope', '$http', '$state', '$stateParams', '$localStorage', '$sessionStorage', '$rootScope', '$uibModal', 'srvLogin',
    function ($scope, $http, $state, $stateParams, $localStorage, $sessionStorage, $rootScope, $uibModal, srvLogin) {
        $scope.init = function () {
            $.Pages.init();
            //$scope.$storage = $sessionStorage.$default({
            //    exposure: 0
            //});
            if ($rootScope.reloader == 1) {
                $rootScope.reloader = 2
                $state.reload();
            }
        };
        $scope.initer = function () {
            $rootScope.patinfo();

        };

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
                    patid: $scope.testa.userId,
                    from: '1',
                    patname: $scope.testa.username
                });
                delete $rootScope.$storage.infoid;
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
                $state.go('sessionoutline', {});
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

        ////Sorting için gerekli değişkenler başlangıç
        //$scope.sortType = 'username';
        //$scope.sortReverse = false;
        //$scope.searchPatient = '';
        //$scope.form = {};
        //$scope.pageSize = 5;
        //$scope.maxSize = 10;
        //$scope.currentPage = 1;
        ////Sorting için gerekli değişkenler son
        

        //Danışan bilgileri alma fonksiyonu başlangıç
        $rootScope.patinfo = function () {

            //var smt = document.getElementById("Text1").value;
            //var smt2 = document.getElementById("Text2").value;
            //delete $rootScope.$storage.infoid;
            //delete $rootScope.$storage.infoname;
            //$rootScope.$storage = $sessionStorage.$default({
            //    infoname: smt,
            //    infoid: smt2
            //});
            var loginForm = {
                infoid: $scope.testa.userId,
                userId: $scope.testa.doctorid
            }
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
            delete $rootScope.$storage;
            $state.go('login', {});
        };

    }]);