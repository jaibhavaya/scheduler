(function () {

    var app = angular.module('Scheduler');

    app.controller('ManageEmployeesController', function ($scope, $http, $location) {
        $scope.showCreateEmployee = false;
        $scope.showAlert = false;

        $scope.init = function () {
            loadDefaults();
            getEmployees();
        };

        var getEmployees = function () {
            $http.get('/getEmployees')
                .then(function (response) {
                    $scope.employees = response.data.employees;
                })
        };

        var hideAlert = function () {
            $scope.showAlert = false;
            $scope.message = '';
            $scope.$apply();
        };

        var loadDefaults = function () {
            $scope.firstName = null;
            $scope.lastName = null;
            $scope.middleName = null;
            $scope.userName = null;
        };

        $scope.createEmployee = function () {
            $scope.showAlert = false;
            $scope.message = '';

            if(!$scope.firstName || !$scope.lastName || !$scope.userName) {
                $scope.showAlert = true;
                $scope.message = 'Please fill in all required fields';
                setTimeout(hideAlert, 3000);
                return;
            }
            var params = {
                    firstName: $scope.firstName,
                    lastName: $scope.lastName,
                    middleName: $scope.middleName,
                    userName: $scope.userName
            };

            $http.post('/createEmployee', params)
                .then(function (response) {
                    $scope.showCreateEmployee = false;
                    $scope.showAlert = true;
                    $scope.message = 'Successfully Created Employee ' + $scope.lastName + ', ' + $scope.firstName + ' ';
                    setTimeout(hideAlert, 3000);
                    getEmployees();
                    loadDefaults();
                },function (response) {
                    if (response.status == 403) {
                        $scope.userName = null;
                        $scope.showAlert = true;
                        $scope.message = 'User Name already taken';
                        setTimeout(hideAlert, 3000);
                    }
                })
        };

        $scope.deleteEmployee = function (employeeId) {
            var params = {
                id: employeeId
            };

            $http.post('/deleteEmployee', params)
                .then(function (response) {
                    getEmployees();
                }, function (response) {

                })
        };

        $scope.toggleShowCreateEmployee = function () {
            $scope.showCreateEmployee = !$scope.showCreateEmployee;
        };

        $scope.setRoute = function (route) {
            $location.path(route);
        }
    })

} () );