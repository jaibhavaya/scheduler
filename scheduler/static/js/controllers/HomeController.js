(function () {

    var app = angular.module('Scheduler');

    app.controller('HomeController', function ($scope, $http, $location) {
        $scope.setRoute = function (route) {
            $location.path(route);
        }
    })
}());