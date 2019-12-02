angular.module('vrTheraphy').controller('ac_me_settings_controller', ['$scope', '$http', '$state', '$stateParams', '$localStorage', '$sessionStorage', '$rootScope', '$uibModal', 'srvSessionsettings',
    function ($scope, $http, $state, $stateParams, $localStorage, $sessionStorage, $rootScope, $uibModal, srvSessionsettings) {
        $scope.settings = {
            age: '2',
            control: '0',
            koltuk1: 'B',
            koltuk2: 'B',
            koltuk3: 'B',
            koltuk4: 'B',
            koltuk5: 'B',
            koltuk6: 'B',
            conditions: '0',
            conditionr: '0',
            conditionu: '0',
            conditionn: '0',
        };
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
            $scope.availables = 0
            $scope.availabler = 0
            $scope.availableu = 0
            $scope.availablen = 0
            $scope.available = 0
        }

        $scope.testa = {};
        $scope.testa = $rootScope.$storage;

        //Terapist Logout fonksiyonu
        $scope.userLogout = function () {
            $localStorage.$reset();
            $sessionStorage.$reset();
            delete $scope.$storage;
            $state.go('login', {});
        };

        //Koltuk değiştirme fonksiyonları başlangıç
        $scope.change1 = function () {
            var elem = document.getElementById("myButton1");
            if (elem.value == "T") {
                var elem2 = document.getElementById("myButton2");
                var elem3 = document.getElementById("myButton3");
                var elem4 = document.getElementById("myButton4");
                var elem5 = document.getElementById("myButton5");
                var elem6 = document.getElementById("myButton6");
                if (elem2.value == "D" || elem3.value == "D" || elem4.value == "D" || elem5.value == "D" || elem6.value == "D") {
                    elem.value = "K";
                    $scope.settings.koltuk1 = "K";
                }
                else {
                    $scope.availables = $scope.availables - 1
                    $scope.availabler = $scope.availabler - 1
                    $scope.availableu = $scope.availableu - 1
                    $scope.availablen = $scope.availablen - 1
                    $scope.available = $scope.available - 1
                    elem.value = "D";
                    $scope.settings.koltuk1 = "D";
                }
            }
            else if (elem.value == "D") {
                $scope.availables = $scope.availables + 1
                $scope.availabler = $scope.availabler + 1
                $scope.availableu = $scope.availableu + 1
                $scope.availablen = $scope.availablen + 1
                $scope.available = $scope.available + 1
                elem.value = "K";
                $scope.settings.koltuk1 = "K";
            }
            else if (elem.value == "K") {
                elem.value = "E";
                $scope.settings.koltuk1 = "E";
            }
            else if (elem.value == "E") {
                $scope.availables = $scope.availables - 1
                $scope.availabler = $scope.availabler - 1
                $scope.availableu = $scope.availableu - 1
                $scope.availablen = $scope.availablen - 1
                $scope.available = $scope.available - 1
                elem.value = " ";
                $scope.settings.koltuk1 = "B";
            }
            else if (elem.value == " ") {
                var elem2 = document.getElementById("myButton2");
                var elem3 = document.getElementById("myButton3");
                var elem4 = document.getElementById("myButton4");
                var elem5 = document.getElementById("myButton5");
                var elem6 = document.getElementById("myButton6");
                if (elem2.value == "T" || elem3.value == "T" || elem4.value == "T" || elem5.value == "T" || elem6.value == "T") {
                    if (elem2.value == "D" || elem3.value == "D" || elem4.value == "D" || elem5.value == "D" || elem6.value == "D") {
                        $scope.availables = $scope.availables + 1
                        $scope.availabler = $scope.availabler + 1
                        $scope.availableu = $scope.availableu + 1
                        $scope.availablen = $scope.availablen + 1
                        $scope.available = $scope.available + 1
                        elem.value = "K";
                        $scope.settings.koltuk1 = "K";
                    }
                    else {
                        elem.value = "D";
                        $scope.settings.koltuk1 = "D";
                    }
                }
                else {
                    $scope.availables = $scope.availables + 1
                    $scope.availabler = $scope.availabler + 1
                    $scope.availableu = $scope.availableu + 1
                    $scope.availablen = $scope.availablen + 1
                    $scope.available = $scope.available + 1
                    elem.value = "T";
                    $scope.settings.koltuk1 = "T"
                }
            }
        };

        $scope.change2 = function () {
            var elem = document.getElementById("myButton2");
            if (elem.value == "T") {
                var elem2 = document.getElementById("myButton1");
                var elem3 = document.getElementById("myButton3");
                var elem4 = document.getElementById("myButton4");
                var elem5 = document.getElementById("myButton5");
                var elem6 = document.getElementById("myButton6");
                if (elem2.value == "D" || elem3.value == "D" || elem4.value == "D" || elem5.value == "D" || elem6.value == "D") {
                    elem.value = "K";
                    $scope.settings.koltuk2 = "K";
                }
                else {
                    $scope.availables = $scope.availables - 1
                    $scope.availabler = $scope.availabler - 1
                    $scope.availableu = $scope.availableu - 1
                    $scope.availablen = $scope.availablen - 1
                    $scope.available = $scope.available - 1
                    elem.value = "D";
                    $scope.settings.koltuk2 = "D";
                }
            }
            else if (elem.value == "D") {
                $scope.availables = $scope.availables + 1
                $scope.availabler = $scope.availabler + 1
                $scope.availableu = $scope.availableu + 1
                $scope.availablen = $scope.availablen + 1
                $scope.available = $scope.available + 1
                elem.value = "K";
                $scope.settings.koltuk2 = "K";
            }
            else if (elem.value == "K") {
                elem.value = "E";
                $scope.settings.koltuk2 = "E";
            }
            else if (elem.value == "E") {
                $scope.availables = $scope.availables - 1
                $scope.availabler = $scope.availabler - 1
                $scope.availableu = $scope.availableu - 1
                $scope.availablen = $scope.availablen - 1
                $scope.available = $scope.available - 1
                elem.value = " ";
                $scope.settings.koltuk2 = "B";
            }
            else if (elem.value == " ") {
                var elem2 = document.getElementById("myButton1");
                var elem3 = document.getElementById("myButton3");
                var elem4 = document.getElementById("myButton4");
                var elem5 = document.getElementById("myButton5");
                var elem6 = document.getElementById("myButton6");
                if (elem2.value == "T" || elem3.value == "T" || elem4.value == "T" || elem5.value == "T" || elem6.value == "T") {
                    if (elem2.value == "D" || elem3.value == "D" || elem4.value == "D" || elem5.value == "D" || elem6.value == "D") {
                        $scope.availables = $scope.availables + 1
                        $scope.availabler = $scope.availabler + 1
                        $scope.availableu = $scope.availableu + 1
                        $scope.availablen = $scope.availablen + 1
                        $scope.available = $scope.available + 1
                        elem.value = "K";
                        $scope.settings.koltuk2 = "K";
                    }
                    else {
                        elem.value = "D";
                        $scope.settings.koltuk2 = "D";
                    }
                }
                else {
                    $scope.availables = $scope.availables + 1
                    $scope.availabler = $scope.availabler + 1
                    $scope.availableu = $scope.availableu + 1
                    $scope.availablen = $scope.availablen + 1
                    $scope.available = $scope.available + 1
                    elem.value = "T";
                    $scope.settings.koltuk2 = "T"
                }
            }
        };

        $scope.change3 = function () {
            var elem = document.getElementById("myButton3");
            if (elem.value == "T") {
                var elem2 = document.getElementById("myButton2");
                var elem3 = document.getElementById("myButton1");
                var elem4 = document.getElementById("myButton4");
                var elem5 = document.getElementById("myButton5");
                var elem6 = document.getElementById("myButton6");
                if (elem2.value == "D" || elem3.value == "D" || elem4.value == "D" || elem5.value == "D" || elem6.value == "D") {
                    elem.value = "K";
                    $scope.settings.koltuk3 = "K";
                }
                else {
                    $scope.availables = $scope.availables - 1
                    $scope.availabler = $scope.availabler - 1
                    $scope.availableu = $scope.availableu - 1
                    $scope.availablen = $scope.availablen - 1
                    $scope.available = $scope.available - 1
                    elem.value = "D";
                    $scope.settings.koltuk3 = "D";
                }
            }
            else if (elem.value == "D") {
                $scope.availables = $scope.availables + 1
                $scope.availabler = $scope.availabler + 1
                $scope.availableu = $scope.availableu + 1
                $scope.availablen = $scope.availablen + 1
                $scope.available = $scope.available + 1
                elem.value = "K";
                $scope.settings.koltuk3 = "K";
            }
            else if (elem.value == "K") {
                elem.value = "E";
                $scope.settings.koltuk3 = "E";
            }
            else if (elem.value == "E") {
                $scope.availables = $scope.availables - 1
                $scope.availabler = $scope.availabler - 1
                $scope.availableu = $scope.availableu - 1
                $scope.availablen = $scope.availablen - 1
                $scope.available = $scope.available - 1
                elem.value = " ";
                $scope.settings.koltuk3 = "B";
            }
            else if (elem.value == " ") {
                var elem2 = document.getElementById("myButton2");
                var elem3 = document.getElementById("myButton1");
                var elem4 = document.getElementById("myButton4");
                var elem5 = document.getElementById("myButton5");
                var elem6 = document.getElementById("myButton6");
                if (elem2.value == "T" || elem3.value == "T" || elem4.value == "T" || elem5.value == "T" || elem6.value == "T") {
                    if (elem2.value == "D" || elem3.value == "D" || elem4.value == "D" || elem5.value == "D" || elem6.value == "D") {
                        $scope.availables = $scope.availables + 1
                        $scope.availabler = $scope.availabler + 1
                        $scope.availableu = $scope.availableu + 1
                        $scope.availablen = $scope.availablen + 1
                        $scope.available = $scope.available + 1
                        elem.value = "K";
                        $scope.settings.koltuk3 = "K";
                    }
                    else {
                        elem.value = "D";
                        $scope.settings.koltuk3 = "D";
                    }
                }
                else {
                    $scope.availables = $scope.availables + 1
                    $scope.availabler = $scope.availabler + 1
                    $scope.availableu = $scope.availableu + 1
                    $scope.availablen = $scope.availablen + 1
                    $scope.available = $scope.available + 1
                    elem.value = "T";
                    $scope.settings.koltuk3 = "T"
                }
            }
        };

        $scope.change4 = function () {
            var elem = document.getElementById("myButton4");
            if (elem.value == "T") {
                var elem2 = document.getElementById("myButton2");
                var elem3 = document.getElementById("myButton3");
                var elem4 = document.getElementById("myButton1");
                var elem5 = document.getElementById("myButton5");
                var elem6 = document.getElementById("myButton6");
                if (elem2.value == "D" || elem3.value == "D" || elem4.value == "D" || elem5.value == "D" || elem6.value == "D") {
                    elem.value = "K";
                    $scope.settings.koltuk4 = "K";
                }
                else {
                    $scope.availables = $scope.availables - 1
                    $scope.availabler = $scope.availabler - 1
                    $scope.availableu = $scope.availableu - 1
                    $scope.availablen = $scope.availablen - 1
                    $scope.available = $scope.available - 1
                    elem.value = "D";
                    $scope.settings.koltuk4 = "D";
                }
            }
            else if (elem.value == "D") {
                $scope.availables = $scope.availables + 1
                $scope.availabler = $scope.availabler + 1
                $scope.availableu = $scope.availableu + 1
                $scope.availablen = $scope.availablen + 1
                $scope.available = $scope.available + 1
                elem.value = "K";
                $scope.settings.koltuk4 = "K";
            }
            else if (elem.value == "K") {
                elem.value = "E";
                $scope.settings.koltuk4 = "E";
            }
            else if (elem.value == "E") {
                $scope.availables = $scope.availables - 1
                $scope.availabler = $scope.availabler - 1
                $scope.availableu = $scope.availableu - 1
                $scope.availablen = $scope.availablen - 1
                $scope.available = $scope.available - 1
                elem.value = " ";
                $scope.settings.koltuk4 = "B";
            }
            else if (elem.value == " ") {
                var elem2 = document.getElementById("myButton2");
                var elem3 = document.getElementById("myButton3");
                var elem4 = document.getElementById("myButton1");
                var elem5 = document.getElementById("myButton5");
                var elem6 = document.getElementById("myButton6");
                if (elem2.value == "T" || elem3.value == "T" || elem4.value == "T" || elem5.value == "T" || elem6.value == "T") {
                    if (elem2.value == "D" || elem3.value == "D" || elem4.value == "D" || elem5.value == "D" || elem6.value == "D") {
                        $scope.availables = $scope.availables + 1
                        $scope.availabler = $scope.availabler + 1
                        $scope.availableu = $scope.availableu + 1
                        $scope.availablen = $scope.availablen + 1
                        $scope.available = $scope.available + 1
                        elem.value = "K";
                        $scope.settings.koltuk4 = "K";
                    }
                    else {
                        elem.value = "D";
                        $scope.settings.koltuk4 = "D";
                    }
                }
                else {
                    $scope.availables = $scope.availables + 1
                    $scope.availabler = $scope.availabler + 1
                    $scope.availableu = $scope.availableu + 1
                    $scope.availablen = $scope.availablen + 1
                    $scope.available = $scope.available + 1
                    elem.value = "T";
                    $scope.settings.koltuk4 = "T"
                }
            }
        };

        $scope.change5 = function () {
            var elem = document.getElementById("myButton5");
            if (elem.value == "T") {
                var elem2 = document.getElementById("myButton2");
                var elem3 = document.getElementById("myButton3");
                var elem4 = document.getElementById("myButton4");
                var elem5 = document.getElementById("myButton1");
                var elem6 = document.getElementById("myButton6");
                if (elem2.value == "D" || elem3.value == "D" || elem4.value == "D" || elem5.value == "D" || elem6.value == "D") {
                    elem.value = "K";
                    $scope.settings.koltuk5 = "K";
                }
                else {
                    $scope.availables = $scope.availables - 1
                    $scope.availabler = $scope.availabler - 1
                    $scope.availableu = $scope.availableu - 1
                    $scope.availablen = $scope.availablen - 1
                    $scope.available = $scope.available - 1
                    elem.value = "D";
                    $scope.settings.koltuk5 = "D";
                }
            }
            else if (elem.value == "D") {
                $scope.availables = $scope.availables + 1
                $scope.availabler = $scope.availabler + 1
                $scope.availableu = $scope.availableu + 1
                $scope.availablen = $scope.availablen + 1
                $scope.available = $scope.available + 1
                elem.value = "K";
                $scope.settings.koltuk5 = "K";
            }
            else if (elem.value == "K") {
                elem.value = "E";
                $scope.settings.koltuk5 = "E";
            }
            else if (elem.value == "E") {
                $scope.availables = $scope.availables - 1
                $scope.availabler = $scope.availabler - 1
                $scope.availableu = $scope.availableu - 1
                $scope.availablen = $scope.availablen - 1
                $scope.available = $scope.available - 1
                elem.value = " ";
                $scope.settings.koltuk5 = "B";
            }
            else if (elem.value == " ") {
                var elem2 = document.getElementById("myButton2");
                var elem3 = document.getElementById("myButton3");
                var elem4 = document.getElementById("myButton4");
                var elem5 = document.getElementById("myButton1");
                var elem6 = document.getElementById("myButton6");
                if (elem2.value == "T" || elem3.value == "T" || elem4.value == "T" || elem5.value == "T" || elem6.value == "T") {
                    if (elem2.value == "D" || elem3.value == "D" || elem4.value == "D" || elem5.value == "D" || elem6.value == "D") {
                        $scope.availables = $scope.availables + 1
                        $scope.availabler = $scope.availabler + 1
                        $scope.availableu = $scope.availableu + 1
                        $scope.availablen = $scope.availablen + 1
                        $scope.available = $scope.available + 1
                        elem.value = "K";
                        $scope.settings.koltuk5 = "K";
                    }
                    else {
                        elem.value = "D";
                        $scope.settings.koltuk5 = "D";
                    }
                }
                else {
                    $scope.availables = $scope.availables + 1
                    $scope.availabler = $scope.availabler + 1
                    $scope.availableu = $scope.availableu + 1
                    $scope.availablen = $scope.availablen + 1
                    $scope.available = $scope.available + 1
                    elem.value = "T";
                    $scope.settings.koltuk5 = "T"
                }
            }
        };

        $scope.change6 = function () {
            var elem = document.getElementById("myButton6");
            if (elem.value == "T") {
                var elem2 = document.getElementById("myButton2");
                var elem3 = document.getElementById("myButton3");
                var elem4 = document.getElementById("myButton4");
                var elem5 = document.getElementById("myButton5");
                var elem6 = document.getElementById("myButton1");
                if (elem2.value == "D" || elem3.value == "D" || elem4.value == "D" || elem5.value == "D" || elem6.value == "D") {
                    elem.value = "K";
                    $scope.settings.koltuk6 = "K";
                }
                else {
                    $scope.availables = $scope.availables - 1
                    $scope.availabler = $scope.availabler - 1
                    $scope.availableu = $scope.availableu - 1
                    $scope.availablen = $scope.availablen - 1
                    $scope.available = $scope.available - 1
                elem.value = "D";
                    $scope.settings.koltuk6 = "D";
                }
            }
            else if (elem.value == "D") {
                $scope.availables = $scope.availables + 1
                $scope.availabler = $scope.availabler + 1
                $scope.availableu = $scope.availableu + 1
                $scope.availablen = $scope.availablen + 1
                $scope.available = $scope.available + 1
                elem.value = "K";
                $scope.settings.koltuk6 = "K";
            }
            else if (elem.value == "K") {
                elem.value = "E";
                $scope.settings.koltuk6 = "E";
            }
            else if (elem.value == "E") {
                $scope.availables = $scope.availables - 1
                $scope.availabler = $scope.availabler - 1
                $scope.availableu = $scope.availableu - 1
                $scope.availablen = $scope.availablen - 1
                $scope.available = $scope.available - 1
                elem.value = " ";
                $scope.settings.koltuk6 = "B";
            }
            else if (elem.value == " ") {
                var elem2 = document.getElementById("myButton2");
                var elem3 = document.getElementById("myButton3");
                var elem4 = document.getElementById("myButton4");
                var elem5 = document.getElementById("myButton5");
                var elem6 = document.getElementById("myButton1");
                if (elem2.value == "T" || elem3.value == "T" || elem4.value == "T" || elem5.value == "T" || elem6.value == "T") {
                    if (elem2.value == "D" || elem3.value == "D" || elem4.value == "D" || elem5.value == "D" || elem6.value == "D") {
                        $scope.availables = $scope.availables + 1
                        $scope.availabler = $scope.availabler + 1
                        $scope.availableu = $scope.availableu + 1
                        $scope.availablen = $scope.availablen + 1
                        $scope.available = $scope.available + 1
                        elem.value = "K";
                        $scope.settings.koltuk6 = "K";
                    }
                    else {
                        elem.value = "D";
                        $scope.settings.koltuk6 = "D";
                    }
                }
                else {
                    $scope.availables = $scope.availables + 1
                    $scope.availabler = $scope.availabler + 1
                    $scope.availableu = $scope.availableu + 1
                    $scope.availablen = $scope.availablen + 1
                    $scope.available = $scope.available + 1
                    elem.value = "T";
                    $scope.settings.koltuk6 = "T"
                }
            }
        };
        //Koltuk değiştirme fonksiyonları son


        //AVATAR DAVRANIŞ YÜZDELERİ İÇİN YAZILMIŞ FONKSİYONLAR BAŞLANGIÇ
        //AÇIKLAMA: percent fonksiyonları davranışların yüzdesini(condition) değiştiriyor
        //AÇIKLAMA: available değişkenleri disabled için kullanılıyor
        //AÇIKLAMA: SONA GELEN TAKILARIN AÇILIMLARI BİR ALT SATIRDA
        //sup (s): destekleyici, rej (r): reddedici, unint (u):ilgisiz, neu (n): nötr
        //Destekleyici Avatar Yüzdesi için fonksiyonlar BAŞLANGIÇ
        $scope.percentsup0 = function () {
            if ($scope.settings.conditions == 1) {
                $scope.settings.conditions = 0
                $scope.availabler = $scope.availabler + 1
                $scope.availableu = $scope.availableu + 1
                $scope.availablen = $scope.availablen + 1
            }
            else if ($scope.settings.conditions == 2) {
                $scope.settings.conditions = 0
                $scope.availabler = $scope.availabler + 2
                $scope.availableu = $scope.availableu + 2
                $scope.availablen = $scope.availablen + 2
            }
            else if ($scope.settings.conditions == 3) {
                $scope.settings.conditions = 0
                $scope.availabler = $scope.availabler + 3
                $scope.availableu = $scope.availableu + 3
                $scope.availablen = $scope.availablen + 3
            }
            else if ($scope.settings.conditions == 4) {
                $scope.settings.conditions = 0
                $scope.availabler = $scope.availabler + 4
                $scope.availableu = $scope.availableu + 4
                $scope.availablen = $scope.availablen + 4
            }
            else if ($scope.settings.conditions == 5) {
                $scope.settings.conditions = 0
                $scope.availabler = $scope.availabler + 5
                $scope.availableu = $scope.availableu + 5
                $scope.availablen = $scope.availablen + 5
            }
        };

        $scope.percentsup1 = function () {
            if ($scope.settings.conditions == 0 && $scope.availables > 0) {
                $scope.settings.conditions = 1
                $scope.availabler = $scope.availabler - 1
                $scope.availableu = $scope.availableu - 1
                $scope.availablen = $scope.availablen - 1
            }
            else if ($scope.settings.conditions == 2) {
                $scope.settings.conditions = 1
                $scope.availabler = $scope.availabler + 1
                $scope.availableu = $scope.availableu + 1
                $scope.availablen = $scope.availablen + 1
            }
            else if ($scope.settings.conditions == 3) {
                $scope.settings.conditions = 1
                $scope.availabler = $scope.availabler + 2
                $scope.availableu = $scope.availableu + 2
                $scope.availablen = $scope.availablen + 2
            }
            else if ($scope.settings.conditions == 4) {
                $scope.settings.conditions = 1
                $scope.availabler = $scope.availabler + 3
                $scope.availableu = $scope.availableu + 3
                $scope.availablen = $scope.availablen + 3
            }
            else if ($scope.settings.conditions == 5) {
                $scope.settings.conditions = 1
                $scope.availabler = $scope.availabler + 4
                $scope.availableu = $scope.availableu + 4
                $scope.availablen = $scope.availablen + 4
            }
        };

        $scope.percentsup2 = function () {
            if ($scope.settings.conditions == 0 && $scope.availables > 1) {
                $scope.settings.conditions = 2
                $scope.availabler = $scope.availabler - 2
                $scope.availableu = $scope.availableu - 2
                $scope.availablen = $scope.availablen - 2
            }
            else if ($scope.settings.conditions == 1 && $scope.availables > 1) {
                $scope.settings.conditions = 2
                $scope.availabler = $scope.availabler - 1
                $scope.availableu = $scope.availableu - 1
                $scope.availablen = $scope.availablen - 1
            }
            else if ($scope.settings.conditions == 3) {
                $scope.settings.conditions = 2
                $scope.availabler = $scope.availabler + 1
                $scope.availableu = $scope.availableu + 1
                $scope.availablen = $scope.availablen + 1
            }
            else if ($scope.settings.conditions == 4) {
                $scope.settings.conditions = 2
                $scope.availabler = $scope.availabler + 2
                $scope.availableu = $scope.availableu + 2
                $scope.availablen = $scope.availablen + 2
            }
            else if ($scope.settings.conditions == 5) {
                $scope.settings.conditions = 2
                $scope.availabler = $scope.availabler + 3
                $scope.availableu = $scope.availableu + 3
                $scope.availablen = $scope.availablen + 3
            }
        };

        $scope.percentsup3 = function () {
            if ($scope.settings.conditions == 0 && $scope.availables > 2) {
                $scope.settings.conditions = 3
                $scope.availabler = $scope.availabler - 3
                $scope.availableu = $scope.availableu - 3
                $scope.availablen = $scope.availablen - 3
            }
            else if ($scope.settings.conditions == 1 && $scope.availables > 2) {
                $scope.settings.conditions = 3
                $scope.availabler = $scope.availabler - 2
                $scope.availableu = $scope.availableu - 2
                $scope.availablen = $scope.availablen - 2
            }
            else if ($scope.settings.conditions == 2 && $scope.availables > 2) {
                $scope.settings.conditions = 3
                $scope.availabler = $scope.availabler - 1
                $scope.availableu = $scope.availableu - 1
                $scope.availablen = $scope.availablen - 1
            }
            else if ($scope.settings.conditions == 4) {
                $scope.settings.conditions = 3
                $scope.availabler = $scope.availabler + 1
                $scope.availableu = $scope.availableu + 1
                $scope.availablen = $scope.availablen + 1
            }
            else if ($scope.settings.conditions == 5) {
                $scope.settings.conditions = 3
                $scope.availabler = $scope.availabler + 2
                $scope.availableu = $scope.availableu + 2
                $scope.availablen = $scope.availablen + 2
            }
        };

        $scope.percentsup4 = function () {
            if ($scope.settings.conditions == 0 && $scope.availables > 3) {
                $scope.settings.conditions = 4
                $scope.availabler = $scope.availabler - 4
                $scope.availableu = $scope.availableu - 4
                $scope.availablen = $scope.availablen - 4
            }
            else if ($scope.settings.conditions == 1 && $scope.availables > 3) {
                $scope.settings.conditions = 4
                $scope.availabler = $scope.availabler - 3
                $scope.availableu = $scope.availableu - 3
                $scope.availablen = $scope.availablen - 3
            }
            else if ($scope.settings.conditions == 2 && $scope.availables > 3) {
                $scope.settings.conditions = 4
                $scope.availabler = $scope.availabler - 2
                $scope.availableu = $scope.availableu - 2
                $scope.availablen = $scope.availablen - 2
            }
            else if ($scope.settings.conditions == 3 && $scope.availables > 3) {
                $scope.settings.conditions = 4
                $scope.availabler = $scope.availabler - 1
                $scope.availableu = $scope.availableu - 1
                $scope.availablen = $scope.availablen - 1
            }
            else if ($scope.settings.conditions == 5) {
                $scope.settings.conditions = 4
                $scope.availabler = $scope.availabler + 1
                $scope.availableu = $scope.availableu + 1
                $scope.availablen = $scope.availablen + 1
            }
        };

        $scope.percentsup5 = function () {
            if ($scope.settings.conditions == 0 && $scope.availables > 4) {
                $scope.settings.conditions = 5
                $scope.availabler = $scope.availabler - 5
                $scope.availableu = $scope.availableu - 5
                $scope.availablen = $scope.availablen - 5
            }
            else if ($scope.settings.conditions == 1 && $scope.availables > 4) {
                $scope.settings.conditions = 5
                $scope.availabler = $scope.availabler - 4
                $scope.availableu = $scope.availableu - 4
                $scope.availablen = $scope.availablen - 4
            }
            else if ($scope.settings.conditions == 2 && $scope.availables > 4) {
                $scope.settings.conditions = 5
                $scope.availabler = $scope.availabler - 3
                $scope.availableu = $scope.availableu - 3
                $scope.availablen = $scope.availablen - 3
            }
            else if ($scope.settings.conditions == 3 && $scope.availables > 4) {
                $scope.settings.conditions = 5
                $scope.availabler = $scope.availabler - 2
                $scope.availableu = $scope.availableu - 2
                $scope.availablen = $scope.availablen - 2
            }
            else if ($scope.settings.conditions == 4 && $scope.availables > 4) {
                $scope.settings.conditions = 5
                $scope.availabler = $scope.availabler - 1
                $scope.availableu = $scope.availableu - 1
                $scope.availablen = $scope.availablen - 1
            }
        };
        //Destekleyici Avatar Yüzdesi için fonksiyonlar SON


        //Reddedici Avatar Yüzdesi için fonksiyonlar BAŞLANGIÇ
        $scope.percentrej0 = function () {
            if ($scope.settings.conditionr == 1) {
                $scope.settings.conditionr = 0
                $scope.availables = $scope.availables + 1
                $scope.availableu = $scope.availableu + 1
                $scope.availablen = $scope.availablen + 1
            }
            else if ($scope.settings.conditionr == 2) {
                $scope.settings.conditionr = 0
                $scope.availables = $scope.availables + 2
                $scope.availableu = $scope.availableu + 2
                $scope.availablen = $scope.availablen + 2
            }
            else if ($scope.settings.conditionr == 3) {
                $scope.settings.conditionr = 0
                $scope.availables = $scope.availables + 3
                $scope.availableu = $scope.availableu + 3
                $scope.availablen = $scope.availablen + 3
            }
            else if ($scope.settings.conditionr == 4) {
                $scope.settings.conditionr = 0
                $scope.availables = $scope.availables + 4
                $scope.availableu = $scope.availableu + 4
                $scope.availablen = $scope.availablen + 4
            }
            else if ($scope.settings.conditionr == 5) {
                $scope.settings.conditionr = 0
                $scope.availables = $scope.availables + 5
                $scope.availableu = $scope.availableu + 5
                $scope.availablen = $scope.availablen + 5
            }
            else if ($scope.settings.conditionr == 6) {
                $scope.settings.conditionr = 0
                $scope.availables = $scope.availables + 6
                $scope.availableu = $scope.availableu + 6
                $scope.availablen = $scope.availablen + 6
            }
        };

        $scope.percentrej1 = function () {
            if ($scope.settings.conditionr == 0 && $scope.availabler > 0) {
                $scope.settings.conditionr = 1
                $scope.availables = $scope.availables - 1
                $scope.availableu = $scope.availableu - 1
                $scope.availablen = $scope.availablen - 1
            }
            else if ($scope.settings.conditionr == 2) {
                $scope.settings.conditionr = 1
                $scope.availables = $scope.availables + 1
                $scope.availableu = $scope.availableu + 1
                $scope.availablen = $scope.availablen + 1
            }
            else if ($scope.settings.conditionr == 3) {
                $scope.settings.conditionr = 1
                $scope.availables = $scope.availables + 2
                $scope.availableu = $scope.availableu + 2
                $scope.availablen = $scope.availablen + 2
            }
            else if ($scope.settings.conditionr == 4) {
                $scope.settings.conditionr = 1
                $scope.availables = $scope.availables + 3
                $scope.availableu = $scope.availableu + 3
                $scope.availablen = $scope.availablen + 3
            }
            else if ($scope.settings.conditionr == 5) {
                $scope.settings.conditionr = 1
                $scope.availables = $scope.availables + 4
                $scope.availableu = $scope.availableu + 4
                $scope.availablen = $scope.availablen + 4
            }
        };

        $scope.percentrej2 = function () {
            if ($scope.settings.conditionr == 0 && $scope.availabler > 1) {
                $scope.settings.conditionr = 2
                $scope.availables = $scope.availables - 2
                $scope.availableu = $scope.availableu - 2
                $scope.availablen = $scope.availablen - 2
            }
            else if ($scope.settings.conditionr == 1 && $scope.availabler > 1) {
                $scope.settings.conditionr = 2
                $scope.availables = $scope.availables - 1
                $scope.availableu = $scope.availableu - 1
                $scope.availablen = $scope.availablen - 1
            }
            else if ($scope.settings.conditionr == 3) {
                $scope.settings.conditionr = 2
                $scope.availables = $scope.availables + 1
                $scope.availableu = $scope.availableu + 1
                $scope.availablen = $scope.availablen + 1
            }
            else if ($scope.settings.conditionr == 4) {
                $scope.settings.conditionr = 2
                $scope.availables = $scope.availables + 2
                $scope.availableu = $scope.availableu + 2
                $scope.availablen = $scope.availablen + 2
            }
            else if ($scope.settings.conditionr == 5) {
                $scope.settings.conditionr = 2
                $scope.availables = $scope.availables + 3
                $scope.availableu = $scope.availableu + 3
                $scope.availablen = $scope.availablen + 3
            }
        };

        $scope.percentrej3 = function () {
            if ($scope.settings.conditionr == 0 && $scope.availabler > 2) {
                $scope.settings.conditionr = 3
                $scope.availables = $scope.availables - 3
                $scope.availableu = $scope.availableu - 3
                $scope.availablen = $scope.availablen - 3
            }
            else if ($scope.settings.conditionr == 1 && $scope.availabler > 2) {
                $scope.settings.conditionr = 3
                $scope.availables = $scope.availables - 2
                $scope.availableu = $scope.availableu - 2
                $scope.availablen = $scope.availablen - 2
            }
            else if ($scope.settings.conditionr == 2 && $scope.availabler > 2) {
                $scope.settings.conditionr = 3
                $scope.availables = $scope.availables - 1
                $scope.availableu = $scope.availableu - 1
                $scope.availablen = $scope.availablen - 1
            }
            else if ($scope.settings.conditionr == 4) {
                $scope.settings.conditionr = 3
                $scope.availables = $scope.availables + 1
                $scope.availableu = $scope.availableu + 1
                $scope.availablen = $scope.availablen + 1
            }
            else if ($scope.settings.conditionr == 5) {
                $scope.settings.conditionr = 3
                $scope.availables = $scope.availables + 2
                $scope.availableu = $scope.availableu + 2
                $scope.availablen = $scope.availablen + 2
            }
        };

        $scope.percentrej4 = function () {
            if ($scope.settings.conditionr == 0 && $scope.availabler > 3) {
                $scope.settings.conditionr = 4
                $scope.availables = $scope.availables - 4
                $scope.availableu = $scope.availableu - 4
                $scope.availablen = $scope.availablen - 4
            }
            else if ($scope.settings.conditionr == 1 && $scope.availabler > 3) {
                $scope.settings.conditionr = 4
                $scope.availables = $scope.availables - 3
                $scope.availableu = $scope.availableu - 3
                $scope.availablen = $scope.availablen - 3
            }
            else if ($scope.settings.conditionr == 2 && $scope.availabler > 3) {
                $scope.settings.conditionr = 4
                $scope.availables = $scope.availables - 2
                $scope.availableu = $scope.availableu - 2
                $scope.availablen = $scope.availablen - 2
            }
            else if ($scope.settings.conditionr == 3 && $scope.availabler > 3) {
                $scope.settings.conditionr = 4
                $scope.availables = $scope.availables - 1
                $scope.availableu = $scope.availableu - 1
                $scope.availablen = $scope.availablen - 1
            }
            else if ($scope.settings.conditionr == 5) {
                $scope.settings.conditionr = 4
                $scope.availables = $scope.availables + 1
                $scope.availableu = $scope.availableu + 1
                $scope.availablen = $scope.availablen + 1
            }
        };

        $scope.percentrej5 = function () {
            if ($scope.settings.conditionr == 0 && $scope.availabler > 4) {
                $scope.settings.conditionr = 5
                $scope.availables = $scope.availables - 5
                $scope.availableu = $scope.availableu - 5
                $scope.availablen = $scope.availablen - 5
            }
            else if ($scope.settings.conditionr == 1 && $scope.availabler > 4) {
                $scope.settings.conditionr = 5
                $scope.availables = $scope.availables - 4
                $scope.availableu = $scope.availableu - 4
                $scope.availablen = $scope.availablen - 4
            }
            else if ($scope.settings.conditionr == 2 && $scope.availabler > 4) {
                $scope.settings.conditionr = 5
                $scope.availables = $scope.availables - 3
                $scope.availableu = $scope.availableu - 3
                $scope.availablen = $scope.availablen - 3
            }
            else if ($scope.settings.conditionr == 3 && $scope.availabler > 4) {
                $scope.settings.conditionr = 5
                $scope.availables = $scope.availables - 2
                $scope.availableu = $scope.availableu - 2
                $scope.availablen = $scope.availablen - 2
            }
            else if ($scope.settings.conditionr == 4 && $scope.availabler > 4) {
                $scope.settings.conditionr = 5
                $scope.availables = $scope.availables - 1
                $scope.availableu = $scope.availableu - 1
                $scope.availablen = $scope.availablen - 1
            }
        };
        //Reddedici Avatar Yüzdesi için fonksiyonlar SON


        //İlgisiz Avatar Yüzdesi için fonksiyonlar BAŞLANGIÇ
        $scope.percentunint0 = function () {
            if ($scope.settings.conditionu == 1) {
                $scope.settings.conditionu = 0
                $scope.availabler = $scope.availabler + 1
                $scope.availables = $scope.availables + 1
                $scope.availablen = $scope.availablen + 1
            }
            else if ($scope.settings.conditionu == 2) {
                $scope.settings.conditionu = 0
                $scope.availabler = $scope.availabler + 2
                $scope.availables = $scope.availables + 2
                $scope.availablen = $scope.availablen + 2
            }
            else if ($scope.settings.conditionu == 3) {
                $scope.settings.conditionu = 0
                $scope.availabler = $scope.availabler + 3
                $scope.availables = $scope.availables + 3
                $scope.availablen = $scope.availablen + 3
            }
            else if ($scope.settings.conditionu == 4) {
                $scope.settings.conditionu = 0
                $scope.availabler = $scope.availabler + 4
                $scope.availables = $scope.availables + 4
                $scope.availablen = $scope.availablen + 4
            }
            else if ($scope.settings.conditionu == 5) {
                $scope.settings.conditionu = 0
                $scope.availabler = $scope.availabler + 5
                $scope.availables = $scope.availables + 5
                $scope.availablen = $scope.availablen + 5
            }
        };

        $scope.percentunint1 = function () {
            if ($scope.settings.conditionu == 0 && $scope.availableu > 0) {
                $scope.settings.conditionu = 1
                $scope.availabler = $scope.availabler - 1
                $scope.availables = $scope.availables - 1
                $scope.availablen = $scope.availablen - 1
            }
            else if ($scope.settings.conditionu == 2) {
                $scope.settings.conditionu = 1
                $scope.availabler = $scope.availabler + 1
                $scope.availables = $scope.availables + 1
                $scope.availablen = $scope.availablen + 1
            }
            else if ($scope.settings.conditionu == 3) {
                $scope.settings.conditionu = 1
                $scope.availabler = $scope.availabler + 2
                $scope.availables = $scope.availables + 2
                $scope.availablen = $scope.availablen + 2
            }
            else if ($scope.settings.conditionu == 4) {
                $scope.settings.conditionu = 1
                $scope.availabler = $scope.availabler + 3
                $scope.availables = $scope.availables + 3
                $scope.availablen = $scope.availablen + 3
            }
            else if ($scope.settings.conditionu == 5) {
                $scope.settings.conditionu = 1
                $scope.availabler = $scope.availabler + 4
                $scope.availables = $scope.availables + 4
                $scope.availablen = $scope.availablen + 4
            }
        };

        $scope.percentunint2 = function () {
            if ($scope.settings.conditionu == 0 && $scope.availableu > 1) {
                $scope.settings.conditionu = 2
                $scope.availabler = $scope.availabler - 2
                $scope.availables = $scope.availables - 2
                $scope.availablen = $scope.availablen - 2
            }
            else if ($scope.settings.conditionu == 1 && $scope.availableu > 1) {
                $scope.settings.conditionu = 2
                $scope.availabler = $scope.availabler - 1
                $scope.availables = $scope.availables - 1
                $scope.availablen = $scope.availablen - 1
            }
            else if ($scope.settings.conditionu == 3) {
                $scope.settings.conditionu = 2
                $scope.availabler = $scope.availabler + 1
                $scope.availables = $scope.availables + 1
                $scope.availablen = $scope.availablen + 1
            }
            else if ($scope.settings.conditionu == 4) {
                $scope.settings.conditionu = 2
                $scope.availabler = $scope.availabler + 2
                $scope.availables = $scope.availables + 2
                $scope.availablen = $scope.availablen + 2
            }
            else if ($scope.settings.conditionu == 5) {
                $scope.settings.conditionu = 2
                $scope.availabler = $scope.availabler + 3
                $scope.availables = $scope.availables + 3
                $scope.availablen = $scope.availablen + 3
            }
        };

        $scope.percentunint3 = function () {
            if ($scope.settings.conditionu == 0 && $scope.availableu > 2) {
                $scope.settings.conditionu = 3
                $scope.availabler = $scope.availabler - 3
                $scope.availables = $scope.availables - 3
                $scope.availablen = $scope.availablen - 3
            }
            else if ($scope.settings.conditionu == 1 && $scope.availableu > 2) {
                $scope.settings.conditionu = 3
                $scope.availabler = $scope.availabler - 2
                $scope.availables = $scope.availables - 2
                $scope.availablen = $scope.availablen - 2
            }
            else if ($scope.settings.conditionu == 2 && $scope.availableu > 2) {
                $scope.settings.conditionu = 3
                $scope.availabler = $scope.availabler - 1
                $scope.availables = $scope.availables - 1
                $scope.availablen = $scope.availablen - 1
            }
            else if ($scope.settings.conditionu == 4) {
                $scope.settings.conditionu = 3
                $scope.availabler = $scope.availabler + 1
                $scope.availables = $scope.availables + 1
                $scope.availablen = $scope.availablen + 1
            }
            else if ($scope.settings.conditionu == 5) {
                $scope.settings.conditionu = 3
                $scope.availabler = $scope.availabler + 2
                $scope.availables = $scope.availables + 2
                $scope.availablen = $scope.availablen + 2
            }
        };

        $scope.percentunint4 = function () {
            if ($scope.settings.conditionu == 0 && $scope.availableu > 3) {
                $scope.settings.conditionu = 4
                $scope.availabler = $scope.availabler - 4
                $scope.availables = $scope.availables - 4
                $scope.availablen = $scope.availablen - 4
            }
            else if ($scope.settings.conditionu == 1 && $scope.availableu > 3) {
                $scope.settings.conditionu = 4
                $scope.availabler = $scope.availabler - 3
                $scope.availables = $scope.availables - 3
                $scope.availablen = $scope.availablen - 3
            }
            else if ($scope.settings.conditionu == 2 && $scope.availableu > 3) {
                $scope.settings.conditionu = 4
                $scope.availabler = $scope.availabler - 2
                $scope.availables = $scope.availables - 2
                $scope.availablen = $scope.availablen - 2
            }
            else if ($scope.settings.conditionu == 3 && $scope.availableu > 3) {
                $scope.settings.conditionu = 4
                $scope.availabler = $scope.availabler - 1
                $scope.availables = $scope.availables - 1
                $scope.availablen = $scope.availablen - 1
            }
            else if ($scope.settings.conditionu == 5) {
                $scope.settings.conditionu = 4
                $scope.availabler = $scope.availabler + 1
                $scope.availables = $scope.availables + 1
                $scope.availablen = $scope.availablen + 1
            }
        };

        $scope.percentunint5 = function () {
            if ($scope.settings.conditionu == 0 && $scope.availableu > 4) {
                $scope.settings.conditionu = 5
                $scope.availabler = $scope.availabler - 5
                $scope.availables = $scope.availables - 5
                $scope.availablen = $scope.availablen - 5
            }
            else if ($scope.settings.conditionu == 1 && $scope.availableu > 4) {
                $scope.settings.conditionu = 5
                $scope.availabler = $scope.availabler - 4
                $scope.availables = $scope.availables - 4
                $scope.availablen = $scope.availablen - 4
            }
            else if ($scope.settings.conditionu == 2 && $scope.availableu > 4) {
                $scope.settings.conditionu = 5
                $scope.availabler = $scope.availabler - 3
                $scope.availables = $scope.availables - 3
                $scope.availablen = $scope.availablen - 3
            }
            else if ($scope.settings.conditionu == 3 && $scope.availableu > 4) {
                $scope.settings.conditionu = 5
                $scope.availabler = $scope.availabler - 2
                $scope.availables = $scope.availables - 2
                $scope.availablen = $scope.availablen - 2
            }
            else if ($scope.settings.conditionu == 4 && $scope.availableu > 4) {
                $scope.settings.conditionu = 5
                $scope.availabler = $scope.availabler - 1
                $scope.availables = $scope.availables - 1
                $scope.availablen = $scope.availablen - 1
            }
        };
        //İlgisiz Avatar Yüzdesi için fonksiyonlar SON


        //Nötr Avatar Yüzdesi için fonksiyonlar BAŞLANGIÇ
        $scope.percentneu0 = function () {
            if ($scope.settings.conditionn == 1) {
                $scope.settings.conditionn = 0
                $scope.availabler = $scope.availabler + 1
                $scope.availableu = $scope.availableu + 1
                $scope.availables = $scope.availables + 1
            }
            else if ($scope.settings.conditionn == 2) {
                $scope.settings.conditionn = 0
                $scope.availabler = $scope.availabler + 2
                $scope.availableu = $scope.availableu + 2
                $scope.availables = $scope.availables + 2
            }
            else if ($scope.settings.conditionn == 3) {
                $scope.settings.conditionn = 0
                $scope.availabler = $scope.availabler + 3
                $scope.availableu = $scope.availableu + 3
                $scope.availables = $scope.availables + 3
            }
            else if ($scope.settings.conditionn == 4) {
                $scope.settings.conditionn = 0
                $scope.availabler = $scope.availabler + 4
                $scope.availableu = $scope.availableu + 4
                $scope.availables = $scope.availables + 4
            }
            else if ($scope.settings.conditionn == 5) {
                $scope.settings.conditionn = 0
                $scope.availabler = $scope.availabler + 5
                $scope.availableu = $scope.availableu + 5
                $scope.availables = $scope.availables + 5
            }
        };

        $scope.percentneu1 = function () {
            if ($scope.settings.conditionn == 0 && $scope.availablen > 0) {
                $scope.settings.conditionn = 1
                $scope.availabler = $scope.availabler - 1
                $scope.availableu = $scope.availableu - 1
                $scope.availables = $scope.availables - 1
            }
            else if ($scope.settings.conditionn == 2) {
                $scope.settings.conditionn = 1
                $scope.availabler = $scope.availabler + 1
                $scope.availableu = $scope.availableu + 1
                $scope.availables = $scope.availables + 1
            }
            else if ($scope.settings.conditionn == 3) {
                $scope.settings.conditionn = 1
                $scope.availabler = $scope.availabler + 2
                $scope.availableu = $scope.availableu + 2
                $scope.availables = $scope.availables + 2
            }
            else if ($scope.settings.conditionn == 4) {
                $scope.settings.conditionn = 1
                $scope.availabler = $scope.availabler + 3
                $scope.availableu = $scope.availableu + 3
                $scope.availables = $scope.availables + 3
            }
            else if ($scope.settings.conditionn == 5) {
                $scope.settings.conditionn = 1
                $scope.availabler = $scope.availabler + 4
                $scope.availableu = $scope.availableu + 4
                $scope.availables = $scope.availables + 4
            }
        };

        $scope.percentneu2 = function () {
            if ($scope.settings.conditionn == 0 && $scope.availablen > 1) {
                $scope.settings.conditionn = 2
                $scope.availabler = $scope.availabler - 2
                $scope.availableu = $scope.availableu - 2
                $scope.availables = $scope.availables - 2
            }
            else if ($scope.settings.conditionn == 1 && $scope.availablen > 1) {
                $scope.settings.conditionn = 2
                $scope.availabler = $scope.availabler - 1
                $scope.availableu = $scope.availableu - 1
                $scope.availables = $scope.availables - 1
            }
            else if ($scope.settings.conditionn == 3) {
                $scope.settings.conditionn = 2
                $scope.availabler = $scope.availabler + 1
                $scope.availableu = $scope.availableu + 1
                $scope.availables = $scope.availables + 1
            }
            else if ($scope.settings.conditionn == 4) {
                $scope.settings.conditionn = 2
                $scope.availabler = $scope.availabler + 2
                $scope.availableu = $scope.availableu + 2
                $scope.availables = $scope.availables + 2
            }
            else if ($scope.settings.conditionn == 5) {
                $scope.settings.conditionn = 2
                $scope.availabler = $scope.availabler + 3
                $scope.availableu = $scope.availableu + 3
                $scope.availables = $scope.availables + 3
            }
        };

        $scope.percentneu3 = function () {
            if ($scope.settings.conditionn == 0 && $scope.availablen > 2) {
                $scope.settings.conditionn = 3
                $scope.availabler = $scope.availabler - 3
                $scope.availableu = $scope.availableu - 3
                $scope.availables = $scope.availables - 3
            }
            else if ($scope.settings.conditionn == 1 && $scope.availablen > 2) {
                $scope.settings.conditionn = 3
                $scope.availabler = $scope.availabler - 2
                $scope.availableu = $scope.availableu - 2
                $scope.availables = $scope.availables - 2
            }
            else if ($scope.settings.conditionn == 2 && $scope.availablen > 2) {
                $scope.settings.conditionn = 3
                $scope.availabler = $scope.availabler - 1
                $scope.availableu = $scope.availableu - 1
                $scope.availables = $scope.availables - 1
            }
            else if ($scope.settings.conditionn == 4) {
                $scope.settings.conditionn = 3
                $scope.availabler = $scope.availabler + 1
                $scope.availableu = $scope.availableu + 1
                $scope.availables = $scope.availables + 1
            }
            else if ($scope.settings.conditionn == 5) {
                $scope.settings.conditionn = 3
                $scope.availabler = $scope.availabler + 2
                $scope.availableu = $scope.availableu + 2
                $scope.availables = $scope.availables + 2
            }
        };

        $scope.percentneu4 = function () {
            if ($scope.settings.conditionn == 0 && $scope.availablen > 3) {
                $scope.settings.conditionn = 4
                $scope.availabler = $scope.availabler - 4
                $scope.availableu = $scope.availableu - 4
                $scope.availables = $scope.availables - 4
            }
            else if ($scope.settings.conditionn == 1 && $scope.availablen > 3) {
                $scope.settings.conditionn = 4
                $scope.availabler = $scope.availabler - 3
                $scope.availableu = $scope.availableu - 3
                $scope.availables = $scope.availables - 3
            }
            else if ($scope.settings.conditionn == 2 && $scope.availablen > 3) {
                $scope.settings.conditionn = 4
                $scope.availabler = $scope.availabler - 2
                $scope.availableu = $scope.availableu - 2
                $scope.availables = $scope.availables - 2
            }
            else if ($scope.settings.conditionn == 3 && $scope.availablen > 3) {
                $scope.settings.conditionn = 4
                $scope.availabler = $scope.availabler - 1
                $scope.availableu = $scope.availableu - 1
                $scope.availables = $scope.availables - 1
            }
            else if ($scope.settings.conditionn == 5) {
                $scope.settings.conditionn = 4
                $scope.availabler = $scope.availabler + 1
                $scope.availableu = $scope.availableu + 1
                $scope.availables = $scope.availables + 1
            }
        };

        $scope.percentneu5 = function () {
            if ($scope.settings.conditionn == 0 && $scope.availablen > 4 ){
                $scope.settings.conditionn = 5
                $scope.availabler = $scope.availabler - 5
                $scope.availableu = $scope.availableu - 5
                $scope.availables = $scope.availables - 5
            }
            else if ($scope.settings.conditionn == 1 && $scope.availablen > 4) {
                $scope.settings.conditionn = 5
                $scope.availabler = $scope.availabler - 4
                $scope.availableu = $scope.availableu - 4
                $scope.availables = $scope.availables - 4
            }
            else if ($scope.settings.conditionn == 2 && $scope.availablen > 4) {
                $scope.settings.conditionn = 5
                $scope.availabler = $scope.availabler - 3
                $scope.availableu = $scope.availableu - 3
                $scope.availables = $scope.availables - 3
            }
            else if ($scope.settings.conditionn == 3 && $scope.availablen > 4) {
                $scope.settings.conditionn = 5
                $scope.availabler = $scope.availabler - 2
                $scope.availableu = $scope.availableu - 2
                $scope.availables = $scope.availables - 2
            }
            else if ($scope.settings.conditionn == 4 && $scope.availablen > 4) {
                $scope.settings.conditionn = 5
                $scope.availabler = $scope.availabler - 1
                $scope.availableu = $scope.availableu - 1
                $scope.availables = $scope.availables - 1
            }
        };
        //Nötr Avatar Yüzdesi için fonksiyonlar SON
        //AVATAR DAVRANIŞ YÜZDELERİ İÇİN YAZILMIŞ FONKSİYONLAR SON


        $scope.danisanhide = function () {
            $('#danisanModal').modal('hide')
        }

        $scope.avatarhide = function () {
            $('#avatarModal').modal('hide')
        }

        $scope.tutumhide = function () {
            $('#tutumModal').modal('hide')
        }

        //Seans başlatma fonksiyonu
        $scope.acme = function (settingsForm) {
            if ($scope.form.$valid) {
                if (settingsForm.koltuk1 != 'D' && settingsForm.koltuk2 != 'D' && settingsForm.koltuk3 != 'D' && settingsForm.koltuk4 != 'D' && settingsForm.koltuk5 != 'D' && settingsForm.koltuk6 != 'D') {
                    $('#danisanModal').modal('show');
                }
                else if ((settingsForm.koltuk1 != 'D' && settingsForm.koltuk1 != 'B') || (settingsForm.koltuk2 != 'D' && settingsForm.koltuk2 != 'B') || (settingsForm.koltuk3 != 'D' && settingsForm.koltuk3 != 'B') || (settingsForm.koltuk4 != 'D' && settingsForm.koltuk4 != 'B') || (settingsForm.koltuk5 != 'D' && settingsForm.koltuk5 != 'B') || (settingsForm.koltuk6 != 'D' && settingsForm.koltuk6 != 'B')  ) {
                    if ($scope.availablen + $scope.availableu + $scope.availables + $scope.availabler == $scope.available) {
                        settingsForm.sesid = $scope.$storage.sesid;
                        settingsForm.userId = $scope.$storage.userId;
                        settingsForm.patid = $scope.$storage.patid;
                        var promiseGet = srvSessionsettings.acme(settingsForm);
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
                            $state.go('acmesession', {});
                        });
                    }
                    else {
                        $('#tutumModal').modal('show');
                    }

                }
                else {
                    $('#avatarModal').modal('show');
                }
            }
        };

    }]);