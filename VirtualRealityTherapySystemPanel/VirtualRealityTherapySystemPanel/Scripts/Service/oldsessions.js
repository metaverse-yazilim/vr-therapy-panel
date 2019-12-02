angular.module('vrTheraphy').service('srvOldsession', function ($http) {
    this.saveit = function (Info) {
        var request = $http({
            method: "post",
            url: '/api/SaveExpo',
            data: Info
        });
        return request;
    };

    this.getit = function (Info) {
        var request = $http({
            method: "post",
            url: '/api/GetExpo',
            data: Info
        });
        return request;
    };

    this.getsound = function (Info) {
        var request = $http({
            method: "post",
            url: '/api/Sound',
            data: Info
        });
        return request;
    };

    this.countit = function (Info) {
        var request = $http({
            method: "post",
            url: '/api/ExpoCounter',
            data: Info
        });
        return request;
    };

    this.finito = function (Info) {
        var request = $http({
            method: "post",
            url: '/api/EndSession',
            data: Info
        });
        return request;
    };

    this.Patinfo = function (Info) {
        var request = $http({
            method: "post",
            url: '/api/Patientinfo',
            data: Info
        });
        return request;
    };

    this.GetAudio = function (Info) {
        var request = $http({
            method: "post",
            url: '/api/AudioReciever',
            data: Info
        });
        return request;
    };
});