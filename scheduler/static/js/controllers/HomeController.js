(function () {

    var app = angular.module('Scheduler');

    app.controller('HomeController', function ($scope, $http, $location, moment) {


        $scope.init = function () {
            getEmployeeDays();
            $scope.week = getFullWeek();
        };

        var getStartOfWeek = function () {
            return moment(new moment()).isoWeekday(0).format('YYYY-MM-DD');
        };

        var getEndOfWeek = function () {
            return moment(new moment()).isoWeekday(6).format('YYYY-MM-DD');
        };

        var getFullWeek = function () {
            var today = new moment();
            var week = [];
            for(var i = 0; i<7; i++) {
                week.push(moment(today).isoWeekday(i).format('YYYY-MM-DD'))
            }
            return week;
        };

        var getEmployeeDays = function () {
            var params = {
                params : {
                    startDate : getStartOfWeek(),
                    endDate : getEndOfWeek()
                }
            };
            $http.get('/getEmployeeDays', params)
                .then(function (response) {
                    $scope.employeeDays = response.data;
                    console.log($scope.employeeDays);
                })
        };

        $scope.isUndefined = function (thing) {
            return (typeof thing === "undefined");
        };

        $scope.setRoute = function (route) {
            $location.path(route);
        }
    })
}());