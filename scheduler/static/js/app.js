(function () {
    var app = angular.module('Scheduler', ['ngRoute', 'angularMoment'])
        .config(function ($interpolateProvider, $routeProvider) {
            $interpolateProvider
                .startSymbol('{[{')
                .endSymbol('}]}');

            $routeProvider
                .when('/manageEmployees', {
                    templateUrl: '/partials/manageEmployees.html',
                    controller: 'ManageEmployeesController'
                })
                .when('/home', {
                    templateUrl: '/partials/home.html',
                    controller: 'HomeController'
                })
                .otherwise({redirectTo: '/home'})

        });
}());