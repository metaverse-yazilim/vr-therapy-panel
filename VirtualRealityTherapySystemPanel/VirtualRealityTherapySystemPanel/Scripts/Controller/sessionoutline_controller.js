angular.module('vrTheraphy').controller('sessionoutline_controller', ['$scope', '$http', '$state', '$stateParams', '$localStorage', '$sessionStorage', '$rootScope', '$uibModal', 'srvOldsession',
    function ($scope, $http, $state, $stateParams, $localStorage, $sessionStorage, $rootScope, $uibModal, srvOldsession) {
        $scope.init = function () {
            $rootScope.$storage.from == '1'
            $.Pages.init();
            $scope.messages = {
            };
            var data = [{ x: 0, y: 5 }, { x: 15, y: 4 }, { x: 30, y: 6 }, { x: 45, y: 3 }, { x: 60, y: 12 }, { x: 75, y: 5 }, { x: 90, y: 1 }, { x: 105, y: 7 }, { x: 120, y: 5 }, { x: 135, y: 6 }, { x: 150, y: 6 }, { x: 165, y: 6 }, { x: 180, y: 4 }, { x: 195, y: 8 }, { x: 210, y: 8 }, { x: 225, y: 7 }, { x: 240, y: 11 }, { x: 255, y: 3 }, { x: 270, y: 0 }, { x: 285, y: 2 }];
            var data2 = [{ x: 0, y: 17 }, { x: 15, y: 4 }, { x: 30, y: 6 }, { x: 45, y: 3 }, { x: 60, y: 12 }, { x: 75, y: 5 }, { x: 90, y: 1 }, { x: 105, y: 7 }, { x: 120, y: 5 }, { x: 135, y: 6 }, { x: 150, y: 6 }, { x: 165, y: 6 }, { x: 180, y: 4 }, { x: 195, y: 8 }, { x: 210, y: 8 }, { x: 225, y: 7 }, { x: 240, y: 11 }, { x: 255, y: 3 }, { x: 270, y: 0 }, { x: 285, y: 2 }];
            var formx = {
                patid: $rootScope.$storage.patid,
            }
            var promiseGet = srvOldsession.countit(formx);
            promiseGet.then(function (result) {
                delete $scope.$storage.exposures;
                $scope.$storage = $sessionStorage.$default({
                    exposures: result.data,
                });
                $scope.exposures = $scope.$storage.exposures
                $scope.doner = {
                    done: '1',
                    do: false,
                    ses_list: [true, true, true, true, true, true, true, true],
                    list: [[true, true, true, true, true, true, true, true],
                    [true, true, true, true, true, true, true, true],
                    [true, true, true, true, true, true, true, true],
                    [true, true, true, true, true, true, true, true],
                    [true, true, true, true, true, true, true, true],
                    [true, true, true, true, true, true, true, true],
                    [true, true, true, true, true, true, true, true],
                    [true, true, true, true, true, true, true, true]]
                }

                for (a = 0; a < $scope.exposures[0].userId; a++) {
                    $scope.doner.ses_list[a] = false;
                    if ($scope.exposures[a + 1] != null) {
                        for (b = 0; b < $scope.exposures[a + 1].userId; b++) {
                            $scope.doner.list[a][b] = false;
                        }
                    }
                }
                $scope.active.zero = Number($rootScope.$storage.sesid) - 1;
                $scope.active.one = 0;
                $scope.active.two = 0;
                $scope.active.three = 0;
                $scope.active.four = 0;
                $scope.active.five = 0;
                $scope.active.six = 0;
                $scope.active.seven = 0;
                $scope.active.eight = 0;

            });
            var form = {
                ses_number: $rootScope.$storage.sesid,
                expo_number: '1',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            var promiseGet = srvOldsession.getit(form);
            promiseGet.then(function (result) {
                delete $scope.$storage.messages;
                delete $scope.$storage.nerv;
                delete $scope.$storage.conf;
                delete $scope.$storage.pat_com;
                delete $scope.$storage.doc_com;
                delete $scope.$storage.gsr;
                delete $scope.$storage.hr;
                $scope.$storage = $sessionStorage.$default({
                    messages: result.data.comments,
                    nerv: result.data.nerv,
                    conf: result.data.conf,
                    pat_com: result.data.pat_com,
                    doc_com: result.data.doc_com,
                    gsr: result.data.GSR,
                    hr: result.data.HR
                });
                data = $scope.$storage.hr
                data2 = $scope.$storage.gsr
                graph2.series[0].data = data2;
                graph2.update();
                graph.series[0].data = data;
                graph.update();
                $scope.messages = $scope.$storage.messages
                $scope.nerv = $scope.$storage.nerv
                $scope.conf = $scope.$storage.conf
                $scope.pat_com = $scope.$storage.pat_com
                $scope.doc_com = $scope.$storage.doc_com
            });

            $scope.chosen_exposure = {
                session1: '1',
                session2: '1',
                session3: '1',
                session4: '1',
                session5: '1',
                session6: '1',
                session7: '1',
                session8: '1',
            }
            $scope.initial = {
                patname: $rootScope.$storage.patname
            }

        };

        var data = [{ x: 0, y: 5 }, { x: 15, y: 4 }, { x: 30, y: 6 }, { x: 45, y: 3 }, { x: 60, y: 12 }, { x: 75, y: 5 }, { x: 90, y: 1 }, { x: 105, y: 7 }, { x: 120, y: 5 }, { x: 135, y: 6 }, { x: 150, y: 6 }, { x: 165, y: 6 }, { x: 180, y: 4 }, { x: 195, y: 8 }, { x: 210, y: 8 }, { x: 225, y: 7 }, { x: 240, y: 11 }, { x: 255, y: 3 }, { x: 270, y: 0 }, { x: 285, y: 2 }];
        var data2 = [{ x: 0, y: 17 }, { x: 15, y: 4 }, { x: 30, y: 6 }, { x: 45, y: 3 }, { x: 60, y: 12 }, { x: 75, y: 5 }, { x: 90, y: 1 }, { x: 105, y: 7 }, { x: 120, y: 5 }, { x: 135, y: 6 }, { x: 150, y: 6 }, { x: 165, y: 6 }, { x: 180, y: 4 }, { x: 195, y: 8 }, { x: 210, y: 8 }, { x: 225, y: 7 }, { x: 240, y: 11 }, { x: 255, y: 3 }, { x: 270, y: 0 }, { x: 285, y: 2 }];

        $scope.settings = {
            tcomment: '',
            pcomment: '',
            con: '',
            nrv: '',
        };


        $scope.widtho = document.getElementById("container").clientWidth;

        $scope.testa = {};
        $scope.testa = $rootScope.$storage;


        $scope.userLogout = function () {
            $localStorage.$reset();
            $sessionStorage.$reset();
            delete $scope.$storage;
            $state.go('login', {});
        };


        //Detayların gösterimi için gerekli fonksiyon başlangıç
        $scope.getexpo = function (initform) {
            $scope.doner.done = '1'
            var promiseGet = srvOldsession.getit(initform);
            promiseGet.then(function (result) {
                delete $scope.$storage.messages;
                delete $scope.$storage.nerv;
                delete $scope.$storage.conf;
                delete $scope.$storage.pat_com;
                delete $scope.$storage.doc_com;
                delete $scope.$storage.gsr;
                delete $scope.$storage.hr;
                $scope.$storage = $sessionStorage.$default({
                    messages: result.data.comments,
                    nerv: result.data.nerv,
                    conf: result.data.conf,
                    pat_com: result.data.pat_com,
                    doc_com: result.data.doc_com,
                    gsr: result.data.GSR,
                    hr: result.data.HR
                });
                data = $scope.$storage.hr
                data2 = $scope.$storage.gsr
                graph2.series[0].data = data2;
                graph2.update();
                graph.series[0].data = data;
                graph.update();
                $scope.messages = $scope.$storage.messages
                $scope.nerv = $scope.$storage.nerv
                $scope.conf = $scope.$storage.conf
                $scope.pat_com = $scope.$storage.pat_com
                $scope.doc_com = $scope.$storage.doc_com
                if ($scope.nerv == 100) {
                    $scope.doner.done = '0'
                }
            });
        }
        //Detayların gösterimi için gerekli fonksiyon son


        //Seans bitimi loggedin'e dönüş fonksiyonu başlangıç
        $scope.gohome = function () {
            var formz = {
                patid: $rootScope.$storage.patid,
                sesid: $rootScope.$storage.sesid,
            }
            var promiseGet = srvOldsession.finito(formz);
            delete $rootScope.$storage.active;
            delete $rootScope.$storage.conf;
            delete $rootScope.$storage.doc_com;
            delete $rootScope.$storage.exposure;
            delete $rootScope.$storage.exposures;
            delete $rootScope.$storage.from;
            delete $rootScope.$storage.infoname;
            delete $rootScope.$storage.messages;
            delete $rootScope.$storage.nerv;
            delete $rootScope.$storage.pat_com;
            delete $rootScope.$storage.patid;
            delete $rootScope.$storage.patseslist;
            delete $rootScope.$storage.sesid;
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
            $state.go('patloggedin', {});
        };
        //Seans bitimi loggedin'e dönüş fonksiyonu son

        //Detayların gösterimi için seans seçimi başlangıç
        $scope.getexpo10 = function () {
            var form = {
                ses_number: '1',
                expo_number: $scope.chosen_exposure.session1,
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
        }
        $scope.getexpo20 = function () {
            var form = {
                ses_number: '2',
                expo_number: $scope.chosen_exposure.session2,
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
        }
        $scope.getexpo30 = function () {
            var form = {
                ses_number: '3',
                expo_number: $scope.chosen_exposure.session3,
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
        }
        $scope.getexpo40 = function () {
            var form = {
                ses_number: '4',
                expo_number: $scope.chosen_exposure.session4,
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
        }
        $scope.getexpo50 = function () {
            var form = {
                ses_number: '5',
                expo_number: $scope.chosen_exposure.session5,
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
        }
        $scope.getexpo60 = function () {
            var form = {
                ses_number: '6',
                expo_number: $scope.chosen_exposure.session6,
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
        }
        $scope.getexpo70 = function () {
            var form = {
                ses_number: '7',
                expo_number: $scope.chosen_exposure.session7,
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
        }
        $scope.getexpo80 = function () {
            var form = {
                ses_number: '8',
                expo_number: $scope.chosen_exposure.session8,
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
        }
        //Detayların gösterimi için seans seçimi son

        //Detayların gösterimi için 1.seans exposure seçimi başlangıç
        $scope.getexpo11 = function () {
            var form = {
                ses_number: '1',
                expo_number: '1',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session1 = 1;
        }
        $scope.getexpo12 = function () {
            var form = {
                ses_number: '1',
                expo_number: '2',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session1 = 2;
        }
        $scope.getexpo13 = function () {
            var form = {
                ses_number: '1',
                expo_number: '3',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session1 = 3;
        }
        $scope.getexpo14 = function () {
            var form = {
                ses_number: '1',
                expo_number: '4',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session1 = 4;
        }
        $scope.getexpo15 = function () {
            var form = {
                ses_number: '1',
                expo_number: '5',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session1 = 5;
        }
        $scope.getexpo16 = function () {
            var form = {
                ses_number: '1',
                expo_number: '6',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session1 = 6;
        }
        $scope.getexpo17 = function () {
            var form = {
                ses_number: '1',
                expo_number: '7',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session1 = 7;
        }
        $scope.getexpo18 = function () {
            var form = {
                ses_number: '1',
                expo_number: '8',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session1 = 8;
        }
        //Detayların gösterimi için 1.seans exposure seçimi son

        //Detayların gösterimi için 2.seans exposure seçimi başlangıç
        $scope.getexpo21 = function () {
            var form = {
                ses_number: '2',
                expo_number: '1',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session2 = 1;
        }
        $scope.getexpo22 = function () {
            var form = {
                ses_number: '2',
                expo_number: '2',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session2 = 2;
        }
        $scope.getexpo23 = function () {
            var form = {
                ses_number: '2',
                expo_number: '3',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session2 = 3;
        }
        $scope.getexpo24 = function () {
            var form = {
                ses_number: '2',
                expo_number: '4',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session2 = 4;
        }
        $scope.getexpo25 = function () {
            var form = {
                ses_number: '2',
                expo_number: '5',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session2 = 5;
        }
        $scope.getexpo26 = function () {
            var form = {
                ses_number: '2',
                expo_number: '6',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session2 = 6;
        }
        $scope.getexpo27 = function () {
            var form = {
                ses_number: '2',
                expo_number: '7',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session2 = 7;
        }
        $scope.getexpo28 = function () {
            var form = {
                ses_number: '2',
                expo_number: '8',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session2 = 8;
        }
        //Detayların gösterimi için 2.seans exposure seçimi son

        //Detayların gösterimi için 3.seans exposure seçimi başlangıç
        $scope.getexpo31 = function () {
            var form = {
                ses_number: '3',
                expo_number: '1',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session3 = 1;
        }
        $scope.getexpo32 = function () {
            var form = {
                ses_number: '3',
                expo_number: '2',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session3 = 2;
        }
        $scope.getexpo33 = function () {
            var form = {
                ses_number: '3',
                expo_number: '3',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session3 = 3;
        }
        $scope.getexpo34 = function () {
            var form = {
                ses_number: '3',
                expo_number: '4',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session3 = 4;
        }
        $scope.getexpo35 = function () {
            var form = {
                ses_number: '3',
                expo_number: '5',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session3 = 5;
        }
        $scope.getexpo36 = function () {
            var form = {
                ses_number: '3',
                expo_number: '6',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session3 = 6;
        }
        $scope.getexpo37 = function () {
            var form = {
                ses_number: '3',
                expo_number: '7',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session3 = 7;
        }
        $scope.getexpo38 = function () {
            var form = {
                ses_number: '3',
                expo_number: '8',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session3 = 8;
        }
        //Detayların gösterimi için 3.seans exposure seçimi son

        //Detayların gösterimi için 4.seans exposure seçimi başlangıç
        $scope.getexpo41 = function () {
            var form = {
                ses_number: '4',
                expo_number: '1',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session4 = 1;
        }
        $scope.getexpo42 = function () {
            var form = {
                ses_number: '4',
                expo_number: '2',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session4 = 2;
        }
        $scope.getexpo43 = function () {
            var form = {
                ses_number: '4',
                expo_number: '3',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session4 = 3;
        }
        $scope.getexpo44 = function () {
            var form = {
                ses_number: '4',
                expo_number: '4',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session4 = 4;
        }
        $scope.getexpo45 = function () {
            var form = {
                ses_number: '4',
                expo_number: '5',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session4 = 5;
        }
        $scope.getexpo46 = function () {
            var form = {
                ses_number: '4',
                expo_number: '6',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session4 = 6;
        }
        $scope.getexpo47 = function () {
            var form = {
                ses_number: '4',
                expo_number: '7',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session4 = 7;
        }
        $scope.getexpo48 = function () {
            var form = {
                ses_number: '4',
                expo_number: '8',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session4 = 8;
        }
        //Detayların gösterimi için 4.seans exposure seçimi son

        //Detayların gösterimi için 5.seans exposure seçimi başlangıç
        $scope.getexpo51 = function () {
            var form = {
                ses_number: '5',
                expo_number: '1',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session5 = 1;
        }
        $scope.getexpo52 = function () {
            var form = {
                ses_number: '5',
                expo_number: '2',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session5 = 2;
        }
        $scope.getexpo53 = function () {
            var form = {
                ses_number: '5',
                expo_number: '3',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session5 = 3;
        }
        $scope.getexpo54 = function () {
            var form = {
                ses_number: '5',
                expo_number: '4',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session5 = 4;
        }
        $scope.getexpo55 = function () {
            var form = {
                ses_number: '5',
                expo_number: '5',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session5 = 5;
        }
        $scope.getexpo56 = function () {
            var form = {
                ses_number: '5',
                expo_number: '6',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session5 = 6;
        }
        $scope.getexpo57 = function () {
            var form = {
                ses_number: '5',
                expo_number: '7',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session5 = 7;
        }
        $scope.getexpo58 = function () {
            var form = {
                ses_number: '5',
                expo_number: '8',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session5 = 8;
        }
        //Detayların gösterimi için 5.seans exposure seçimi son

        //Detayların gösterimi için 6.seans exposure seçimi başlangıç
        $scope.getexpo61 = function () {
            var form = {
                ses_number: '6',
                expo_number: '1',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session6 = 1;
        }
        $scope.getexpo62 = function () {
            var form = {
                ses_number: '6',
                expo_number: '2',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session6 = 2;
        }
        $scope.getexpo63 = function () {
            var form = {
                ses_number: '6',
                expo_number: '3',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session6 = 3;
        }
        $scope.getexpo64 = function () {
            var form = {
                ses_number: '6',
                expo_number: '4',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session6 = 4;
        }
        $scope.getexpo65 = function () {
            var form = {
                ses_number: '6',
                expo_number: '5',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session6 = 5;
        }
        $scope.getexpo66 = function () {
            var form = {
                ses_number: '6',
                expo_number: '6',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session6 = 6;
        }
        $scope.getexpo67 = function () {
            var form = {
                ses_number: '6',
                expo_number: '7',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session6 = 7;
        }
        $scope.getexpo68 = function () {
            var form = {
                ses_number: '6',
                expo_number: '8',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session6 = 8;
        }
        //Detayların gösterimi için 6.seans exposure seçimi son

        //Detayların gösterimi için 7.seans exposure seçimi başlangıç
        $scope.getexpo71 = function () {
            var form = {
                ses_number: '7',
                expo_number: '1',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session7 = 1;
        }
        $scope.getexpo72 = function () {
            var form = {
                ses_number: '7',
                expo_number: '2',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session7 = 2;
        }
        $scope.getexpo73 = function () {
            var form = {
                ses_number: '7',
                expo_number: '3',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session7 = 3;
        }
        $scope.getexpo74 = function () {
            var form = {
                ses_number: '7',
                expo_number: '4',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session7 = 4;
        }
        $scope.getexpo75 = function () {
            var form = {
                ses_number: '7',
                expo_number: '5',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session7 = 5;
        }
        $scope.getexpo76 = function () {
            var form = {
                ses_number: '7',
                expo_number: '6',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session7 = 6;
        }
        $scope.getexpo77 = function () {
            var form = {
                ses_number: '7',
                expo_number: '7',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session7 = 7;
        }
        $scope.getexpo78 = function () {
            var form = {
                ses_number: '7',
                expo_number: '8',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session7 = 8;
        }
        //Detayların gösterimi için 7.seans exposure seçimi son

        //Detayların gösterimi için 8.seans exposure seçimi başlangıç
        $scope.getexpo81 = function () {
            var form = {
                ses_number: '8',
                expo_number: '1',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session8 = 1;
        }
        $scope.getexpo82 = function () {
            var form = {
                ses_number: '8',
                expo_number: '2',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session8 = 2;
        }
        $scope.getexpo83 = function () {
            var form = {
                ses_number: '8',
                expo_number: '3',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session8 = 3;
        }
        $scope.getexpo84 = function () {
            var form = {
                ses_number: '8',
                expo_number: '4',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session8 = 4;
        }
        $scope.getexpo85 = function () {
            var form = {
                ses_number: '8',
                expo_number: '5',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session8 = 5;
        }
        $scope.getexpo86 = function () {
            var form = {
                ses_number: '8',
                expo_number: '6',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session8 = 6;
        }
        $scope.getexpo87 = function () {
            var form = {
                ses_number: '8',
                expo_number: '7',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session8 = 7;
        }
        $scope.getexpo88 = function () {
            var form = {
                ses_number: '8',
                expo_number: '8',
                patid: $rootScope.$storage.patid,
                done: '1'
            }
            $scope.getexpo(form);
            $scope.chosen_exposure.session8 = 8;
        }
        //Detayların gösterimi için 8.seans exposure seçimi son

        //GRAPH 1 FONKSİYONLAR BAŞLANGIÇ
        var graph = new Rickshaw.Graph({
            element: document.querySelector("#chart"),

            renderer: 'line',
            width: (($scope.widtho / 8) + 100),
            height: (($scope.widtho / 16) * 3 - 160),
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
        //graph.render();


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
            width: (($scope.widtho / 8) + 100),
            height: (($scope.widtho / 16) * 3 - 160),
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
        var y_axis = new Rickshaw.Graph.Axis.Y({
            graph: graph2,
            pixelsPerTick: 30,
            tickSize: 5,
            orientation: 'left',
            tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
            element: document.getElementById('y_axis2')
        });
        //graph2.render();

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


    }]);