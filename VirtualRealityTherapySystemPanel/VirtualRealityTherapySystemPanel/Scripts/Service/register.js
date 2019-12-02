angular.module('vrTheraphy').service('srvregister', function ($http) {
    this.UserRegister = function (Info) {
        var request = $http({
            method: "post",
            url: '/api/Register',
            data: Info
        });
        return request;
    };
    this.PatRegister = function (Info) {
        var request = $http({
            method: "post",
            url: '/api/Patreg',
            data: Info
        });
        return request;
    };
});