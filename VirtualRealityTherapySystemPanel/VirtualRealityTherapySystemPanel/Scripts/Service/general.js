angular.module('vrTheraphy').service('srvGeneral', function ($http) {
    this.TodoListGetData = function (SearchParams) {
        var request = $http({
            method: "get",
            url: '/api/VirtualTherapySystemPanel',
            params: SearchParams
        });
        return request;
    };
});