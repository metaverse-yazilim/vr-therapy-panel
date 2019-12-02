angular.module('vrTheraphy').service('srvSessionsettings', function ($http) {
    this.amfi50 = function (Info) {
        var request = $http({
            method: "post",
            url: '/api/amfi50settings',
            data: Info
        });
        return request;
    };

    this.amfi100 = function (Info) {
        var request = $http({
            method: "post",
            url: '/api/amfi100settings',
            data: Info
        });
        return request;
    };

    this.acme = function (Info) {
        var request = $http({
            method: "post",
            url: '/api/acmesettings',
            data: Info
        });
        return request;
    };

    this.jobint = function (Info) {
        var request = $http({
            method: "post",
            url: '/api/jobintsettings',
            data: Info
        });
        return request;
    };

    this.jobme = function (Info) {
        var request = $http({
            method: "post",
            url: '/api/jobmesettings',
            data: Info
        });
        return request;
    };

    this.acint = function (Info) {
        var request = $http({
            method: "post",
            url: '/api/acintsettings',
            data: Info
        });
        return request;
    };

    this.shop = function (Info) {
        var request = $http({
            method: "post",
            url: '/api/shoppingsettings',
            data: Info
        });
        return request;
    };

    this.subway = function (Info) {
        var request = $http({
            method: "post",
            url: '/api/subwaysettings',
            data: Info
        });
        return request;
    };

    this.rest = function (Info) {
        var request = $http({
            method: "post",
            url: '/api/restaurantsettings',
            data: Info
        });
        return request;
    };

});