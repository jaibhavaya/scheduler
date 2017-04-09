(function () {

    var app = angular.module('Scheduler');

    app.controller('ManageEmployeesController', function ($scope, $http) {
        $scope.showCreateEmployee = false;
        $scope.firstName = null;
        $scope.lastName = null;
        $scope.middleName = null;
        $scope.userName = null;

        $scope.init = function () {
            getEmployees();
        };

        var getEmployees = function () {
            $http.get('/getEmployees')
                .then(function (response) {
                    $scope.employees = response.data.employees;
                })
        };

        $scope.createEmployee = function () {
            $scope.showAlert = false;
            $scope.message = '';

            if(!$scope.firstName || !$scope.lastName || !$scope.userName) {
                $scope.showAlert = true;
                $scope.message = 'Please fill in all required fields';
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
                    setTimeout(function () {
                        $scope.showAlert = false;
                        $scope.message = '';
                    }, 3000);
                    getEmployees();
                },function (response) {
                    if (response.status == 403) {
                        $scope.userName = null;
                        $scope.showAlert = true;
                        $scope.message = 'User Name already taken';
                    }
                })
        };

        $scope.toggleShowCreateEmployee = function () {
            $scope.showCreateEmployee = !$scope.showCreateEmployee;
        }
    })

} () );