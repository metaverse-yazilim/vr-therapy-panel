angular.module('vrTheraphy').service('srvLogin', function ($http) {
    this.UserLogin = function (Info) {
        var request = $http({
            method: "post",
            url: '/api/Login',
            data: Info
        });
        return request;
    };

    this.ResetPass = function (Info) {
        var request = $http({
            method: "post",
            url: '/api/ResetPassword',
            data: Info
        });
        return request;
    };

    this.UserPassCheck = function (Info) {
        var request = $http({
            method: "post",
            url: '/api/UserPassCheck',
            data: Info
        });
        return request;
    };

    this.PassChange = function (Info) {
        var request = $http({
            method: "post",
            url: '/api/PassRes',
            data: Info
        });
        return request;
    };

    this.ResetPassP = function (Info) {
        var request = $http({
            method: "post",
            url: '/api/ResetPasswordP',
            data: Info
        });
        return request;
    };

    this.UserCaptcha = function (Info) {
        var request = $http({
            method: "post",
            url: '/api/Captcha',
            data: Info
        });
        return request;
    };

    this.hastaLogin = function (Info) {
        var request = $http({
            method: "post",
            url: '/api/Patlogin',
            data: Info
        });
        return request;
    };

    this.PatientList = function (Info) {
        var request = $http({
            method: "post",
            url: '/api/PatientList',
            data: Info
        });
        return request;
    };

    this.opensescont = function (Info) {
        var request = $http({
            method: "post",
            url: '/api/OpenSes',
            data: Info
        });
        return request;
    };

    this.addsession = function (Info) {
        var request = $http({
            method: "post",
            url: '/api/NewSession',
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

    this.PatSesList = function (Info) {
        var request = $http({
            method: "post",
            url: '/api/PatientSessionList',
            data: Info
        });
        return request;
    };

    this.SesDel = function (Info) {
        var request = $http({
            method: "post",
            url: '/api/SessionDelete',
            data: Info
        });
        return request;
    };

    this.SesEdit = function (Info) {
        var request = $http({
            method: "post",
            url: '/api/SessionEdit',
            data: Info
        });
        return request;
    };

    this.SesFinder = function (Info) {
        var request = $http({
            method: "post",
            url: '/api/SessionFinder',
            data: Info
        });
        return request;
    };
});