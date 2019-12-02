angular.module('vrTheraphy').controller('sessionliveshopping_controller', ['$scope', '$http', '$state', '$stateParams', '$localStorage', '$sessionStorage', '$rootScope', '$uibModal', '$interval', 'srvSessionlive', '$window',
    function ($scope, $http, $state, $stateParams, $localStorage, $sessionStorage, $rootScope, $uibModal, $interval, srvSessionlive, $window) {
        $scope.init = function () {
            if ($rootScope.$storage.back == 'settingstolive' || $rootScope.$storage.back == 'sessionlive') {
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
            $rootScope.$storage.back = 'sessionlive';
            $rootScope.exp = '1';
            $rootScope.ses = '1';
            $.Pages.init();
            startCount();
            //Yapay Zeka değişkenler başlangıç
            $scope.questcounter = 48
            $scope.animcounter = 20
            $scope.noisecounter = 23
            $scope.baseistaken = 0

            var base = 0;
            var base2 = 0;
            var current = 0;
            var current2 = 0;
            $scope.firstasked = 0;
            $scope.senddone = 0
            //Yapay Zeka değişkenler son
            $scope.isDisabled = 0;
            var intervaldull;
            $scope.initial = {
                patid: $rootScope.$storage.patid,
                sesid: $rootScope.$storage.sesid,
                userId: $rootScope.$storage.userId,
                condition: $rootScope.$storage.condition,
                avatar: $rootScope.$storage.avatar,
                exposure: $rootScope.$storage.exposure,
                patname: $rootScope.$storage.patname,
                control: $rootScope.$storage.control
            }
            $scope.settings = {
                condition: $rootScope.$storage.condition
            };
            $scope.finalform = {
                avatar1: $rootScope.$storage.avatar,
                exposure: $rootScope.$storage.exposure,
                conditions: "0",
                conditionr: "0",
                conditionu: "0",
                conditionn: "0",
                question: "000",
                from: "9",
                initial: "",
                animation: "0",
                finishit: "0"
            }
            $scope.dataconnect();
        };

        var data = [{ x: 0, y: 0 }, { x: 1, y: 0 }];
        var data2 = [{ x: 0, y: 0 }, { x: 1, y: 0 }];
        $scope.width = document.getElementById("page").clientWidth;

        var myinterval;
        $scope.onExit = function () {
            if ($scope.normalexit == '0') {
                if ($scope.isitsaved == '0') {
                    return "Kaydedilmemiş verileriniz silinecektir!";
                }
            }
        };
        $window.onbeforeunload = $scope.onExit;
        $scope.userLogout = function () {
            $localStorage.$reset();
            $sessionStorage.$reset();
            delete $scope.$storage;
            $state.go('login', {});
        };

        //Seans Bitirme fonksiyonu
        $scope.End = function () {
            var promiseGet = srvSessionlive.endit($scope.finalform)
            promiseGet.then(function (result) {
                delete $rootScope.$storage.from;
                delete $scope.$storage.datanew2;
                delete $scope.$storage.datanew1;
                $rootScope.$storage.back = 'livetoafter'
                $rootScope.$storage.from = 0;
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
                $interval.cancel(intervaldull);
                $state.go('aftersession', {});
            });
        };

        $scope.messages = {
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

        //Yorum girme fonksiyonu
        $scope.entercomment = function (cform) {
            cform.time = $scope.time;
            cform.exposure = $rootScope.$storage.exposure;
            var promiseGet = srvSessionlive.newcomment(cform);
            promiseGet.then(function (result) {
                delete $scope.$storage.messages;
                $scope.$storage = $sessionStorage.$default({
                    messages: result.data
                });
                $scope.messages = $scope.$storage.messages;
                delete cform.comment;
            });
        };

        //Zaman Ayarlama başlangıç
        $scope.time = 0;
        var startCount = function () {
            intervaldull= $interval(incrementCount, 1000, $scope.time);
        };
        var incrementCount = function () {
            $scope.time += 1;
            $scope.dataupdate();
            $scope.width = document.getElementById("page").clientWidth;
            var h = Math.floor($scope.time / 3600);
            var m = Math.floor($scope.time % 3600 / 60);
            var s = Math.floor($scope.time % 60);
            m = checkTime(m);
            s = checkTime(s);
            if (h == 0) {
                document.getElementById('timer').innerHTML = m + ":" + s;
            }
            else {
                document.getElementById('timer').innerHTML = h + ":" + m + ":" + s;
            }
            //Yapay Zeka kontrolleri başlangıç
            if ($scope.initial.control == 1) {
                if ($scope.time > 60 && $scope.baseistaken == 0) {
                    if (data2[$scope.time].y != 0 && data2[$scope.time - 1].y != 0 && data2[$scope.time - 2].y != 0 && data2[$scope.time - 3].y != 0 && data2[$scope.time - 4].y != 0 && data2[$scope.time - 5].y != 0 && data2[$scope.time - 6].y != 0 && data2[$scope.time - 7].y != 0 && data2[$scope.time - 8].y != 0 && data2[$scope.time - 9].y != 0) {
                        if (data[$scope.time].y < 160 && data[$scope.time - 1].y < 160 && data[$scope.time - 2].y < 160 && data[$scope.time - 3].y < 160 && data[$scope.time - 4].y < 160 && data[$scope.time - 5].y < 160 && data[$scope.time - 6].y < 160 && data[$scope.time - 7].y < 160 && data[$scope.time - 8].y < 160 && data[$scope.time - 9].y < 160) {
                            base2 = (data2[$scope.time].y + data2[$scope.time - 1].y + data2[$scope.time - 2].y + data2[$scope.time - 3].y + data2[$scope.time - 4].y + data2[$scope.time - 5].y + data2[$scope.time - 6].y + data2[$scope.time - 7].y + data2[$scope.time - 8].y + data2[$scope.time - 9].y) / 10
                            base = (data[$scope.time].y + data[$scope.time - 1].y + data[$scope.time - 2].y + data[$scope.time - 3].y + data[$scope.time - 4].y + data[$scope.time - 5].y + data[$scope.time - 6].y + data[$scope.time - 7].y + data[$scope.time - 8].y + data[$scope.time - 9].y) / 10
                            $scope.baseistaken = 1
                        }
                    }
                }
                else if ($scope.time > 60 && $scope.baseistaken == 1 && $scope.firstasked == 0) {
                    var random = Math.random();
                    if (random < 0.3333) {
                        $scope.question027();
                    }
                    else if (random > 0.6666) {
                        $scope.question028();
                    }
                    else {
                        $scope.question029();
                    }
                    $scope.firstasked = 1
                }
                else if ($scope.time > 60 && $scope.baseistaken == 1 && $scope.firstasked == 1) {
                    if ($scope.questcounter < 1 || $scope.animcounter < 1 || $scope.noisecounter < 1) {
                        current2 = (data2[$scope.time].y + data2[$scope.time - 1].y + data2[$scope.time - 2].y + data2[$scope.time - 3].y + data2[$scope.time - 4].y + data2[$scope.time - 5].y + data2[$scope.time - 6].y + data2[$scope.time - 7].y + data2[$scope.time - 8].y + data2[$scope.time - 9].y) / 10
                        current = (data[$scope.time].y + data[$scope.time - 1].y + data[$scope.time - 2].y + data[$scope.time - 3].y + data[$scope.time - 4].y + data[$scope.time - 5].y + data[$scope.time - 6].y + data[$scope.time - 7].y + data[$scope.time - 8].y + data[$scope.time - 9].y) / 10
                        //if şartları sonra da ihtimaller
                        var changeofdata = 0
                        if (current < (base) * 4 / 5) {
                            changeofdata = 10
                        }
                        else if (current < (base) * 6 / 5) {
                            changeofdata = 30
                        }
                        else {
                            changeofdata = 20
                        }
                        if (current2 < (base2) * 4 / 5) {
                            changeofdata += 1
                        }
                        else if (current2 < (base2) * 6 / 5) {
                            changeofdata += 3
                        }
                        else {
                            changeofdata += 2
                        }
                    }
                    if ($scope.questcounter < 1) {
                        var randomx = Math.floor(Math.random() * 100);
                        switch (changeofdata) {
                            case 11:
                                negativerandom(randomx);
                                break;
                            case 12:
                                negativerandom(randomx);
                                interruptrandom(randomx);
                                break;
                            case 13:
                                negativerandom(randomx);
                                interruptrandom(randomx);
                                positiverandom(randomx);
                                break;
                            case 21:
                                negativerandom(randomx);
                                interruptrandom(randomx);
                                break;
                            case 22:
                                negativerandom(randomx);
                                interruptrandom(randomx);
                                positiverandom(randomx);
                                break;
                            case 23:
                                positiverandom(randomx);
                                interruptrandom(randomx);
                                break;
                            case 31:
                                negativerandom(randomx);
                                interruptrandom(randomx);
                                positiverandom(randomx);
                                break;
                            case 32:
                                positiverandom(randomx);
                                interruptrandom(randomx);
                                break;
                            case 33:
                                positiverandom(randomx);
                                break;
                        }

                        if ($scope.senddone == 1) {
                            $scope.questcounter = 49
                            $scope.animcounter = 20
                            $scope.noisecounter = 23
                            $scope.senddone = 0
                        }
                    }
                    if ($scope.noisecounter < 1) {
                        var randomx = Math.floor(Math.random() * 100);
                        switch (changeofdata) {
                            case 11:
                                randomses(randomx);
                                break;
                            case 12:
                                randomses(randomx);
                                break;
                            case 13:
                                randomses(randomx);
                                break;
                            case 21:
                                randomses(randomx);
                                break;
                            case 22:
                                randomses(randomx);
                                break;
                            case 23:
                                break;
                            case 31:
                                break;
                            case 32:
                                break;
                            case 33:
                                break;
                        }

                        if ($scope.senddone == 1) {
                            $scope.questcounter += 5
                            $scope.animcounter += 10
                            $scope.noisecounter = 23
                            $scope.senddone = 0
                        }
                    }
                    if ($scope.animcounter < 1) {
                        var randomx = Math.floor(Math.random() * 100);
                        switch (changeofdata) {
                            case 11:
                                negativerandoman(randomx);
                                break;
                            case 12:
                                negativerandoman(randomx);
                                break;
                            case 13:
                                negativerandoman(randomx);
                                positiverandoman(randomx);
                                break;
                            case 21:
                                negativerandoman(randomx);
                                break;
                            case 22:
                                negativerandoman(randomx);
                                positiverandoman(randomx);
                                break;
                            case 23:
                                positiverandoman(randomx);
                                break;
                            case 31:
                                negativerandoman(randomx);
                                positiverandoman(randomx);
                                break;
                            case 32:
                                positiverandoman(randomx);
                                break;
                            case 33:
                                positiverandoman(randomx);
                                break;
                        }

                        if ($scope.senddone == 1) {
                            $scope.questcounter += 5
                            $scope.animcounter = 20
                            $scope.noisecounter += 12
                            $scope.senddone = 0
                        }
                    }
                    $scope.questcounter -= 1
                    $scope.animcounter -= 1
                    $scope.noisecounter -= 1
                }
            }
            //Yapay Zeka kontrolleri son
        };
        var checkTime = function (i) {
            if (i < 10) { i = "0" + i; }  // add zero in front of numbers < 10
            return i;
        };
        //Zaman Ayarlama son

        //AVATAR DAVRANIŞI Başlangıç
        //AÇIKLAMA: SONA GELEN TAKILARIN AÇILIMLARI BİR ALT SATIRDA
        //sup: destekleyici, rej: reddedici, unint: ilgisiz, neu: nötr
        $scope.choosesup = function () {
            $scope.settings.condition = 0;
            $scope.finalform.conditions = "1";
            $scope.finalform.conditionr = "0";
            $scope.finalform.conditionu = "0";
            $scope.finalform.conditionn = "0";
            $scope.finalform.initial = "5";
            $scope.finalform.time = $scope.time;
            $scope.sendit();
        };
        $scope.chooserej = function () {
            $scope.settings.condition = 1;
            $scope.finalform.conditions = "0";
            $scope.finalform.conditionr = "1";
            $scope.finalform.conditionu = "0";
            $scope.finalform.conditionn = "0";
            $scope.finalform.initial = "5";
            $scope.finalform.time = $scope.time;
            $scope.sendit();
        };
        $scope.chooseunint = function () {
            $scope.settings.condition = 2;
            $scope.finalform.conditions = "0";
            $scope.finalform.conditionr = "0";
            $scope.finalform.conditionu = "1";
            $scope.finalform.conditionn = "0";
            $scope.finalform.initial = "5";
            $scope.finalform.time = $scope.time;
            $scope.sendit();
        };
        $scope.chooseneu = function () {
            $scope.settings.condition = 3;
            $scope.finalform.conditions = "0";
            $scope.finalform.conditionr = "0";
            $scope.finalform.conditionu = "0";
            $scope.finalform.conditionn = "1";
            $scope.finalform.initial = "5";
            $scope.finalform.time = $scope.time;
            $scope.sendit();
        };
        //AVATAR DAVRANIŞI Başlangıç

        //Davranış seçme fonksiyonları BAŞLANGIÇ
        $scope.clickclap = function () {
            $scope.finalform.animation = "1";
            $scope.finalform.initial = "0";
            if ($scope.firstperson != 1 && $scope.secondperson != 1 && $scope.thirdperson != 1 && $scope.fourthperson != 1 && $scope.fifthperson != 1 && $scope.settings.slider == 0) {

            }
            else {
                if ($scope.isDisabled == 0) {
                    $scope.isDisabled = 1;
                    $scope.disabled_time = 5;
                    $scope.sendit();
                }
            }
        };
        $scope.clicklaugh = function () {
            $scope.finalform.animation = "2";
            $scope.finalform.initial = "0";
            if ($scope.firstperson != 1 && $scope.secondperson != 1 && $scope.thirdperson != 1 && $scope.fourthperson != 1 && $scope.fifthperson != 1 && $scope.settings.slider == 0) {

            }
            else {
                if ($scope.isDisabled == 0) {
                    $scope.isDisabled = 1;
                    $scope.disabled_time = 5;
                    $scope.sendit();
                }
            }
        };
        $scope.clicktired = function () {
            $scope.finalform.animation = "3";
            $scope.finalform.initial = "0";
            if ($scope.firstperson != 1 && $scope.secondperson != 1 && $scope.thirdperson != 1 && $scope.fourthperson != 1 && $scope.fifthperson != 1 && $scope.settings.slider == 0) {

            }
            else {
                if ($scope.isDisabled == 0) {
                    $scope.isDisabled = 1;
                    $scope.disabled_time = 5;
                    $scope.sendit();
                }
            }
        };
        $scope.clickinsult = function () {
            $scope.finalform.animation = "4";
            $scope.finalform.initial = "0";
            if ($scope.firstperson != 1 && $scope.secondperson != 1 && $scope.thirdperson != 1 && $scope.fourthperson != 1 && $scope.fifthperson != 1 && $scope.settings.slider == 0) {

            }
            else {
                if ($scope.isDisabled == 0) {
                    $scope.isDisabled = 1;
                    $scope.disabled_time = 5;
                    $scope.sendit();
                }
            }
        };
        $scope.clickyawn = function () {
            $scope.finalform.animation = "5";
            $scope.finalform.initial = "0";
            if ($scope.firstperson != 1 && $scope.secondperson != 1 && $scope.thirdperson != 1 && $scope.fourthperson != 1 && $scope.fifthperson != 1 && $scope.settings.slider == 0) {

            }
            else {
                if ($scope.isDisabled == 0) {
                    $scope.isDisabled = 1;
                    $scope.disabled_time = 5;
                    $scope.sendit();
                }
            }
        };
        $scope.clicksleeping = function () {
            $scope.finalform.animation = "6";
            $scope.finalform.initial = "0";
            if ($scope.firstperson != 1 && $scope.secondperson != 1 && $scope.thirdperson != 1 && $scope.fourthperson != 1 && $scope.fifthperson != 1 && $scope.settings.slider == 0) {

            }
            else {
                if ($scope.isDisabled == 0) {
                    $scope.isDisabled = 1;
                    $scope.disabled_time = 5;
                    $scope.sendit();
                }
            }
        };
        //Davranış seçme fonksiyonları SON 

        //Ses seçme fonksiyonları BAŞLANGIÇ
        $scope.whisper = function () {
            $scope.finalform.question = "900";
            $scope.finalform.initial = "2";
            if ($scope.isDisabled == 0) {
                $scope.isDisabled = 1;
                $scope.disabled_time = 5;
                $scope.sendit();
            }
        };
        $scope.phonetalk = function () {
            $scope.finalform.question = "902";
            $scope.finalform.initial = "2";
            if ($scope.isDisabled == 0) {
                $scope.isDisabled = 1;
                $scope.disabled_time = 5;
                $scope.sendit();
            }
        };
        $scope.eating = function () {
            $scope.finalform.question = "904";
            $scope.finalform.initial = "2";
            if ($scope.isDisabled == 0) {
                $scope.isDisabled = 1;
                $scope.disabled_time = 5;
                $scope.sendit();
            }
        };
        //$scope.smb_out = function () {
        //    $scope.finalform.question = "906";
        //    $scope.finalform.initial = "2";
        //    if ($scope.isDisabled == 0) {
        //        $scope.isDisabled = 1;
        //        $scope.disabled_time = 20;
        //        $scope.sendit();
        //    }
        //};
        $scope.cough = function () {
            $scope.finalform.question = "901";
            $scope.finalform.initial = "2";
            if ($scope.isDisabled == 0) {
                $scope.isDisabled = 1;
                $scope.disabled_time = 5;
                $scope.sendit();
            }
        };
        $scope.message = function () {
            $scope.finalform.question = "903";
            $scope.finalform.initial = "2";
            if ($scope.isDisabled == 0) {
                $scope.isDisabled = 1;
                $scope.disabled_time = 5;
                $scope.sendit();
            }
        };
        $scope.drink = function () {
            $scope.finalform.question = "905";
            $scope.finalform.initial = "2";
            if ($scope.isDisabled == 0) {
                $scope.isDisabled = 1;
                $scope.disabled_time = 5;
                $scope.sendit();
            }
        };
        //$scope.smb_in = function () {
        //    $scope.finalform.question = "907";
        //    $scope.finalform.initial = "2";
        //    if ($scope.isDisabled == 0) {
        //        $scope.isDisabled = 1;
        //        $scope.disabled_time = 20;
        //        $scope.sendit();
        //    }
        //};
        //Ses seçme fonksiyonları SON

        //Sorular BAŞLANGIÇ
        $scope.question027 = function () {
            $scope.finalform.question = "027";
            $scope.finalform.initial = "2";
            if ($scope.isDisabled == 0) {
                $scope.isDisabled = 1;
                $scope.disabled_time = 10;
                $scope.sendit();
            }
        }
        $scope.question028 = function () {
            $scope.finalform.question = "028";
            $scope.finalform.initial = "2";
            if ($scope.isDisabled == 0) {
                $scope.isDisabled = 1;
                $scope.disabled_time = 10;
                $scope.sendit();
            }
        }
        $scope.question029 = function () {
            $scope.finalform.question = "029";
            $scope.finalform.initial = "2";
            if ($scope.isDisabled == 0) {
                $scope.isDisabled = 1;
                $scope.disabled_time = 10;
                $scope.sendit();
            }
        }
        $scope.question045 = function () {
            $scope.finalform.question = "045";
            $scope.finalform.initial = "2";
            if ($scope.isDisabled == 0) {
                $scope.isDisabled = 1;
                $scope.disabled_time = 5;
                $scope.sendit();
            }
        }
        $scope.question046 = function () {
            $scope.finalform.question = "046";
            $scope.finalform.initial = "2";
            if ($scope.isDisabled == 0) {
                $scope.isDisabled = 1;
                $scope.disabled_time = 5;
                $scope.sendit();
            }
        }
        $scope.question047 = function () {
            $scope.finalform.question = "047";
            $scope.finalform.initial = "2";
            if ($scope.isDisabled == 0) {
                $scope.isDisabled = 1;
                $scope.disabled_time = 5;
                $scope.sendit();
            }
        }
        $scope.question063 = function () {
            $scope.finalform.question = "063";
            $scope.finalform.initial = "2";
            if ($scope.isDisabled == 0) {
                $scope.isDisabled = 1;
                $scope.disabled_time = 5;
                $scope.sendit();
            }
        }
        $scope.question064 = function () {
            $scope.finalform.question = "064";
            $scope.finalform.initial = "2";
            if ($scope.isDisabled == 0) {
                $scope.isDisabled = 1;
                $scope.disabled_time = 5;
                $scope.sendit();
            }
        }
        $scope.question065 = function () {
            $scope.finalform.question = "065";
            $scope.finalform.initial = "2";
            if ($scope.isDisabled == 0) {
                $scope.isDisabled = 1;
                $scope.disabled_time = 5;
                $scope.sendit();
            }
        }
        $scope.question072 = function () {
            $scope.finalform.question = "072";
            $scope.finalform.initial = "2";
            if ($scope.isDisabled == 0) {
                $scope.isDisabled = 1;
                $scope.disabled_time = 10;
                $scope.sendit();
            }
        }
        $scope.question073 = function () {
            $scope.finalform.question = "073";
            $scope.finalform.initial = "2";
            if ($scope.isDisabled == 0) {
                $scope.isDisabled = 1;
                $scope.disabled_time = 10;
                $scope.sendit();
            }
        }
        $scope.question074 = function () {
            $scope.finalform.question = "074";
            $scope.finalform.initial = "2";
            if ($scope.isDisabled == 0) {
                $scope.isDisabled = 1;
                $scope.disabled_time = 10;
                $scope.sendit();
            }
        }
        $scope.question075 = function () {
            $scope.finalform.question = "075";
            $scope.finalform.initial = "2";
            if ($scope.isDisabled == 0) {
                $scope.isDisabled = 1;
                $scope.disabled_time = 10;
                $scope.sendit();
            }
        }
        $scope.question076 = function () {
            $scope.finalform.question = "076";
            $scope.finalform.initial = "2";
            if ($scope.isDisabled == 0) {
                $scope.isDisabled = 1;
                $scope.disabled_time = 10;
                $scope.sendit();
            }
        }
        $scope.question077 = function () {
            $scope.finalform.question = "077";
            $scope.finalform.initial = "2";
            if ($scope.isDisabled == 0) {
                $scope.isDisabled = 1;
                $scope.disabled_time = 10;
                $scope.sendit();
            }
        }
        $scope.question078 = function () {
            $scope.finalform.question = "078";
            $scope.finalform.initial = "2";
            if ($scope.isDisabled == 0) {
                $scope.isDisabled = 1;
                $scope.disabled_time = 10;
                $scope.sendit();
            }
        }
        $scope.question079 = function () {
            $scope.finalform.question = "079";
            $scope.finalform.initial = "2";
            if ($scope.isDisabled == 0) {
                $scope.isDisabled = 1;
                $scope.disabled_time = 5;
                $scope.sendit();
            }
        }
        $scope.question080 = function () {
            $scope.finalform.question = "080";
            $scope.finalform.initial = "2";
            if ($scope.isDisabled == 0) {
                $scope.isDisabled = 1;
                $scope.disabled_time = 5;
                $scope.sendit();
            }
        }
        $scope.question081 = function () {
            $scope.finalform.question = "081";
            $scope.finalform.initial = "2";
            if ($scope.isDisabled == 0) {
                $scope.isDisabled = 1;
                $scope.disabled_time = 5;
                $scope.sendit();
            }
        }
        $scope.question082 = function () {
            $scope.finalform.question = "082";
            $scope.finalform.initial = "2";
            if ($scope.isDisabled == 0) {
                $scope.isDisabled = 1;
                $scope.disabled_time = 5;
                $scope.sendit();
            }
        }
        $scope.question083 = function () {
            $scope.finalform.question = "083";
            $scope.finalform.initial = "2";
            if ($scope.isDisabled == 0) {
                $scope.isDisabled = 1;
                $scope.disabled_time = 5;
                $scope.sendit();
            }
        }
        $scope.question084 = function () {
            $scope.finalform.question = "084";
            $scope.finalform.initial = "2";
            if ($scope.isDisabled == 0) {
                $scope.isDisabled = 1;
                $scope.disabled_time = 5;
                $scope.sendit();
            }
        }
        //Sorular SON


        //Nihai soru ve davranış gönderme fonksiyonu
        $scope.sendit = function () {
            $scope.start();
            $scope.finalform.time = $scope.time;
            var promiseGet = srvSessionlive.sendit($scope.finalform);
            promiseGet.then(function (result) {
                delete $scope.$storage.messages;
                $scope.$storage = $sessionStorage.$default({
                    messages: result.data
                });
                $scope.messages = $scope.$storage.messages;
            });
        };
        //Soruların gönderildiği fonksiyon son

        //iconları disabled etme başlangıç
        $scope.start = function () {
            myinterval = $interval(disabledtime, 1000, $scope.disabled_time);
        };

        var disabledtime = function () {
            $scope.disabled_time = $scope.disabled_time - 1;
            if ($scope.disabled_time == 0) {
                $interval.cancel(myinterval);
                $scope.isDisabled = 0;
            }
        };
        //iconları disabled etme son

        //Avatar resmini seçme fonksiyonu başlangıç
        $scope.findasrc = function (bool) {
            if (bool === "00") {
                answer = "../Images/AvatarHeads/0.png";
                return answer;
            }
            else if (bool === "01") {
                answer = "../Images/AvatarHeads/1.png";
                return answer;
            }
            else if (bool === "02") {
                answer = "../Images/AvatarHeads/2.png";
                return answer;
            }
            else if (bool === "03") {
                answer = "../Images/AvatarHeads/3.png";
                return answer;
            }
            else if (bool === "04") {
                answer = "../Images/AvatarHeads/4.png";
                return answer;
            }
            else if (bool === "05") {
                answer = "../Images/AvatarHeads/5.png";
                return answer;
            }
            else if (bool === "06") {
                answer = "../Images/AvatarHeads/6.png";
                return answer;
            }
            else if (bool === "07") {
                answer = "../Images/AvatarHeads/7.png";
                return answer;
            }
            else if (bool === "08") {
                answer = "../Images/AvatarHeads/8.png";
                return answer;
            }
            else if (bool === "09") {
                answer = "../Images/AvatarHeads/9.png";
                return answer;
            }
            else if (bool === "10") {
                answer = "../Images/AvatarHeads/10.png";
                return answer;
            }
            else if (bool === "11") {
                answer = "../Images/AvatarHeads/11.png";
                return answer;
            }
            else if (bool === "12") {
                answer = "../Images/AvatarHeads/12.png";
                return answer;
            }
            else if (bool === "13") {
                answer = "../Images/AvatarHeads/13.png";
                return answer;
            }
            else if (bool === "14") {
                answer = "../Images/AvatarHeads/14.png";
                return answer;
            }
            else if (bool === "15") {
                answer = "../Images/AvatarHeads/15.png";
                return answer;
            }
            else if (bool === "16") {
                answer = "../Images/AvatarHeads/16.png";
                return answer;
            }
            else if (bool === "17") {
                answer = "../Images/AvatarHeads/17.png";
                return answer;
            }
            else if (bool === "18") {
                answer = "../Images/AvatarHeads/18.png";
                return answer;
            }
            else if (bool === "19") {
                answer = "../Images/AvatarHeads/19.png";
                return answer;
            }
            else if (bool === "20") {
                answer = "../Images/AvatarHeads/20.png";
                return answer;
            }
            else if (bool === "21") {
                answer = "../Images/AvatarHeads/21.png";
                return answer;
            }
            else if (bool === "22") {
                answer = "../Images/AvatarHeads/22.png";
                return answer;
            }
            else if (bool === "23") {
                answer = "../Images/AvatarHeads/23.png";
                return answer;
            }
            else if (bool === "24") {
                answer = "../Images/AvatarHeads/24.png";
                return answer;
            }
            else if (bool === "25") {
                answer = "../Images/AvatarHeads/25.png";
                return answer;
            }
            else if (bool === "26") {
                answer = "../Images/AvatarHeads/26.png";
                return answer;
            }
            else if (bool === "27") {
                answer = "../Images/AvatarHeads/27.png";
                return answer;
            }
            else if (bool === "28") {
                answer = "../Images/AvatarHeads/28.png";
                return answer;
            }
            else if (bool === "29") {
                answer = "../Images/AvatarHeads/29.png";
                return answer;
            }
            else if (bool === "30") {
                answer = "../Images/AvatarHeads/30.png";
                return answer;
            }
            else if (bool === "31") {
                answer = "../Images/AvatarHeads/31.png";
                return answer;
            }
            else if (bool === "32") {
                answer = "../Images/AvatarHeads/32.png";
                return answer;
            }
            else if (bool === "33") {
                answer = "../Images/AvatarHeads/33.png";
                return answer;
            }
            else if (bool === "34") {
                answer = "../Images/AvatarHeads/34.png";
                return answer;
            }
            else if (bool === "35") {
                answer = "../Images/AvatarHeads/35.png";
                return answer;
            }
            else if (bool === "36") {
                answer = "../Images/AvatarHeads/36.png";
                return answer;
            }
            else if (bool === "37") {
                answer = "../Images/AvatarHeads/37.png";
                return answer;
            }

            else {
                answer = "../Images/AvatarHeads/99.png";
                return answer;
            }

        }
        //Avatar resmini seçme fonksiyonu son

        //GRAPH 1 FONKSİYONLAR BAŞLANGIÇ
        var graph = new Rickshaw.Graph({
            element: document.querySelector("#chart"),

            renderer: 'line',
            width: (($scope.width / 1920) * 450),
            height: (($scope.width / 320) * 52 - 133),
            interpolation: 'linear',
            series: [{
                color: 'darkblue',
                name: 'Nabız',
                data: data
            }]
        });

        var hoverDetail = new Rickshaw.Graph.HoverDetail({
            graph: graph,
            xFormatter: function (x) { return x + " saniye"; },
            yFormatter: function (y) { return Math.floor(y) + " bpm"; }
        });

        var x_axis = new Rickshaw.Graph.Axis.Time({ graph: graph });
        var y_axis = new Rickshaw.Graph.Axis.Y({
            graph: graph,
            pixelsPerTick:30,
            tickSize:5,
            orientation: 'left',
            tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
            element: document.getElementById('y_axis')
        });
        graph.render();

        var resize = function () {
            graph.configure({
                width: graph.width.innerWidth * 0.75,
                height: graph.height.innerHeight * 0.75
            });
            graph.render();
        };

        var preview = new Rickshaw.Graph.RangeSlider.Preview({
            graph: graph,
            element: document.getElementById('preview')
        });

        window.addEventListener('resize', resize);
        resize();
        //GRAPH 1 FONKSİYONLAR SON

        //GRAPH 2 FONKSİYONLAR BAŞLANGIÇ
        var graph2 = new Rickshaw.Graph({

            element: document.querySelector("#chart2"),

            renderer: 'line',
            width: (($scope.width / 1920) * 450),
            height: (($scope.width / 320) * 52 - 133),
            interpolation: 'linear',
            series: [{
                color: 'darkblue',
                name: 'Deri iletkenliği',
                data: data2
            }]
        });

        var hoverDetail2 = new Rickshaw.Graph.HoverDetail({
            graph: graph2,
            xFormatter: function (x) { return x + " saniye"; },
            yFormatter: function (y) { return Math.floor(y) + " μS"; }
        });

        var x_axis2 = new Rickshaw.Graph.Axis.Time({
            graph: graph2
        });
        var y_axis2 = new Rickshaw.Graph.Axis.Y({
            graph: graph2,
            pixelsPerTick: 30,
            tickSize: 5,
            orientation: 'left',
            tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
            element: document.getElementById('y_axis2')
        });
        graph2.render();

        var resize2 = function () {
            graph2.configure({
                width: graph2.width.innerWidth * 0.75,
                height: graph2.height.innerHeight * 0.75
            });
            graph2.render();
        };

        var preview2 = new Rickshaw.Graph.RangeSlider.Preview({
            graph: graph2,
            element: document.getElementById('preview2')
        });

        window.addEventListener('resize2', resize2);
        resize2();
        //GRAPH 2 FONKSİYONLAR SON

        //biofeedback datası çeken fonksiyon başlangıç
        $scope.dataupdate = function () {
            var promiseGet = srvSessionlive.dataupt($scope.finalform);
            promiseGet.then(function (result) {
                delete $scope.$storage.datanew2;
                delete $scope.$storage.datanew1;
                $scope.$storage = $sessionStorage.$default({
                    datanew1: result.data[0],
                    datanew2: result.data[1]
                });
                var dummy1 = {
                    x: 0,
                    y: 0,
                    y0: 0
                };
                var dummy2 = {
                    x: 0,
                    y: 0,
                    y0: 0
                };
                dummy2.x = $scope.time;
                dummy2.y = $scope.$storage.datanew2;
                data2.push(dummy2);
                dummy1.x = $scope.time;
                dummy1.y = $scope.$storage.datanew1;
                data.push(dummy1);
                graph2.series[0].data = data2;
                graph2.update();
                graph.series[0].data = data;
                graph.update();
            });
        };
        //biofeedback datası çeken fonksiyon son

        //Shimmera bağlanma fonksiyonu
        $scope.dataconnect = function () {
            var promiseGet = srvSessionlive.dataconn($scope.finalform);
        };


        //Yapay Zeka fonksiyonları
        var negativerandom = function (rnd) {
            switch (rnd) {
                case 63:
                    $scope.question063();
                    $scope.senddone = 1;
                    break;
                case 64:
                    $scope.question064();
                    $scope.senddone = 1;
                    break;
                case 65:
                    $scope.question065();
                    $scope.senddone = 1;
                    break;
                case 82:
                    $scope.question082();
                    $scope.senddone = 1;
                    break;
                case 83:
                    $scope.question083();
                    $scope.senddone = 1;
                    break;
                case 84:
                    $scope.question084();
                    $scope.senddone = 1;
                    break;
            }
        }
        var positiverandom = function (rnd) {
            switch (rnd) {
                case 45:
                    $scope.question045();
                    $scope.senddone = 1;
                    break;
                case 46:
                    $scope.question046();
                    $scope.senddone = 1;
                    break;
                case 47:
                    $scope.question047();
                    $scope.senddone = 1;
                    break;
                case 79:
                    $scope.question079();
                    $scope.senddone = 1;
                    break;
                case 80:
                    $scope.question080();
                    $scope.senddone = 1;
                    break;
                case 81:
                    $scope.question081();
                    $scope.senddone = 1;
                    break;
            }
        }
        var interruptrandom = function (rnd) {
            switch (rnd) {
                case 72:
                    $scope.question072();
                    $scope.senddone = 1;
                    break;
                case 73:
                    $scope.question073();
                    $scope.senddone = 1;
                    break;
                case 74:
                    $scope.question074();
                    $scope.senddone = 1;
                    break;
                case 75:
                    $scope.question075();
                    $scope.senddone = 1;
                    break;
                case 76:
                    $scope.question076();
                    $scope.senddone = 1;
                    break;
                case 77:
                    $scope.question077();
                    $scope.senddone = 1;
                    break;
                case 78:
                    $scope.question078();
                    $scope.senddone = 1;
                    break;
            }
        }

        var randomses = function (rnd) {
            var rnd2 = rnd % 20
            switch (rnd2) {
                case 0:
                    //$scope.whisper();
                    //$scope.senddone = 1;
                    break;
                case 1:
                    $scope.drink();
                    $scope.senddone = 1;
                    break;
                case 2:
                    $scope.phonetalk();
                    $scope.senddone = 1;
                    break;
                case 3:
                    $scope.eating();
                    $scope.senddone = 1;
                    break;
                case 4:
                    $scope.cough();
                    $scope.senddone = 1;
                    break;
                case 5:
                    $scope.message();
                    $scope.senddone = 1;
                    break;
            }
        }

        var negativerandoman = function (rnd) {
            var rnd2 = rnd % 20
            switch (rnd2) {
                case 0:
                    $scope.clickyawn();
                    $scope.senddone = 1;
                    break;
                case 1:
                    $scope.clicksleeping();
                    $scope.senddone = 1;
                    break;
                case 2:
                    $scope.clickinsult();
                    $scope.senddone = 1;
                    break;
                case 3:
                    $scope.clicktired();
                    $scope.senddone = 1;
                    break;
            }
        }
        var positiverandoman = function (rnd) {
            var rnd2 = rnd % 10
            switch (rnd2) {
                case 4:
                    $scope.clickclap();
                    $scope.senddone = 1;
                    break;
                case 5:
                    $scope.clicklaugh();
                    $scope.senddone = 1;
                    break;
            }
        }
    }]);