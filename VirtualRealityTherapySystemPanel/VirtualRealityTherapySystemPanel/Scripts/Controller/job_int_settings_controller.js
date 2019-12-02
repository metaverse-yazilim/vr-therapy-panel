angular.module('vrTheraphy').controller('job_int_settings_controller', ['$scope', '$http', '$state', '$stateParams', '$localStorage', '$sessionStorage', '$rootScope', '$uibModal', 'srvSessionsettings',
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
            koltuk2: 'B',
            koltuk3: 'B',
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
                var elem2 = document.getElementById("myButton2");
                var elem3 = document.getElementById("myButton3");
                if (elem2.value == "T" || elem3.value == "T" || elem2.value == "E" || elem3.value == "E" || elem2.value == "K" || elem3.value == "K") {
                    //!BURAYA BU SENARYO İÇİN EN FAZLA BİR TERAPİST VEYA AVATAR OLABİLİR UYARISI!
                }
                else {
                    elem.value = "T";
                    $scope.settings.koltuk1 = "T"
                }
            }
        };

        $scope.change2 = function () {
            var elem = document.getElementById("myButton2");
            if (elem.value == "D") {
                elem.value = " ";
                $scope.settings.koltuk2 = "B";
            }
            else if (elem.value == " ") {
                var elem2 = document.getElementById("myButton1");
                var elem3 = document.getElementById("myButton3");
                if (elem2.value == "D" || elem3.value == "D") {
                    elem.value = " ";
                    $scope.settings.koltuk2 = "B";
                }
                else {
                    elem.value = "D";
                    $scope.settings.koltuk2 = "D";
                }
                
            }
        };

        $scope.change3 = function () {
            var elem = document.getElementById("myButton3");
            if (elem.value == "D") {
                elem.value = " ";
                $scope.settings.koltuk2 = "B";
            }
            else if (elem.value == " ") {
                var elem2 = document.getElementById("myButton1");
                var elem3 = document.getElementById("myButton2");
                if (elem2.value == "D" || elem3.value == "D") {
                    elem.value = " ";
                    $scope.settings.koltuk2 = "B";
                }
                else {
                    elem.value = "D";
                    $scope.settings.koltuk2 = "D";
                }

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

        $scope.danisanhide = function () {
            $('#danisanModal').modal('hide')
        }

        $scope.avatarhide = function () {
            $('#avatarModal').modal('hide')
        }
        
        //Seans başlatma fonksiyonu
        $scope.jobint = function (settingsForm) {
            if ($scope.form.$valid) {
                if (settingsForm.koltuk2 != 'D' && settingsForm.koltuk3 != 'D') {
                    $('#danisanModal').modal('show');
                }
                else if ((settingsForm.koltuk1 != 'D' && settingsForm.koltuk1 != 'B') || (settingsForm.koltuk2 != 'D' && settingsForm.koltuk2 != 'B') || (settingsForm.koltuk3 != 'D' && settingsForm.koltuk3 != 'B')) {
                    settingsForm.patid = $scope.$storage.patid;
                    settingsForm.sesid = $scope.$storage.sesid;
                    settingsForm.userId = $scope.$storage.userId;
                    var promiseGet = srvSessionsettings.jobint(settingsForm);
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
                        $state.go('jobintsession', {});
                    }
                    );
                }
                else {
                    $('#avatarModal').modal('show');
                }
            }
        };

    }]);