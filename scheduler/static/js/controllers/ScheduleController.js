(function () {
    var app = angular.module('Scheduler');

    app.controller('ScheduleController', function ($scope, $http) {
        $scope.message = 'hello world!';

        $scope.init = function () {
            $http.get('/getEmployees')
                .then(function (response) {
                    $scope.employees = response.data.employees;
                }, function (response) {
                    console.log(response.data);
                })
        }
    })
} ());