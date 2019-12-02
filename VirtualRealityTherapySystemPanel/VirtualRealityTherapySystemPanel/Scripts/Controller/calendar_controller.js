angular.module('vrTheraphy').controller('calendar_controller', ['$scope', '$http', '$state', '$stateParams', '$localStorage', '$sessionStorage', '$rootScope', 'srvLogin',
    function ($scope, $http, $state, $stateParams, $localStorage, $sessionStorage, $rootScope, srvLogin) {
        $scope.init = function () {
            $.Pages.init();
            $('#myCalendar').pagescalendar();
            
        };

        $scope.trial = function () {
            var smt = document.getElementById("Inputdate").value;
            $('#myCalendar').pagescalendar('setDate', smt);
        }

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
            maxDate: new Date(2020, 5, 22),
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

        
    }]);