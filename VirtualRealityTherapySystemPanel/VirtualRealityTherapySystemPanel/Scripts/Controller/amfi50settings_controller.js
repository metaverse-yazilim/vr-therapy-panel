angular.module('vrTheraphy').controller('amfi50settings_controller', ['$scope', '$http', '$state', '$stateParams', '$localStorage', '$sessionStorage', '$rootScope', '$uibModal', 'srvSessionsettings',
    function ($scope, $http, $state, $stateParams, $localStorage, $sessionStorage, $rootScope, $uibModal, srvSessionsettings) {
        $scope.init = function () {
            if ($rootScope.$storage.back == 'startsession' || $rootScope.$storage.back == 'sessionscenario') {

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
            $rootScope.$storage.back = 'sessionscenario'
            $.Pages.init();
            $scope.availables = 101
            $scope.availabler = 101
            $scope.availableu = 101
            $scope.availablen = 101
        };

        $scope.settings = {
            conditions: 0,
            conditionr: 0,
            conditionu: 0,
            conditionn: 0,
            crowd: '2',
            gender: '2',
            age: '2',
            control: '0',
        };

        $scope.width = document.getElementById("page").clientWidth;


        $scope.testa = {};
        $scope.testa = $rootScope.$storage;

        //Terapist Logout fonksiyonu
        $scope.userLogout = function () {
            $localStorage.$reset();
            $sessionStorage.$reset();
            delete $scope.$storage;
            $state.go('login', {});
        };
        
        $scope.tutumhide = function () {
            $('#tutumModal').modal('hide')
        }

        //Seans başlatma fonksiyonu başlangıç
        $scope.amfi50 = function (settingsForm) {
            if (($scope.availables + $scope.availablen + $scope.availableu + $scope.availabler < 105)) {
                settingsForm.sesid = $scope.$storage.sesid;
                settingsForm.userId = $scope.$storage.userId;
                settingsForm.patid = $scope.$storage.patid;
                var promiseGet = srvSessionsettings.amfi50(settingsForm);
                promiseGet.then(function (result) {
                    delete $rootScope.$storage.patid
                    delete $rootScope.$storage.sesid
                    delete $rootScope.$storage.userId
                    delete $rootScope.$storage.avatar1
                    delete $rootScope.$storage.avatar2
                    delete $rootScope.$storage.avatar3
                    delete $rootScope.$storage.avatar4
                    delete $rootScope.$storage.avatar5
                    delete $rootScope.$storage.conditions
                    delete $rootScope.$storage.conditionr
                    delete $rootScope.$storage.conditionu
                    delete $rootScope.$storage.conditionn
                    delete $rootScope.$storage.exposure
                    delete $rootScope.$storage.available
                    $rootScope.$storage.patid = settingsForm.patid;
                    $rootScope.$storage.sesid = settingsForm.sesid;
                    $rootScope.$storage.userId = settingsForm.userId;
                    $rootScope.$storage.conditions = settingsForm.conditions;
                    $rootScope.$storage.conditionr = settingsForm.conditionr;
                    $rootScope.$storage.conditionu = settingsForm.conditionu;
                    $rootScope.$storage.conditionn = settingsForm.conditionn;
                    $rootScope.$storage.patname = $scope.testa.newsessionername;
                    $rootScope.$storage.available = $scope.available;
                    $rootScope.$storage.back = 'settingstolive'
                    $scope.$storage = $sessionStorage.$default({
                        avatar1: result.data[1],
                        avatar2: result.data[2],
                        avatar3: result.data[3],
                        avatar4: result.data[4],
                        avatar5: result.data[5],
                        exposure: result.data[0]
                    });
                    $rootScope.$storage.avatar1 = $scope.$storage.avatar1;
                    $rootScope.$storage.avatar2 = $scope.$storage.avatar2;
                    $rootScope.$storage.avatar3 = $scope.$storage.avatar3;
                    $rootScope.$storage.avatar4 = $scope.$storage.avatar4;
                    $rootScope.$storage.avatar5 = $scope.$storage.avatar5;
                    $rootScope.$storage.exposure = $scope.$storage.exposure;
                    $rootScope.$storage.control = settingsForm.control;
                    $state.go('amfi50session', {});
                });
            }
            else {
                $('#tutumModal').modal('show');
            }
        };
        //Seans başlatma fonksiyonu son

        //AVATAR DAVRANIŞ YÜZDELERİ İÇİN YAZILMIŞ FONKSİYONLAR BAŞLANGIÇ
        //AÇIKLAMA: percent fonksiyonları davranışların yüzdesini(condition) değiştiriyor
        //AÇIKLAMA: available değişkenleri disabled için kullanılıyor
        //AÇIKLAMA: SONA GELEN TAKILARIN AÇILIMLARI BİR ALT SATIRDA
        //sup (s): destekleyici, rej (r): reddedici, unint (u):ilgisiz, neu (n): nötr
        //Destekleyici Avatar Yüzdesi için fonksiyonlar BAŞLANGIÇ
        $scope.percentsup0 = function () {
            if ($scope.settings.conditions == 25) {
                $scope.settings.conditions = 0
                $scope.availabler = $scope.availabler + 25
                $scope.availableu = $scope.availableu + 25
                $scope.availablen = $scope.availablen + 25
            }
            else if ($scope.settings.conditions == 50) {
                $scope.settings.conditions = 0
                $scope.availabler = $scope.availabler + 50
                $scope.availableu = $scope.availableu + 50
                $scope.availablen = $scope.availablen + 50
            }
            else if ($scope.settings.conditions == 75) {
                $scope.settings.conditions = 0
                $scope.availabler = $scope.availabler + 75
                $scope.availableu = $scope.availableu + 75
                $scope.availablen = $scope.availablen + 75
            }
            else if ($scope.settings.conditions == 100) {
                $scope.settings.conditions = 0
                $scope.availabler = $scope.availabler + 100
                $scope.availableu = $scope.availableu + 100
                $scope.availablen = $scope.availablen + 100
            }
        };

        $scope.percentsup25 = function () {
            if ($scope.settings.conditions == 0 && $scope.availables > 25) {
                $scope.settings.conditions = 25
                $scope.availabler = $scope.availabler - 25
                $scope.availableu = $scope.availableu - 25
                $scope.availablen = $scope.availablen - 25
            }
            else if ($scope.settings.conditions == 50) {
                $scope.settings.conditions = 25
                $scope.availabler = $scope.availabler + 25
                $scope.availableu = $scope.availableu + 25
                $scope.availablen = $scope.availablen + 25
            }
            else if ($scope.settings.conditions == 75) {
                $scope.settings.conditions = 25
                $scope.availabler = $scope.availabler + 50
                $scope.availableu = $scope.availableu + 50
                $scope.availablen = $scope.availablen + 50
            }
            else if ($scope.settings.conditions == 100) {
                $scope.settings.conditions = 25
                $scope.availabler = $scope.availabler + 75
                $scope.availableu = $scope.availableu + 75
                $scope.availablen = $scope.availablen + 75
            }
        };

        $scope.percentsup50 = function () {
            if ($scope.settings.conditions == 0 && $scope.availables > 50) {
                $scope.settings.conditions = 50
                $scope.availabler = $scope.availabler - 50
                $scope.availableu = $scope.availableu - 50
                $scope.availablen = $scope.availablen - 50
            }
            else if ($scope.settings.conditions == 25 && $scope.availables > 50) {
                $scope.settings.conditions = 50
                $scope.availabler = $scope.availabler - 25
                $scope.availableu = $scope.availableu - 25
                $scope.availablen = $scope.availablen - 25
            }
            else if ($scope.settings.conditions == 75) {
                $scope.settings.conditions = 50
                $scope.availabler = $scope.availabler + 25
                $scope.availableu = $scope.availableu + 25
                $scope.availablen = $scope.availablen + 25
            }
            else if ($scope.settings.conditions == 100) {
                $scope.settings.conditions = 50
                $scope.availabler = $scope.availabler + 50
                $scope.availableu = $scope.availableu + 50
                $scope.availablen = $scope.availablen + 50
            }
        };

        $scope.percentsup75 = function () {
            if ($scope.settings.conditions == 0 && $scope.availables > 75) {
                $scope.settings.conditions = 75
                $scope.availabler = $scope.availabler - 75
                $scope.availableu = $scope.availableu - 75
                $scope.availablen = $scope.availablen - 75
            }
            else if ($scope.settings.conditions == 25 && $scope.availables > 75) {
                $scope.settings.conditions = 75
                $scope.availabler = $scope.availabler - 50
                $scope.availableu = $scope.availableu - 50
                $scope.availablen = $scope.availablen - 50
            }
            else if ($scope.settings.conditions == 50 && $scope.availables > 75) {
                $scope.settings.conditions = 75
                $scope.availabler = $scope.availabler - 25
                $scope.availableu = $scope.availableu - 25
                $scope.availablen = $scope.availablen - 25
            }
            else if ($scope.settings.conditions == 100) {
                $scope.settings.conditions = 75
                $scope.availabler = $scope.availabler + 25
                $scope.availableu = $scope.availableu + 25
                $scope.availablen = $scope.availablen + 25
            }
        };

        $scope.percentsup100 = function () {
            if ($scope.settings.conditions == 0 && $scope.availables > 100) {
                $scope.settings.conditions = 100
                $scope.availabler = $scope.availabler - 100
                $scope.availableu = $scope.availableu - 100
                $scope.availablen = $scope.availablen - 100
            }
            else if ($scope.settings.conditions == 25 && $scope.availables > 100) {
                $scope.settings.conditions = 100
                $scope.availabler = $scope.availabler - 75
                $scope.availableu = $scope.availableu - 75
                $scope.availablen = $scope.availablen - 75
            }
            else if ($scope.settings.conditions == 50 && $scope.availables > 100) {
                $scope.settings.conditions = 100
                $scope.availabler = $scope.availabler - 50
                $scope.availableu = $scope.availableu - 50
                $scope.availablen = $scope.availablen - 50
            }
            else if ($scope.settings.conditions == 75 && $scope.availables > 100) {
                $scope.settings.conditions = 100
                $scope.availabler = $scope.availabler - 25
                $scope.availableu = $scope.availableu - 25
                $scope.availablen = $scope.availablen - 25
            }
        };
        //Destekleyici Avatar Yüzdesi için fonksiyonlar SON


        //Reddedici Avatar Yüzdesi için fonksiyonlar BAŞLANGIÇ
        $scope.percentrej0 = function () {
            if ($scope.settings.conditionr == 25) {
                $scope.settings.conditionr = 0
                $scope.availables = $scope.availables + 25
                $scope.availableu = $scope.availableu + 25
                $scope.availablen = $scope.availablen + 25
            }
            else if ($scope.settings.conditionr == 50) {
                $scope.settings.conditionr = 0
                $scope.availables = $scope.availables + 50
                $scope.availableu = $scope.availableu + 50
                $scope.availablen = $scope.availablen + 50
            }
            else if ($scope.settings.conditionr == 75) {
                $scope.settings.conditionr = 0
                $scope.availables = $scope.availables + 75
                $scope.availableu = $scope.availableu + 75
                $scope.availablen = $scope.availablen + 75
            }
            else if ($scope.settings.conditionr == 100) {
                $scope.settings.conditionr = 0
                $scope.availables = $scope.availables + 100
                $scope.availableu = $scope.availableu + 100
                $scope.availablen = $scope.availablen + 100
            }
        };

        $scope.percentrej25 = function () {
            if ($scope.settings.conditionr == 0 && $scope.availabler > 25) {
                $scope.settings.conditionr = 25
                $scope.availables = $scope.availables - 25
                $scope.availableu = $scope.availableu - 25
                $scope.availablen = $scope.availablen - 25
            }
            else if ($scope.settings.conditionr == 50) {
                $scope.settings.conditionr = 25
                $scope.availables = $scope.availables + 25
                $scope.availableu = $scope.availableu + 25
                $scope.availablen = $scope.availablen + 25
            }
            else if ($scope.settings.conditionr == 75) {
                $scope.settings.conditionr = 25
                $scope.availables = $scope.availables + 50
                $scope.availableu = $scope.availableu + 50
                $scope.availablen = $scope.availablen + 50
            }
            else if ($scope.settings.conditionr == 100) {
                $scope.settings.conditionr = 25
                $scope.availables = $scope.availables + 75
                $scope.availableu = $scope.availableu + 75
                $scope.availablen = $scope.availablen + 75
            }
        };

        $scope.percentrej50 = function () {
            if ($scope.settings.conditionr == 0 && $scope.availabler > 50) {
                $scope.settings.conditionr = 50
                $scope.availables = $scope.availables - 50
                $scope.availableu = $scope.availableu - 50
                $scope.availablen = $scope.availablen - 50
            }
            else if ($scope.settings.conditionr == 25 && $scope.availabler > 50) {
                $scope.settings.conditionr = 50
                $scope.availables = $scope.availables - 25
                $scope.availableu = $scope.availableu - 25
                $scope.availablen = $scope.availablen - 25
            }
            else if ($scope.settings.conditionr == 75) {
                $scope.settings.conditionr = 50
                $scope.availables = $scope.availables + 25
                $scope.availableu = $scope.availableu + 25
                $scope.availablen = $scope.availablen + 25
            }
            else if ($scope.settings.conditionr == 100) {
                $scope.settings.conditionr = 50
                $scope.availables = $scope.availables + 50
                $scope.availableu = $scope.availableu + 50
                $scope.availablen = $scope.availablen + 50
            }
        };

        $scope.percentrej75 = function () {
            if ($scope.settings.conditionr == 0 && $scope.availabler > 75) {
                $scope.settings.conditionr = 75
                $scope.availables = $scope.availables - 75
                $scope.availableu = $scope.availableu - 75
                $scope.availablen = $scope.availablen - 75
            }
            else if ($scope.settings.conditionr == 25 && $scope.availabler > 75) {
                $scope.settings.conditionr = 75
                $scope.availables = $scope.availables - 50
                $scope.availableu = $scope.availableu - 50
                $scope.availablen = $scope.availablen - 50
            }
            else if ($scope.settings.conditionr == 50 && $scope.availabler > 75) {
                $scope.settings.conditionr = 75
                $scope.availables = $scope.availables - 25
                $scope.availableu = $scope.availableu - 25
                $scope.availablen = $scope.availablen - 25
            }
            else if ($scope.settings.conditionr == 100) {
                $scope.settings.conditionr = 75
                $scope.availables = $scope.availables + 25
                $scope.availableu = $scope.availableu + 25
                $scope.availablen = $scope.availablen + 25
            }
        };

        $scope.percentrej100 = function () {
            if ($scope.settings.conditionr == 0 && $scope.availabler > 100) {
                $scope.settings.conditionr = 100
                $scope.availables = $scope.availables - 100
                $scope.availableu = $scope.availableu - 100
                $scope.availablen = $scope.availablen - 100
            }
            else if ($scope.settings.conditionr == 25 && $scope.availabler > 100) {
                $scope.settings.conditionr = 100
                $scope.availables = $scope.availables - 75
                $scope.availableu = $scope.availableu - 75
                $scope.availablen = $scope.availablen - 75
            }
            else if ($scope.settings.conditionr == 50 && $scope.availabler > 100) {
                $scope.settings.conditionr = 100
                $scope.availables = $scope.availables - 50
                $scope.availableu = $scope.availableu - 50
                $scope.availablen = $scope.availablen - 50
            }
            else if ($scope.settings.conditionr == 75 && $scope.availabler > 100) {
                $scope.settings.conditionr = 100
                $scope.availables = $scope.availables - 25
                $scope.availableu = $scope.availableu - 25
                $scope.availablen = $scope.availablen - 25
            }
        };
        //Reddedici Avatar Yüzdesi için fonksiyonlar SON


        //İlgisiz Avatar Yüzdesi için fonksiyonlar BAŞLANGIÇ
        $scope.percentunint0 = function () {
            if ($scope.settings.conditionu == 25) {
                $scope.settings.conditionu = 0
                $scope.availabler = $scope.availabler + 25
                $scope.availables = $scope.availables + 25
                $scope.availablen = $scope.availablen + 25
            }
            else if ($scope.settings.conditionu == 50) {
                $scope.settings.conditionu = 0
                $scope.availabler = $scope.availabler + 50
                $scope.availables = $scope.availables + 50
                $scope.availablen = $scope.availablen + 50
            }
            else if ($scope.settings.conditionu == 75) {
                $scope.settings.conditionu = 0
                $scope.availabler = $scope.availabler + 75
                $scope.availables = $scope.availables + 75
                $scope.availablen = $scope.availablen + 75
            }
            else if ($scope.settings.conditionu == 100) {
                $scope.settings.conditionu = 0
                $scope.availabler = $scope.availabler + 100
                $scope.availables = $scope.availables + 100
                $scope.availablen = $scope.availablen + 100
            }
        };

        $scope.percentunint25 = function () {
            if ($scope.settings.conditionu == 0 && $scope.availableu > 25) {
                $scope.settings.conditionu = 25
                $scope.availabler = $scope.availabler - 25
                $scope.availables = $scope.availables - 25
                $scope.availablen = $scope.availablen - 25
            }
            else if ($scope.settings.conditionu == 50) {
                $scope.settings.conditionu = 25
                $scope.availabler = $scope.availabler + 25
                $scope.availables = $scope.availables + 25
                $scope.availablen = $scope.availablen + 25
            }
            else if ($scope.settings.conditionu == 75) {
                $scope.settings.conditionu = 25
                $scope.availabler = $scope.availabler + 50
                $scope.availables = $scope.availables + 50
                $scope.availablen = $scope.availablen + 50
            }
            else if ($scope.settings.conditionu == 100) {
                $scope.settings.conditionu = 25
                $scope.availabler = $scope.availabler + 75
                $scope.availables = $scope.availables + 75
                $scope.availablen = $scope.availablen + 75
            }
        };

        $scope.percentunint50 = function () {
            if ($scope.settings.conditionu == 0 && $scope.availableu > 50) {
                $scope.settings.conditionu = 50
                $scope.availabler = $scope.availabler - 50
                $scope.availables = $scope.availables - 50
                $scope.availablen = $scope.availablen - 50
            }
            else if ($scope.settings.conditionu == 25 && $scope.availableu > 50) {
                $scope.settings.conditionu = 50
                $scope.availabler = $scope.availabler - 25
                $scope.availables = $scope.availables - 25
                $scope.availablen = $scope.availablen - 25
            }
            else if ($scope.settings.conditionu == 75) {
                $scope.settings.conditionu = 50
                $scope.availabler = $scope.availabler + 25
                $scope.availables = $scope.availables + 25
                $scope.availablen = $scope.availablen + 25
            }
            else if ($scope.settings.conditionu == 100) {
                $scope.settings.conditionu = 50
                $scope.availabler = $scope.availabler + 50
                $scope.availables = $scope.availables + 50
                $scope.availablen = $scope.availablen + 50
            }
        };

        $scope.percentunint75 = function () {
            if ($scope.settings.conditionu == 0 && $scope.availableu > 75) {
                $scope.settings.conditionu = 75
                $scope.availabler = $scope.availabler - 75
                $scope.availables = $scope.availables - 75
                $scope.availablen = $scope.availablen - 75
            }
            else if ($scope.settings.conditionu == 25 && $scope.availableu > 75) {
                $scope.settings.conditionu = 75
                $scope.availabler = $scope.availabler - 50
                $scope.availables = $scope.availables - 50
                $scope.availablen = $scope.availablen - 50
            }
            else if ($scope.settings.conditionu == 50 && $scope.availableu > 75) {
                $scope.settings.conditionu = 75
                $scope.availabler = $scope.availabler - 25
                $scope.availables = $scope.availables - 25
                $scope.availablen = $scope.availablen - 25
            }
            else if ($scope.settings.conditionu == 100) {
                $scope.settings.conditionu = 75
                $scope.availabler = $scope.availabler + 25
                $scope.availables = $scope.availables + 25
                $scope.availablen = $scope.availablen + 25
            }
        };

        $scope.percentunint100 = function () {
            if ($scope.settings.conditionu == 0 && $scope.availableu > 100) {
                $scope.settings.conditionu = 100
                $scope.availabler = $scope.availabler - 100
                $scope.availables = $scope.availables - 100
                $scope.availablen = $scope.availablen - 100
            }
            else if ($scope.settings.conditionu == 25 && $scope.availableu > 100) {
                $scope.settings.conditionu = 100
                $scope.availabler = $scope.availabler - 75
                $scope.availables = $scope.availables - 75
                $scope.availablen = $scope.availablen - 75
            }
            else if ($scope.settings.conditionu == 50 && $scope.availableu > 100) {
                $scope.settings.conditionu = 100
                $scope.availabler = $scope.availabler - 50
                $scope.availables = $scope.availables - 50
                $scope.availablen = $scope.availablen - 50
            }
            else if ($scope.settings.conditionu == 75 && $scope.availableu > 100) {
                $scope.settings.conditionu = 100
                $scope.availabler = $scope.availabler - 25
                $scope.availables = $scope.availables - 25
                $scope.availablen = $scope.availablen - 25
            }
        };
        //İlgisiz Avatar Yüzdesi için fonksiyonlar SON


        //Nötr Avatar Yüzdesi için fonksiyonlar BAŞLANGIÇ
        $scope.percentneu0 = function () {
            if ($scope.settings.conditionn == 25) {
                $scope.settings.conditionn = 0
                $scope.availabler = $scope.availabler + 25
                $scope.availableu = $scope.availableu + 25
                $scope.availables = $scope.availables + 25
            }
            else if ($scope.settings.conditionn == 50) {
                $scope.settings.conditionn = 0
                $scope.availabler = $scope.availabler + 50
                $scope.availableu = $scope.availableu + 50
                $scope.availables = $scope.availables + 50
            }
            else if ($scope.settings.conditionn == 75) {
                $scope.settings.conditionn = 0
                $scope.availabler = $scope.availabler + 75
                $scope.availableu = $scope.availableu + 75
                $scope.availables = $scope.availables + 75
            }
            else if ($scope.settings.conditionn == 100) {
                $scope.settings.conditionn = 0
                $scope.availabler = $scope.availabler + 100
                $scope.availableu = $scope.availableu + 100
                $scope.availables = $scope.availables + 100
            }
        };

        $scope.percentneu25 = function () {
            if ($scope.settings.conditionn == 0 && $scope.availablen > 25) {
                $scope.settings.conditionn = 25
                $scope.availabler = $scope.availabler - 25
                $scope.availableu = $scope.availableu - 25
                $scope.availables = $scope.availables - 25
            }
            else if ($scope.settings.conditionn == 50) {
                $scope.settings.conditionn = 25
                $scope.availabler = $scope.availabler + 25
                $scope.availableu = $scope.availableu + 25
                $scope.availables = $scope.availables + 25
            }
            else if ($scope.settings.conditionn == 75) {
                $scope.settings.conditionn = 25
                $scope.availabler = $scope.availabler + 50
                $scope.availableu = $scope.availableu + 50
                $scope.availables = $scope.availables + 50
            }
            else if ($scope.settings.conditionn == 100) {
                $scope.settings.conditionn = 25
                $scope.availabler = $scope.availabler + 75
                $scope.availableu = $scope.availableu + 75
                $scope.availables = $scope.availables + 75
            }
        };

        $scope.percentneu50 = function () {
            if ($scope.settings.conditionn == 0 && $scope.availablen > 50) {
                $scope.settings.conditionn = 50
                $scope.availabler = $scope.availabler - 50
                $scope.availableu = $scope.availableu - 50
                $scope.availables = $scope.availables - 50
            }
            else if ($scope.settings.conditionn == 25 && $scope.availablen > 50) {
                $scope.settings.conditionn = 50
                $scope.availabler = $scope.availabler - 25
                $scope.availableu = $scope.availableu - 25
                $scope.availables = $scope.availables - 25
            }
            else if ($scope.settings.conditionn == 75) {
                $scope.settings.conditionn = 50
                $scope.availabler = $scope.availabler + 25
                $scope.availableu = $scope.availableu + 25
                $scope.availables = $scope.availables + 25
            }
            else if ($scope.settings.conditionn == 100) {
                $scope.settings.conditionn = 50
                $scope.availabler = $scope.availabler + 50
                $scope.availableu = $scope.availableu + 50
                $scope.availables = $scope.availables + 50
            }
        };

        $scope.percentneu75 = function () {
            if ($scope.settings.conditionn == 0 && $scope.availablen > 75) {
                $scope.settings.conditionn = 75
                $scope.availabler = $scope.availabler - 75
                $scope.availableu = $scope.availableu - 75
                $scope.availables = $scope.availables - 75
            }
            else if ($scope.settings.conditionn == 25 && $scope.availablen > 75) {
                $scope.settings.conditionn = 75
                $scope.availabler = $scope.availabler - 50
                $scope.availableu = $scope.availableu - 50
                $scope.availables = $scope.availables - 50
            }
            else if ($scope.settings.conditionn == 50 && $scope.availablen > 75) {
                $scope.settings.conditionn = 75
                $scope.availabler = $scope.availabler - 25
                $scope.availableu = $scope.availableu - 25
                $scope.availables = $scope.availables - 25
            }
            else if ($scope.settings.conditionn == 100) {
                $scope.settings.conditionn = 75
                $scope.availabler = $scope.availabler + 25
                $scope.availableu = $scope.availableu + 25
                $scope.availables = $scope.availables + 25
            }
        };

        $scope.percentneu100 = function () {
            if ($scope.settings.conditionn == 0 && $scope.availablen > 100) {
                $scope.settings.conditionn = 100
                $scope.availabler = $scope.availabler - 100
                $scope.availableu = $scope.availableu - 100
                $scope.availables = $scope.availables - 100
            }
            else if ($scope.settings.conditionn == 25 && $scope.availablen > 100) {
                $scope.settings.conditionn = 100
                $scope.availabler = $scope.availabler - 75
                $scope.availableu = $scope.availableu - 75
                $scope.availables = $scope.availables - 75
            }
            else if ($scope.settings.conditionn == 50 && $scope.availablen > 100) {
                $scope.settings.conditionn = 100
                $scope.availabler = $scope.availabler - 50
                $scope.availableu = $scope.availableu - 50
                $scope.availables = $scope.availables - 50
            }
            else if ($scope.settings.conditionn == 75 && $scope.availablen > 100) {
                $scope.settings.conditionn = 100
                $scope.availabler = $scope.availabler - 25
                $scope.availableu = $scope.availableu - 25
                $scope.availables = $scope.availables - 25
            }
        };
        //Nötr Avatar Yüzdesi için fonksiyonlar SON
        //AVATAR DAVRANIŞ YÜZDELERİ İÇİN YAZILMIŞ FONKSİYONLAR SON

    }]);