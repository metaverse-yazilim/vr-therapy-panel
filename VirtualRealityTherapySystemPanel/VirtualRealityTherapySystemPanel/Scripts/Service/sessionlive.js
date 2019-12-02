angular.module('vrTheraphy').service('srvSessionlive', function ($http) {

    this.sendit = function (Info) {
        var request = $http({
            method: "post",
            url: '/api/livesession',
            data: Info
        });
        return request;
    };

    this.endit = function (Info) {
        var request = $http({
            method: "post",
            url: '/api/endexpo',
            data: Info
        });
        return request;
    };

    this.newcomment = function (Info) {
        var request = $http({
            method: "post",
            url: '/api/comment',
            data: Info
        });
        return request;
    };

    this.dataconn = function (Info) {
        var request = $http({
            method: "post",
            url: '/api/data',
            data: Info
        });
        return request;
    };

    this.datadisconn = function (Info) {
        var request = $http({
            method: "post",
            url: '/api/dataclose',
            data: Info
        });
        return request;
    };

    this.dataupt = function (Info) {
        var request = $http({
            method: "post",
            url: '/api/dataupdate',
            data: Info
        });
        return request;
    };

    this.randommm = function (Info) {
        var request = $http({
            method: "post",
            url: '/api/randomperson',
            data: Info
        });
        return request;
    };
});