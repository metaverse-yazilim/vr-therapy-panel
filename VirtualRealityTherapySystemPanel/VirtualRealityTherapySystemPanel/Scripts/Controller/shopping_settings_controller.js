angular.module('vrTheraphy').controller('shopping_settings_controller', ['$scope', '$http', '$state', '$stateParams', '$localStorage', '$sessionStorage', '$rootScope', '$uibModal', 'srvSessionsettings',
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
        };

        $scope.testa = {};
        $scope.testa = $rootScope.$storage;

        $scope.settings = {
            age: '2',
            koltuk1: 'B',
            koltuk2: 'D',
            control: '0',
            condition: '0',
            patid: '',
            sesid: ''
        };
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
                elem.value = "K";
                $scope.settings.koltuk1 = "K";
            }
            else if (elem.value == "K") {
                elem.value = "E";
                $scope.settings.koltuk1 = "E";
            }
            else if (elem.value == "E") {
                elem.value = " ";
                $scope.settings.koltuk1 = "B";
            }
            else if (elem.value == " ") {
                    elem.value = "T";
                    $scope.settings.koltuk1 = "T"
            }
        };

        //Koltuk değiştirme fonksiyonları son

        $scope.choosesup = function () {
            $scope.settings.condition = 0
        };

        $scope.chooserej = function () {
            $scope.settings.condition = 1
        };

        $scope.chooseunint = function () {
            $scope.settings.condition = 2
        };

        $scope.chooseneu = function () {
            $scope.settings.condition = 3
        };



        $scope.findsmile = function (bool) {
            if (bool == '0') {
                answer = "../Images/smile_clicked.png";
                return answer;
            }
            else {
                answer = "../Images/smile.png";
                return answer;
            }
        }

        $scope.findangry = function (bool) {
            if (bool == '1') {
                answer = "../Images/angry_clicked.png";
                return answer;
            }
            else {
                answer = "../Images/angry.png";
                return answer;
            }
        }

        $scope.findunint = function (bool) {
            if (bool == '2') {
                answer = "../Images/uninterested_clicked.png";
                return answer;
            }
            else {
                answer = "../Images/uninterested.png";
                return answer;
            }
        }

        $scope.findneutral = function (bool) {
            if (bool == '3') {
                answer = "../Images/Neutral_clicked.png";
                return answer;
            }
            else {
                answer = "../Images/Neutral.png";
                return answer;
            }
        }


        $scope.avatarhide = function () {
            $('#avatarModal').modal('hide')
        }
        

        //Seans başlatma fonksiyonu
        $scope.shopping = function (settingsForm) {
            if ($scope.form.$valid) {
                if (settingsForm.koltuk1 != 'B') {
                    settingsForm.patid = $scope.$storage.patid;
                    settingsForm.sesid = $scope.$storage.sesid;
                    settingsForm.userId = $scope.$storage.userId;
                    var promiseGet = srvSessionsettings.shop(settingsForm);
                    promiseGet.then(function (result) {
                        delete $rootScope.$storage.patid
                        delete $rootScope.$storage.sesid
                        delete $rootScope.$storage.userId
                        delete $rootScope.$storage.avatar
                        delete $rootScope.$storage.condition
                        delete $rootScope.$storage.exposure
                        $rootScope.$storage.patid = settingsForm.patid;
                        $rootScope.$storage.sesid = settingsForm.sesid;
                        $rootScope.$storage.userId = settingsForm.userId;
                        $rootScope.$storage.condition = settingsForm.condition;
                        $rootScope.$storage.patname = $scope.testa.newsessionername;
                        $rootScope.$storage.back = 'settingstolive'

                        $scope.$storage = $sessionStorage.$default({
                            avatar: result.data[1],
                            exposure: result.data[0]
                        });
                        $rootScope.$storage.avatar = $scope.$storage.avatar;
                        $rootScope.$storage.exposure = $scope.$storage.exposure;
                        $rootScope.$storage.control = settingsForm.control;
                        $state.go('shoppingsession', {});
                    }
                    );
                }
                else {
                    $('#avatarModal').modal('show');
                }
            }
        };

    }]);