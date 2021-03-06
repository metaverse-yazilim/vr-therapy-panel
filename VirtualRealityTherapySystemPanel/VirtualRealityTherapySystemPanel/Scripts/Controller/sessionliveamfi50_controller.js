﻿angular.module('vrTheraphy').controller('sessionliveamfi50_controller', ['$scope', '$http', '$state', '$stateParams', '$localStorage', '$sessionStorage', '$rootScope', '$uibModal', '$interval', 'srvSessionlive', '$window',
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
            //Yapay Zeka değişkenler başlangıç
            $scope.questcounter = 48
            $scope.animcounter = 20
            $scope.noisecounter = 23
            $scope.baseistaken = 0

            var base = 0;
            var base2 = 0;
            var current = 0;
            var current2 = 0;
            $scope.firstcounter = 0
            $scope.firstasked = 0;
            $scope.senddone = 0
            //Yapay Zeka değişkenler son
            startCount();
            $scope.isDisabled = 0;
            $scope.firstperson = 0
            $scope.secondperson = 0
            $scope.thirdperson = 0
            $scope.fourthperson = 0
            $scope.fifthperson = 0
            $scope.availables = $rootScope.$storage.conditions + 1
            $scope.availabler = $rootScope.$storage.conditionr + 1
            $scope.availableu = $rootScope.$storage.conditionu + 1
            $scope.availablen = $rootScope.$storage.conditionn + 1
            $scope.available = 0;

            $scope.initial = {
                patid: $rootScope.$storage.patid,
                sesid: $rootScope.$storage.sesid,
                userId: $rootScope.$storage.userId,
                conditions: $rootScope.$storage.conditions,
                conditionr: $rootScope.$storage.conditionr,
                conditionu: $rootScope.$storage.conditionu,
                conditionn: $rootScope.$storage.conditionn,
                avatar1: $rootScope.$storage.avatar1,
                avatar2: $rootScope.$storage.avatar2,
                avatar3: $rootScope.$storage.avatar3,
                avatar4: $rootScope.$storage.avatar4,
                avatar5: $rootScope.$storage.avatar5,
                exposure: $rootScope.$storage.exposure,
                patname: $rootScope.$storage.patname,
                control: $rootScope.$storage.control
            }

            $scope.settings = {
                slider: 0,
                conditions: $rootScope.$storage.conditions,
                conditionr: $rootScope.$storage.conditionr,
                conditionu: $rootScope.$storage.conditionu,
                conditionn: $rootScope.$storage.conditionn,
            };
            $scope.finalform = {
                avatar1: "99",
                avatar2: "99",
                avatar3: "99",
                avatar4: "99",
                avatar5: "99",
                exposure: $rootScope.$storage.exposure,
                conditions: $rootScope.$storage.conditions,
                conditionr: $rootScope.$storage.conditionr,
                conditionu: $rootScope.$storage.conditionu,
                conditionn: $rootScope.$storage.conditionn,
                from: "2",
                initial: "",
                animation: "0"
            };
            var intervaldull;
            $scope.dataconnect();
        };

        var data = [{ x: 0, y: 0 }, { x: 1, y: 0 }];
        var data2 = [{ x: 0, y: 0 }, { x: 1, y: 0 }];
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

        $scope.width = document.getElementById("page").clientWidth;
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

        $scope.messages = {};

        //Yorum girme fonksiyonu
        $scope.entercomment = function (cform) {
            cform.time = $scope.time;
            cform.exposure = $rootScope.$storage.exposure;
            var promiseGet = srvSessionlive.newcomment(cform);
            promiseGet.then(function (result) {
                delete $scope.$storage.messages;
                $scope.$storage = $sessionStorage.$default({
                    messages: result.data,
                });
                $scope.messages = $scope.$storage.messages
                delete cform.comment;
            });
        };

        //Zaman Ayarlama başlangıç
        $scope.time = 0;
        var startCount = function () {
            intervaldull = $interval(incrementCount, 1000, $scope.time)
        };
        var incrementCount = function () {
            $scope.time += 1;
            $scope.dataupdate();
            $scope.width = document.getElementById("page").clientWidth;
            var h = Math.floor($scope.time / 3600);
            var m = Math.floor(($scope.time % 3600) / 60);
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
                    if ($scope.firstcounter == 0) {
                        $scope.question020();
                    }

                    $scope.firstcounter += 1
                    if ($scope.firstcounter == 13) {
                        var random = Math.random();
                        if (random < 0.3333) {
                            $scope.question021();
                        }
                        else if (random > 0.6666) {
                            $scope.question022();
                        }
                        else {
                            $scope.question023();
                        }
                        $scope.firstasked = 1
                    }

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
            if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
            return i;
        }
        //Zaman Ayarlama son

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
                $scope.available = $scope.available + 25
            }
            else if ($scope.settings.conditions == 50) {
                $scope.settings.conditions = 0
                $scope.availabler = $scope.availabler + 50
                $scope.availableu = $scope.availableu + 50
                $scope.availablen = $scope.availablen + 50
                $scope.available = $scope.available + 50
            }
            else if ($scope.settings.conditions == 75) {
                $scope.settings.conditions = 0
                $scope.availabler = $scope.availabler + 75
                $scope.availableu = $scope.availableu + 75
                $scope.availablen = $scope.availablen + 75
                $scope.available = $scope.available + 75
            }
            else if ($scope.settings.conditions == 100) {
                $scope.settings.conditions = 0
                $scope.availabler = $scope.availabler + 100
                $scope.availableu = $scope.availableu + 100
                $scope.availablen = $scope.availablen + 100
                $scope.available = $scope.available + 100
            }
        };

        $scope.percentsup25 = function () {
            if ($scope.settings.conditions == 0 && $scope.availables > 25) {
                $scope.settings.conditions = 25
                $scope.availabler = $scope.availabler - 25
                $scope.availableu = $scope.availableu - 25
                $scope.availablen = $scope.availablen - 25
                $scope.available = $scope.available - 25
                if ($scope.available == 0) {
                    $scope.finalform.initial = 5
                    $scope.finalform.conditions = $scope.settings.conditions;
                    $scope.finalform.conditionr = $scope.settings.conditionr;
                    $scope.finalform.conditionu = $scope.settings.conditionu;
                    $scope.finalform.conditionn = $scope.settings.conditionn;
                    $scope.sendit();
                }
            }
            else if ($scope.settings.conditions == 50) {
                $scope.settings.conditions = 25
                $scope.availabler = $scope.availabler + 25
                $scope.availableu = $scope.availableu + 25
                $scope.availablen = $scope.availablen + 25
                $scope.available = $scope.available + 25
            }
            else if ($scope.settings.conditions == 75) {
                $scope.settings.conditions = 25
                $scope.availabler = $scope.availabler + 50
                $scope.availableu = $scope.availableu + 50
                $scope.availablen = $scope.availablen + 50
                $scope.available = $scope.available + 50
            }
            else if ($scope.settings.conditions == 100) {
                $scope.settings.conditions = 25
                $scope.availabler = $scope.availabler + 75
                $scope.availableu = $scope.availableu + 75
                $scope.availablen = $scope.availablen + 75
                $scope.available = $scope.available + 75
            }
        };

        $scope.percentsup50 = function () {
            if ($scope.settings.conditions == 0 && $scope.availables > 50) {
                $scope.settings.conditions = 50
                $scope.availabler = $scope.availabler - 50
                $scope.availableu = $scope.availableu - 50
                $scope.availablen = $scope.availablen - 50
                $scope.available = $scope.available - 50
                if ($scope.available == 0) {
                    $scope.finalform.initial = 5
                    $scope.finalform.conditions = $scope.settings.conditions;
                    $scope.finalform.conditionr = $scope.settings.conditionr;
                    $scope.finalform.conditionu = $scope.settings.conditionu;
                    $scope.finalform.conditionn = $scope.settings.conditionn;
                    $scope.sendit();
                }
            }
            else if ($scope.settings.conditions == 25 && $scope.availables > 50) {
                $scope.settings.conditions = 50
                $scope.availabler = $scope.availabler - 25
                $scope.availableu = $scope.availableu - 25
                $scope.availablen = $scope.availablen - 25
                $scope.available = $scope.available - 25
                if ($scope.available == 0) {
                    $scope.finalform.initial = 5
                    $scope.finalform.conditions = $scope.settings.conditions;
                    $scope.finalform.conditionr = $scope.settings.conditionr;
                    $scope.finalform.conditionu = $scope.settings.conditionu;
                    $scope.finalform.conditionn = $scope.settings.conditionn;
                    $scope.sendit();
                }
            }
            else if ($scope.settings.conditions == 75) {
                $scope.settings.conditions = 50
                $scope.availabler = $scope.availabler + 25
                $scope.availableu = $scope.availableu + 25
                $scope.availablen = $scope.availablen + 25
                $scope.available = $scope.available + 25
            }
            else if ($scope.settings.conditions == 100) {
                $scope.settings.conditions = 50
                $scope.availabler = $scope.availabler + 50
                $scope.availableu = $scope.availableu + 50
                $scope.availablen = $scope.availablen + 50
                $scope.available = $scope.available + 50
            }
        };

        $scope.percentsup75 = function () {
            if ($scope.settings.conditions == 0 && $scope.availables > 75) {
                $scope.settings.conditions = 75
                $scope.availabler = $scope.availabler - 75
                $scope.availableu = $scope.availableu - 75
                $scope.availablen = $scope.availablen - 75
                $scope.available = $scope.available - 75
                if ($scope.available == 0) {
                    $scope.finalform.initial = 5
                    $scope.finalform.conditions = $scope.settings.conditions;
                    $scope.finalform.conditionr = $scope.settings.conditionr;
                    $scope.finalform.conditionu = $scope.settings.conditionu;
                    $scope.finalform.conditionn = $scope.settings.conditionn;
                    $scope.sendit();
                }
            }
            else if ($scope.settings.conditions == 25 && $scope.availables > 75) {
                $scope.settings.conditions = 75
                $scope.availabler = $scope.availabler - 50
                $scope.availableu = $scope.availableu - 50
                $scope.availablen = $scope.availablen - 50
                $scope.available = $scope.available - 50
                if ($scope.available == 0) {
                    $scope.finalform.initial = 5
                    $scope.finalform.conditions = $scope.settings.conditions;
                    $scope.finalform.conditionr = $scope.settings.conditionr;
                    $scope.finalform.conditionu = $scope.settings.conditionu;
                    $scope.finalform.conditionn = $scope.settings.conditionn;
                    $scope.sendit();
                }
            }
            else if ($scope.settings.conditions == 50 && $scope.availables > 75) {
                $scope.settings.conditions = 75
                $scope.availabler = $scope.availabler - 25
                $scope.availableu = $scope.availableu - 25
                $scope.availablen = $scope.availablen - 25
                $scope.available = $scope.available - 25
                if ($scope.available == 0) {
                    $scope.finalform.initial = 5
                    $scope.finalform.conditions = $scope.settings.conditions;
                    $scope.finalform.conditionr = $scope.settings.conditionr;
                    $scope.finalform.conditionu = $scope.settings.conditionu;
                    $scope.finalform.conditionn = $scope.settings.conditionn;
                    $scope.sendit();
                }
            }
            else if ($scope.settings.conditions == 100) {
                $scope.settings.conditions = 75
                $scope.availabler = $scope.availabler + 25
                $scope.availableu = $scope.availableu + 25
                $scope.availablen = $scope.availablen + 25
                $scope.available = $scope.available + 25
            }
        };

        $scope.percentsup100 = function () {
            if ($scope.settings.conditions == 0 && $scope.availables > 100) {
                $scope.settings.conditions = 100
                $scope.availabler = $scope.availabler - 100
                $scope.availableu = $scope.availableu - 100
                $scope.availablen = $scope.availablen - 100
                $scope.available = $scope.available - 100
                $scope.finalform.initial = 5
                $scope.finalform.conditions = $scope.settings.conditions;
                $scope.finalform.conditionr = $scope.settings.conditionr;
                $scope.finalform.conditionu = $scope.settings.conditionu;
                $scope.finalform.conditionn = $scope.settings.conditionn;
                $scope.sendit();
            }
            else if ($scope.settings.conditions == 25 && $scope.availables > 100) {
                $scope.settings.conditions = 100
                $scope.availabler = $scope.availabler - 75
                $scope.availableu = $scope.availableu - 75
                $scope.availablen = $scope.availablen - 75
                $scope.available = $scope.available - 75
                $scope.finalform.initial = 5
                $scope.finalform.conditions = $scope.settings.conditions;
                $scope.finalform.conditionr = $scope.settings.conditionr;
                $scope.finalform.conditionu = $scope.settings.conditionu;
                $scope.finalform.conditionn = $scope.settings.conditionn;
                $scope.sendit();
            }
            else if ($scope.settings.conditions == 50 && $scope.availables > 100) {
                $scope.settings.conditions = 100
                $scope.availabler = $scope.availabler - 50
                $scope.availableu = $scope.availableu - 50
                $scope.availablen = $scope.availablen - 50
                $scope.available = $scope.available - 50
                $scope.finalform.initial = 5
                $scope.finalform.conditions = $scope.settings.conditions;
                $scope.finalform.conditionr = $scope.settings.conditionr;
                $scope.finalform.conditionu = $scope.settings.conditionu;
                $scope.finalform.conditionn = $scope.settings.conditionn;
                $scope.sendit();
            }
            else if ($scope.settings.conditions == 75 && $scope.availables > 100) {
                $scope.settings.conditions = 100
                $scope.availabler = $scope.availabler - 25
                $scope.availableu = $scope.availableu - 25
                $scope.availablen = $scope.availablen - 25
                $scope.available = $scope.available - 25
                $scope.finalform.initial = 5
                $scope.finalform.conditions = $scope.settings.conditions;
                $scope.finalform.conditionr = $scope.settings.conditionr;
                $scope.finalform.conditionu = $scope.settings.conditionu;
                $scope.finalform.conditionn = $scope.settings.conditionn;
                $scope.sendit();
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
                $scope.available = $scope.available + 25
            }
            else if ($scope.settings.conditionr == 50) {
                $scope.settings.conditionr = 0
                $scope.availables = $scope.availables + 50
                $scope.availableu = $scope.availableu + 50
                $scope.availablen = $scope.availablen + 50
                $scope.available = $scope.available + 50
            }
            else if ($scope.settings.conditionr == 75) {
                $scope.settings.conditionr = 0
                $scope.availables = $scope.availables + 75
                $scope.availableu = $scope.availableu + 75
                $scope.availablen = $scope.availablen + 75
                $scope.available = $scope.available + 75
            }
            else if ($scope.settings.conditions == 100) {
                $scope.settings.conditionr = 0
                $scope.availables = $scope.availables + 100
                $scope.availableu = $scope.availableu + 100
                $scope.availablen = $scope.availablen + 100
                $scope.available = $scope.available + 100
            }
        };

        $scope.percentrej25 = function () {
            if ($scope.settings.conditionr == 0 && $scope.availabler > 25) {
                $scope.settings.conditionr = 25
                $scope.availables = $scope.availables - 25
                $scope.availableu = $scope.availableu - 25
                $scope.availablen = $scope.availablen - 25
                $scope.available = $scope.available - 25
                if ($scope.available == 0) {
                    $scope.finalform.initial = 5
                    $scope.finalform.conditions = $scope.settings.conditions;
                    $scope.finalform.conditionr = $scope.settings.conditionr;
                    $scope.finalform.conditionu = $scope.settings.conditionu;
                    $scope.finalform.conditionn = $scope.settings.conditionn;
                    $scope.sendit();
                }
            }
            else if ($scope.settings.conditionr == 50) {
                $scope.settings.conditionr = 25
                $scope.availables = $scope.availables + 25
                $scope.availableu = $scope.availableu + 25
                $scope.availablen = $scope.availablen + 25
                $scope.available = $scope.available + 25
            }
            else if ($scope.settings.conditionr == 75) {
                $scope.settings.conditionr = 25
                $scope.availables = $scope.availables + 50
                $scope.availableu = $scope.availableu + 50
                $scope.availablen = $scope.availablen + 50
                $scope.available = $scope.available + 50
            }
            else if ($scope.settings.conditionr == 100) {
                $scope.settings.conditionr = 25
                $scope.availables = $scope.availables + 75
                $scope.availableu = $scope.availableu + 75
                $scope.availablen = $scope.availablen + 75
                $scope.available = $scope.available + 75
            }
        };

        $scope.percentrej50 = function () {
            if ($scope.settings.conditionr == 0 && $scope.availabler > 50) {
                $scope.settings.conditionr = 50
                $scope.availables = $scope.availables - 50
                $scope.availableu = $scope.availableu - 50
                $scope.availablen = $scope.availablen - 50
                $scope.available = $scope.available - 50
                if ($scope.available == 0) {
                    $scope.finalform.initial = 5
                    $scope.finalform.conditions = $scope.settings.conditions;
                    $scope.finalform.conditionr = $scope.settings.conditionr;
                    $scope.finalform.conditionu = $scope.settings.conditionu;
                    $scope.finalform.conditionn = $scope.settings.conditionn;
                    $scope.sendit();
                }
            }
            else if ($scope.settings.conditionr == 25 && $scope.availabler > 50) {
                $scope.settings.conditionr = 50
                $scope.availables = $scope.availables - 25
                $scope.availableu = $scope.availableu - 25
                $scope.availablen = $scope.availablen - 25
                $scope.available = $scope.available - 25
                if ($scope.available == 0) {
                    $scope.finalform.initial = 5
                    $scope.finalform.conditions = $scope.settings.conditions;
                    $scope.finalform.conditionr = $scope.settings.conditionr;
                    $scope.finalform.conditionu = $scope.settings.conditionu;
                    $scope.finalform.conditionn = $scope.settings.conditionn;
                    $scope.sendit();
                }
            }
            else if ($scope.settings.conditionr == 75) {
                $scope.settings.conditionr = 50
                $scope.availables = $scope.availables + 25
                $scope.availableu = $scope.availableu + 25
                $scope.availablen = $scope.availablen + 25
                $scope.available = $scope.available + 25
            }
            else if ($scope.settings.conditionr == 100) {
                $scope.settings.conditionr = 50
                $scope.availables = $scope.availables + 50
                $scope.availableu = $scope.availableu + 50
                $scope.availablen = $scope.availablen + 50
                $scope.available = $scope.available + 50
            }
        };

        $scope.percentrej75 = function () {
            if ($scope.settings.conditionr == 0 && $scope.availabler > 75) {
                $scope.settings.conditionr = 75
                $scope.availables = $scope.availables - 75
                $scope.availableu = $scope.availableu - 75
                $scope.availablen = $scope.availablen - 75
                $scope.available = $scope.available - 75
                if ($scope.available == 0) {
                    $scope.finalform.initial = 5
                    $scope.finalform.conditions = $scope.settings.conditions;
                    $scope.finalform.conditionr = $scope.settings.conditionr;
                    $scope.finalform.conditionu = $scope.settings.conditionu;
                    $scope.finalform.conditionn = $scope.settings.conditionn;
                    $scope.sendit();
                }
            }
            else if ($scope.settings.conditionr == 25 && $scope.availabler > 75) {
                $scope.settings.conditionr = 75
                $scope.availables = $scope.availables - 50
                $scope.availableu = $scope.availableu - 50
                $scope.availablen = $scope.availablen - 50
                $scope.available = $scope.available - 50
                if ($scope.available == 0) {
                    $scope.finalform.initial = 5
                    $scope.finalform.conditions = $scope.settings.conditions;
                    $scope.finalform.conditionr = $scope.settings.conditionr;
                    $scope.finalform.conditionu = $scope.settings.conditionu;
                    $scope.finalform.conditionn = $scope.settings.conditionn;
                    $scope.sendit();
                }
            }
            else if ($scope.settings.conditionr == 50 && $scope.availabler > 75) {
                $scope.settings.conditionr = 75
                $scope.availables = $scope.availables - 25
                $scope.availableu = $scope.availableu - 25
                $scope.availablen = $scope.availablen - 25
                $scope.available = $scope.available - 25
                if ($scope.available == 0) {
                    $scope.finalform.initial = 5
                    $scope.finalform.conditions = $scope.settings.conditions;
                    $scope.finalform.conditionr = $scope.settings.conditionr;
                    $scope.finalform.conditionu = $scope.settings.conditionu;
                    $scope.finalform.conditionn = $scope.settings.conditionn;
                    $scope.sendit();
                }
            }
            else if ($scope.settings.conditionr == 100) {
                $scope.settings.conditionr = 75
                $scope.availables = $scope.availables + 25
                $scope.availableu = $scope.availableu + 25
                $scope.availablen = $scope.availablen + 25
                $scope.available = $scope.available + 25
            }
        };

        $scope.percentrej100 = function () {
            if ($scope.settings.conditionr == 0 && $scope.availabler > 100) {
                $scope.settings.conditionr = 100
                $scope.availables = $scope.availables - 100
                $scope.availableu = $scope.availableu - 100
                $scope.availablen = $scope.availablen - 100
                $scope.available = $scope.available - 100
                $scope.finalform.initial = 5
                $scope.finalform.conditions = $scope.settings.conditions;
                $scope.finalform.conditionr = $scope.settings.conditionr;
                $scope.finalform.conditionu = $scope.settings.conditionu;
                $scope.finalform.conditionn = $scope.settings.conditionn;
                $scope.sendit();
            }
            else if ($scope.settings.conditionr == 25 && $scope.availabler > 100) {
                $scope.settings.conditionr = 100
                $scope.availables = $scope.availables - 75
                $scope.availableu = $scope.availableu - 75
                $scope.availablen = $scope.availablen - 75
                $scope.available = $scope.available - 75
                $scope.finalform.initial = 5
                $scope.finalform.conditions = $scope.settings.conditions;
                $scope.finalform.conditionr = $scope.settings.conditionr;
                $scope.finalform.conditionu = $scope.settings.conditionu;
                $scope.finalform.conditionn = $scope.settings.conditionn;
                $scope.sendit();
            }
            else if ($scope.settings.conditionr == 50 && $scope.availabler > 100) {
                $scope.settings.conditionr = 100
                $scope.availables = $scope.availables - 50
                $scope.availableu = $scope.availableu - 50
                $scope.availablen = $scope.availablen - 50
                $scope.available = $scope.available - 50
                $scope.finalform.initial = 5
                $scope.finalform.conditions = $scope.settings.conditions;
                $scope.finalform.conditionr = $scope.settings.conditionr;
                $scope.finalform.conditionu = $scope.settings.conditionu;
                $scope.finalform.conditionn = $scope.settings.conditionn;
                $scope.sendit();
            }
            else if ($scope.settings.conditionr == 75 && $scope.availabler > 100) {
                $scope.settings.conditionr = 100
                $scope.availables = $scope.availables - 25
                $scope.availableu = $scope.availableu - 25
                $scope.availablen = $scope.availablen - 25
                $scope.available = $scope.available - 25
                $scope.finalform.initial = 5
                $scope.finalform.conditions = $scope.settings.conditions;
                $scope.finalform.conditionr = $scope.settings.conditionr;
                $scope.finalform.conditionu = $scope.settings.conditionu;
                $scope.finalform.conditionn = $scope.settings.conditionn;
                $scope.sendit();
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
                $scope.available = $scope.available + 25
            }
            else if ($scope.settings.conditionu == 50) {
                $scope.settings.conditionu = 0
                $scope.availabler = $scope.availabler + 50
                $scope.availables = $scope.availables + 50
                $scope.availablen = $scope.availablen + 50
                $scope.available = $scope.available + 50
            }
            else if ($scope.settings.conditionu == 75) {
                $scope.settings.conditionu = 0
                $scope.availabler = $scope.availabler + 75
                $scope.availables = $scope.availables + 75
                $scope.availablen = $scope.availablen + 75
                $scope.available = $scope.available + 75
            }
            else if ($scope.settings.conditionu == 100) {
                $scope.settings.conditionu = 0
                $scope.availabler = $scope.availabler + 100
                $scope.availables = $scope.availables + 100
                $scope.availablen = $scope.availablen + 100
                $scope.available = $scope.available + 100
            }
        };

        $scope.percentunint25 = function () {
            if ($scope.settings.conditionu == 0 && $scope.availableu > 25) {
                $scope.settings.conditionu = 25
                $scope.availabler = $scope.availabler - 25
                $scope.availables = $scope.availables - 25
                $scope.availablen = $scope.availablen - 25
                $scope.available = $scope.available - 25
                if ($scope.available == 0) {
                    $scope.finalform.initial = 5
                    $scope.finalform.conditions = $scope.settings.conditions;
                    $scope.finalform.conditionr = $scope.settings.conditionr;
                    $scope.finalform.conditionu = $scope.settings.conditionu;
                    $scope.finalform.conditionn = $scope.settings.conditionn;
                    $scope.sendit();
                }
            }
            else if ($scope.settings.conditionu == 50) {
                $scope.settings.conditionu = 25
                $scope.availabler = $scope.availabler + 25
                $scope.availables = $scope.availables + 25
                $scope.availablen = $scope.availablen + 25
                $scope.available = $scope.available + 25
            }
            else if ($scope.settings.conditionu == 75) {
                $scope.settings.conditionu = 25
                $scope.availabler = $scope.availabler + 50
                $scope.availables = $scope.availables + 50
                $scope.availablen = $scope.availablen + 50
                $scope.available = $scope.available + 50
            }
            else if ($scope.settings.conditionu == 100) {
                $scope.settings.conditionu = 25
                $scope.availabler = $scope.availabler + 75
                $scope.availables = $scope.availables + 75
                $scope.availablen = $scope.availablen + 75
                $scope.available = $scope.available + 75
            }
        };

        $scope.percentunint50 = function () {
            if ($scope.settings.conditionu == 0 && $scope.availableu > 50) {
                $scope.settings.conditionu = 50
                $scope.availabler = $scope.availabler - 50
                $scope.availables = $scope.availables - 50
                $scope.availablen = $scope.availablen - 50
                $scope.available = $scope.available - 50
                if ($scope.available == 0) {
                    $scope.finalform.initial = 5
                    $scope.finalform.conditions = $scope.settings.conditions;
                    $scope.finalform.conditionr = $scope.settings.conditionr;
                    $scope.finalform.conditionu = $scope.settings.conditionu;
                    $scope.finalform.conditionn = $scope.settings.conditionn;
                    $scope.sendit();
                }
            }
            else if ($scope.settings.conditionu == 25 && $scope.availableu > 50) {
                $scope.settings.conditionu = 50
                $scope.availabler = $scope.availabler - 25
                $scope.availables = $scope.availables - 25
                $scope.availablen = $scope.availablen - 25
                $scope.available = $scope.available - 25
                if ($scope.available == 0) {
                    $scope.finalform.initial = 5
                    $scope.finalform.conditions = $scope.settings.conditions;
                    $scope.finalform.conditionr = $scope.settings.conditionr;
                    $scope.finalform.conditionu = $scope.settings.conditionu;
                    $scope.finalform.conditionn = $scope.settings.conditionn;
                    $scope.sendit();
                }
            }
            else if ($scope.settings.conditionu == 75) {
                $scope.settings.conditionu = 50
                $scope.availabler = $scope.availabler + 25
                $scope.availables = $scope.availables + 25
                $scope.availablen = $scope.availablen + 25
                $scope.available = $scope.available + 25
            }
            else if ($scope.settings.conditionu == 100) {
                $scope.settings.conditionu = 50
                $scope.availabler = $scope.availabler + 50
                $scope.availables = $scope.availables + 50
                $scope.availablen = $scope.availablen + 50
                $scope.available = $scope.available + 50
            }
        };

        $scope.percentunint75 = function () {
            if ($scope.settings.conditionu == 0 && $scope.availableu > 75) {
                $scope.settings.conditionu = 75
                $scope.availabler = $scope.availabler - 75
                $scope.availables = $scope.availables - 75
                $scope.availablen = $scope.availablen - 75
                $scope.available = $scope.available - 75
                if ($scope.available == 0) {
                    $scope.finalform.initial = 5
                    $scope.finalform.conditions = $scope.settings.conditions;
                    $scope.finalform.conditionr = $scope.settings.conditionr;
                    $scope.finalform.conditionu = $scope.settings.conditionu;
                    $scope.finalform.conditionn = $scope.settings.conditionn;
                    $scope.sendit();
                }
            }
            else if ($scope.settings.conditionu == 25 && $scope.availableu > 75) {
                $scope.settings.conditionu = 75
                $scope.availabler = $scope.availabler - 50
                $scope.availables = $scope.availables - 50
                $scope.availablen = $scope.availablen - 50
                $scope.available = $scope.available - 50
                if ($scope.available == 0) {
                    $scope.finalform.initial = 5
                    $scope.finalform.conditions = $scope.settings.conditions;
                    $scope.finalform.conditionr = $scope.settings.conditionr;
                    $scope.finalform.conditionu = $scope.settings.conditionu;
                    $scope.finalform.conditionn = $scope.settings.conditionn;
                    $scope.sendit();
                }
            }
            else if ($scope.settings.conditionu == 50 && $scope.availableu > 75) {
                $scope.settings.conditionu = 75
                $scope.availabler = $scope.availabler - 25
                $scope.availables = $scope.availables - 25
                $scope.availablen = $scope.availablen - 25
                $scope.available = $scope.available - 25
                if ($scope.available == 0) {
                    $scope.finalform.initial = 5
                    $scope.finalform.conditions = $scope.settings.conditions;
                    $scope.finalform.conditionr = $scope.settings.conditionr;
                    $scope.finalform.conditionu = $scope.settings.conditionu;
                    $scope.finalform.conditionn = $scope.settings.conditionn;
                    $scope.sendit();
                }
            }
            else if ($scope.settings.conditionu == 100) {
                $scope.settings.conditionu = 75
                $scope.availabler = $scope.availabler + 25
                $scope.availables = $scope.availables + 25
                $scope.availablen = $scope.availablen + 25
                $scope.available = $scope.available + 25
            }
        };

        $scope.percentunint100 = function () {
            if ($scope.settings.conditionu == 0 && $scope.availableu > 100) {
                $scope.settings.conditionu = 100
                $scope.availabler = $scope.availabler - 100
                $scope.availables = $scope.availables - 100
                $scope.availablen = $scope.availablen - 100
                $scope.available = $scope.available - 100
                $scope.finalform.initial = 5
                $scope.finalform.conditions = $scope.settings.conditions;
                $scope.finalform.conditionr = $scope.settings.conditionr;
                $scope.finalform.conditionu = $scope.settings.conditionu;
                $scope.finalform.conditionn = $scope.settings.conditionn;
                $scope.sendit();
            }
            else if ($scope.settings.conditionu == 25 && $scope.availableu > 100) {
                $scope.settings.conditionu = 100
                $scope.availabler = $scope.availabler - 75
                $scope.availables = $scope.availables - 75
                $scope.availablen = $scope.availablen - 75
                $scope.available = $scope.available - 75
                $scope.finalform.initial = 5
                $scope.finalform.conditions = $scope.settings.conditions;
                $scope.finalform.conditionr = $scope.settings.conditionr;
                $scope.finalform.conditionu = $scope.settings.conditionu;
                $scope.finalform.conditionn = $scope.settings.conditionn;
                $scope.sendit();
            }
            else if ($scope.settings.conditionu == 50 && $scope.availableu > 100) {
                $scope.settings.conditionu = 100
                $scope.availabler = $scope.availabler - 50
                $scope.availables = $scope.availables - 50
                $scope.availablen = $scope.availablen - 50
                $scope.available = $scope.available - 50
                $scope.finalform.initial = 5
                $scope.finalform.conditions = $scope.settings.conditions;
                $scope.finalform.conditionr = $scope.settings.conditionr;
                $scope.finalform.conditionu = $scope.settings.conditionu;
                $scope.finalform.conditionn = $scope.settings.conditionn;
                $scope.sendit();
            }
            else if ($scope.settings.conditionu == 75 && $scope.availableu > 100) {
                $scope.settings.conditionu = 100
                $scope.availabler = $scope.availabler - 25
                $scope.availables = $scope.availables - 25
                $scope.availablen = $scope.availablen - 25
                $scope.available = $scope.available - 25
                $scope.finalform.initial = 5
                $scope.finalform.conditions = $scope.settings.conditions;
                $scope.finalform.conditionr = $scope.settings.conditionr;
                $scope.finalform.conditionu = $scope.settings.conditionu;
                $scope.finalform.conditionn = $scope.settings.conditionn;
                $scope.sendit();
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
                $scope.available = $scope.available + 25
            }
            else if ($scope.settings.conditionn == 50) {
                $scope.settings.conditionn = 0
                $scope.availabler = $scope.availabler + 50
                $scope.availableu = $scope.availableu + 50
                $scope.availables = $scope.availables + 50
                $scope.available = $scope.available + 50
            }
            else if ($scope.settings.conditionn == 75) {
                $scope.settings.conditionn = 0
                $scope.availabler = $scope.availabler + 75
                $scope.availableu = $scope.availableu + 75
                $scope.availables = $scope.availables + 75
                $scope.available = $scope.available + 75
            }
            else if ($scope.settings.conditionn == 100) {
                $scope.settings.conditionn = 0
                $scope.availabler = $scope.availabler + 100
                $scope.availableu = $scope.availableu + 100
                $scope.availables = $scope.availables + 100
                $scope.available = $scope.available + 100
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
                $scope.available = $scope.available + 25
            }
            else if ($scope.settings.conditionn == 75) {
                $scope.settings.conditionn = 25
                $scope.availabler = $scope.availabler + 50
                $scope.availableu = $scope.availableu + 50
                $scope.availables = $scope.availables + 50
                $scope.available = $scope.available + 50
            }
            else if ($scope.settings.conditionn == 100) {
                $scope.settings.conditionn = 25
                $scope.availabler = $scope.availabler + 75
                $scope.availableu = $scope.availableu + 75
                $scope.availables = $scope.availables + 75
                $scope.available = $scope.available + 75
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
                $scope.available = $scope.available + 25
            }
            else if ($scope.settings.conditionn == 100) {
                $scope.settings.conditionn = 50
                $scope.availabler = $scope.availabler + 50
                $scope.availableu = $scope.availableu + 50
                $scope.availables = $scope.availables + 50
                $scope.available = $scope.available + 50
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
                $scope.available = $scope.available + 25
            }
        };

        $scope.percentneu100 = function () {
            if ($scope.settings.conditionn == 0 && $scope.availablen > 100) {
                $scope.settings.conditionn = 100
                $scope.availabler = $scope.availabler - 100
                $scope.availableu = $scope.availableu - 100
                $scope.availables = $scope.availables - 100
                $scope.available = $scope.available - 100
                $scope.finalform.initial = 5
                $scope.finalform.conditions = $scope.settings.conditions;
                $scope.finalform.conditionr = $scope.settings.conditionr;
                $scope.finalform.conditionu = $scope.settings.conditionu;
                $scope.finalform.conditionn = $scope.settings.conditionn;
                $scope.sendit();
            }
            else if ($scope.settings.conditionn == 25 && $scope.availablen > 100) {
                $scope.settings.conditionn = 100
                $scope.availabler = $scope.availabler - 75
                $scope.availableu = $scope.availableu - 75
                $scope.availables = $scope.availables - 75
                $scope.available = $scope.available - 75
                $scope.finalform.initial = 5
                $scope.finalform.conditions = $scope.settings.conditions;
                $scope.finalform.conditionr = $scope.settings.conditionr;
                $scope.finalform.conditionu = $scope.settings.conditionu;
                $scope.finalform.conditionn = $scope.settings.conditionn;
                $scope.sendit();
            }
            else if ($scope.settings.conditionn == 50 && $scope.availablen > 100) {
                $scope.settings.conditionn = 100
                $scope.availabler = $scope.availabler - 50
                $scope.availableu = $scope.availableu - 50
                $scope.availables = $scope.availables - 50
                $scope.available = $scope.available - 50
                $scope.finalform.initial = 5
                $scope.finalform.conditions = $scope.settings.conditions;
                $scope.finalform.conditionr = $scope.settings.conditionr;
                $scope.finalform.conditionu = $scope.settings.conditionu;
                $scope.finalform.conditionn = $scope.settings.conditionn;
                $scope.sendit();
            }
            else if ($scope.settings.conditionn == 75 && $scope.availablen > 100) {
                $scope.settings.conditionn = 100
                $scope.availabler = $scope.availabler - 25
                $scope.availableu = $scope.availableu - 25
                $scope.availables = $scope.availables - 25
                $scope.available = $scope.available - 25
                $scope.finalform.initial = 5
                $scope.finalform.conditions = $scope.settings.conditions;
                $scope.finalform.conditionr = $scope.settings.conditionr;
                $scope.finalform.conditionu = $scope.settings.conditionu;
                $scope.finalform.conditionn = $scope.settings.conditionn;
                $scope.sendit();
            }
        };
        //Nötr Avatar Yüzdesi için fonksiyonlar SON
        //AVATAR DAVRANIŞ YÜZDELERİ İÇİN YAZILMIŞ FONKSİYONLAR SON

        //Davranış için Avatar seçme fonksiyonları BAŞLANGIÇ
        $scope.clickall = function () {
            if ($scope.firstperson == 1 && $scope.secondperson == 1 && $scope.thirdperson == 1 && $scope.fourthperson == 1 && $scope.fifthperson == 1 && $scope.settings.slider == 100) {
                $scope.firstperson = 0
                $scope.secondperson = 0
                $scope.thirdperson = 0
                $scope.fourthperson = 0
                $scope.fifthperson = 0
                $scope.settings.slider = 0

                $scope.finalform.avatar1 = "99"
                $scope.finalform.avatar2 = "99"
                $scope.finalform.avatar3 = "99"
                $scope.finalform.avatar4 = "99"
                $scope.finalform.avatar5 = "99"
                $scope.finalform.slider = 0
            }
            else {
                $scope.firstperson = 1
                $scope.secondperson = 1
                $scope.thirdperson = 1
                $scope.fourthperson = 1
                $scope.fifthperson = 1
                $scope.settings.slider = 100

                $scope.finalform.avatar1 = $rootScope.$storage.avatar1
                $scope.finalform.avatar2 = $rootScope.$storage.avatar2
                $scope.finalform.avatar3 = $rootScope.$storage.avatar3
                $scope.finalform.avatar4 = $rootScope.$storage.avatar4
                $scope.finalform.avatar5 = $rootScope.$storage.avatar5
                $scope.finalform.slider = 100
            }
        };
        $scope.clickfirst = function () {
            if ($scope.firstperson == 1) {
                $scope.firstperson = 0
                $scope.finalform.avatar1 = "99"
            }
            else {
                $scope.firstperson = 1
                $scope.finalform.avatar1 = $rootScope.$storage.avatar1
            }
        };
        $scope.clicksecond = function () {
            if ($scope.secondperson == 1) {
                $scope.secondperson = 0
                $scope.finalform.avatar2 = "99"
            }
            else {
                $scope.secondperson = 1
                $scope.finalform.avatar2 = $rootScope.$storage.avatar2
            }
        };
        $scope.clickthird = function () {
            if ($scope.thirdperson == 1) {
                $scope.thirdperson = 0
                $scope.finalform.avatar3 = "99"
            }
            else {
                $scope.thirdperson = 1
                $scope.finalform.avatar3 = $rootScope.$storage.avatar3
            }
        };
        $scope.clickfourth = function () {
            if ($scope.fourthperson == 1) {
                $scope.fourthperson = 0
                $scope.finalform.avatar4 = "99"
            }
            else {
                $scope.fourthperson = 1
                $scope.finalform.avatar4 = $rootScope.$storage.avatar4
            }
        };
        $scope.clickfifth = function () {
            if ($scope.fifthperson == 1) {
                $scope.fifthperson = 0
                $scope.finalform.avatar5 = "99"
            }
            else {
                $scope.fifthperson = 1
                $scope.finalform.avatar5 = $rootScope.$storage.avatar5
            }
        };
        //Davranış için Avatar seçme fonksiyonları SON

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
        $scope.question020 = function () {
            $scope.finalform.question = "020";
            $scope.finalform.initial = "2";
            if ($scope.isDisabled == 0) {
                $scope.isDisabled = 1;
                $scope.disabled_time = 10;
                $scope.sendit();
            }
        }
        $scope.question021 = function () {
            $scope.finalform.question = "021";
            $scope.finalform.initial = "2";
            if ($scope.isDisabled == 0) {
                $scope.isDisabled = 1;
                $scope.disabled_time = 10;
                $scope.sendit();
            }
        }
        $scope.question022 = function () {
            $scope.finalform.question = "022";
            $scope.finalform.initial = "2";
            if ($scope.isDisabled == 0) {
                $scope.isDisabled = 1;
                $scope.disabled_time = 10;
                $scope.sendit();
            }
        }
        $scope.question023 = function () {
            $scope.finalform.question = "023";
            $scope.finalform.initial = "2";
            if ($scope.isDisabled == 0) {
                $scope.isDisabled = 1;
                $scope.disabled_time = 10;
                $scope.sendit();
            }
        }
        $scope.question042 = function () {
            $scope.finalform.question = "042";
            $scope.finalform.initial = "2";
            if ($scope.isDisabled == 0) {
                $scope.isDisabled = 1;
                $scope.disabled_time = 5;
                $scope.sendit();
            }
        }
        $scope.question043 = function () {
            $scope.finalform.question = "043";
            $scope.finalform.initial = "2";
            if ($scope.isDisabled == 0) {
                $scope.isDisabled = 1;
                $scope.disabled_time = 5;
                $scope.sendit();
            }
        }
        $scope.question044 = function () {
            $scope.finalform.question = "044";
            $scope.finalform.initial = "2";
            if ($scope.isDisabled == 0) {
                $scope.isDisabled = 1;
                $scope.disabled_time = 5;
                $scope.sendit();
            }
        }
        $scope.question060 = function () {
            $scope.finalform.question = "060";
            $scope.finalform.initial = "2";
            if ($scope.isDisabled == 0) {
                $scope.isDisabled = 1;
                $scope.disabled_time = 5;
                $scope.sendit();
            }
        }
        $scope.question061 = function () {
            $scope.finalform.question = "061";
            $scope.finalform.initial = "2";
            if ($scope.isDisabled == 0) {
                $scope.isDisabled = 1;
                $scope.disabled_time = 5;
                $scope.sendit();
            }
        }
        $scope.question062 = function () {
            $scope.finalform.question = "062";
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

        //Nihai soru ve davranış gönderme fonksiyonu başlangıç
        $scope.sendit = function () {
            $scope.start();
            $scope.finalform.time = $scope.time;
            $scope.finalform.slider = $scope.settings.slider
            var promiseGet = srvSessionlive.sendit($scope.finalform);
            promiseGet.then(function (result) {
                delete $scope.$storage.messages;
                $scope.$storage = $sessionStorage.$default({
                    messages: result.data
                });
                $scope.messages = $scope.$storage.messages;
                if ($scope.finalform.initial == 0) {
                    $scope.firstperson = 0
                    $scope.secondperson = 0
                    $scope.thirdperson = 0
                    $scope.fourthperson = 0
                    $scope.fifthperson = 0
                    $scope.settings.slider = 0
                    $scope.finalform.avatar1 = "99"
                    $scope.finalform.avatar2 = "99"
                    $scope.finalform.avatar3 = "99"
                    $scope.finalform.avatar4 = "99"
                    $scope.finalform.avatar5 = "99"
                    $scope.finalform.slider = 0
                }
            });
        };
        //Nihai soru ve davranış gönderme fonksiyonu başlangıç

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

        //1. Avatar resmini seçme fonksiyonu başlangıç
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
        //1. Avatar resmini seçme fonksiyonu son
        //2. Avatar resmini seçme fonksiyonu başlangıç
        $scope.findbsrc = function (bool) {
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
        //2. Avatar resmini seçme fonksiyonu son
        //3. Avatar resmini seçme fonksiyonu başlangıç
        $scope.findcsrc = function (bool) {
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
        //3. Avatar resmini seçme fonksiyonu son
        //4. Avatar resmini seçme fonksiyonu başlangıç
        $scope.finddsrc = function (bool) {
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
        //4. Avatar resmini seçme fonksiyonu son
        //5. Avatar resmini seçme fonksiyonu başlangıç
        $scope.findesrc = function (bool) {
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
        //5. Avatar resmini seçme fonksiyonu son

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
            pixelsPerTick: 30,
            tickSize: 5,
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
            yFormatter: function (y) { return y + " μS"; }
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
                case 60:
                    $scope.question060();
                    $scope.senddone = 1;
                    break;
                case 61:
                    $scope.question061();
                    $scope.senddone = 1;
                    break;
                case 62:
                    $scope.question062();
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
                case 42:
                    $scope.question042();
                    $scope.senddone = 1;
                    break;
                case 43:
                    $scope.question043();
                    $scope.senddone = 1;
                    break;
                case 44:
                    $scope.question044();
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
                    $scope.whisper();
                    $scope.senddone = 1;
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
            var rnd3 = Math.floor(Math.random() * 30);
            var rnd4 = Math.floor(Math.random() * 4);
            var rnd2 = rnd % 20
            switch (rnd2) {
                case 0:
                    amfifunc(rnd4);
                    personfunc(rnd3);
                    $scope.clickyawn();
                    $scope.senddone = 1;
                    break;
                case 1:
                    amfifunc(rnd4);
                    personfunc(rnd3);
                    $scope.clicksleeping();
                    $scope.senddone = 1;
                    break;
                case 2:
                    amfifunc(rnd4);
                    personfunc(rnd3);
                    $scope.clickinsult();
                    $scope.senddone = 1;
                    break;
                case 3:
                    amfifunc(rnd4);
                    personfunc(rnd3);
                    $scope.clicktired();
                    $scope.senddone = 1;
                    break;
            }
        }
        var positiverandoman = function (rnd) {
            var rnd3 = Math.floor(Math.random() * 30);
            var rnd4 = Math.floor(Math.random() * 4);
            var rnd2 = rnd % 10
            switch (rnd2) {
                case 4:
                    amfifunc(rnd4);
                    personfunc(rnd3);
                    $scope.clickclap();
                    $scope.senddone = 1;
                    break;
                case 5:
                    amfifunc(rnd4);
                    personfunc(rnd3);
                    $scope.clicklaugh();
                    $scope.senddone = 1;
                    break;
            }
        }
        var personfunc = function (rnd) {
            switch (rnd) {
                case 0:
                    $scope.clickfirst();
                    break;
                case 1:
                    $scope.clicksecond();
                    break;
                case 2:
                    $scope.clickthird();
                    break;
                case 3:
                    $scope.clickfourth();
                    break;
                case 4:
                    $scope.clickfifth();
                    break;
                case 5:
                    $scope.clickfirst();
                    $scope.clicksecond();
                    break;
                case 6:
                    $scope.clickfirst();
                    $scope.clickthird();
                    break;
                case 7:
                    $scope.clickfirst();
                    $scope.clickfourth();
                    break;
                case 8:
                    $scope.clickfirst();
                    $scope.clickfifth();
                    break;
                case 9:
                    $scope.clicksecond();
                    $scope.clickthird();
                    break;
                case 10:
                    $scope.clicksecond();
                    $scope.clickfourth();
                    break;
                case 11:
                    $scope.clicksecond();
                    $scope.clickfifth();
                    break;
                case 12:
                    $scope.clickthird();
                    $scope.clickfourth();
                    break;
                case 13:
                    $scope.clickthird();
                    $scope.clickfifth();
                    break;
                case 14:
                    $scope.clickfourth();
                    $scope.clickfifth();
                    break;
                case 15:
                    $scope.clickfirst();
                    $scope.clicksecond();
                    $scope.clickthird();
                    break;
                case 16:
                    $scope.clickfirst();
                    $scope.clicksecond();
                    $scope.clickfourth();
                    break;
                case 17:
                    $scope.clickfirst();
                    $scope.clicksecond();
                    $scope.clickfifth();
                    break;
                case 18:
                    $scope.clickfirst();
                    $scope.clickthird();
                    $scope.clickfourth();
                    break;
                case 19:
                    $scope.clickfirst();
                    $scope.clickthird();
                    $scope.clickfifth();
                    break;
                case 20:
                    $scope.clickfirst();
                    $scope.clickfourth();
                    $scope.clickfifth();
                    break;
                case 21:
                    $scope.clicksecond();
                    $scope.clickthird();
                    $scope.clickfourth();
                    break;
                case 22:
                    $scope.clicksecond();
                    $scope.clickthird();
                    $scope.clickfifth();
                    break;
                case 23:
                    $scope.clicksecond();
                    $scope.clickfourth();
                    $scope.clickfifth();
                    break;
                case 24:
                    $scope.clickthird();
                    $scope.clickfourth();
                    $scope.clickfifth();
                    break;
                case 25:
                    $scope.clickfirst();
                    $scope.clicksecond();
                    $scope.clickthird();
                    $scope.clickfourth();
                    break;
                case 26:
                    $scope.clickfirst();
                    $scope.clicksecond();
                    $scope.clickthird();
                    $scope.clickfifth();
                    break;
                case 27:
                    $scope.clickfirst();
                    $scope.clicksecond();
                    $scope.clickfourth();
                    $scope.clickfifth();
                    break;
                case 28:
                    $scope.clickfirst();
                    $scope.clickthird();
                    $scope.clickfourth();
                    $scope.clickfifth();
                    break;
                case 29:
                    $scope.clicksecond();
                    $scope.clickthird();
                    $scope.clickfourth();
                    $scope.clickfifth();
                    break;
                case 30:
                    $scope.clickfirst();
                    $scope.clicksecond();
                    $scope.clickthird();
                    $scope.clickfourth();
                    $scope.clickfifth();
                    break;
            }
        }

        var amfifunc = function (rnd) {
            switch (rnd) {
                case 0:
                    $scope.settings.slider == 0;
                    break;
                case 1:
                    $scope.settings.slider == 25;
                    break;
                case 2:
                    $scope.settings.slider == 50;
                    break;
                case 3:
                    $scope.settings.slider == 75;
                    break;
                case 4:
                    $scope.settings.slider == 100;
                    break;
            }
        }
    }]);