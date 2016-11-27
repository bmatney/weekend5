var myApp = angular.module('myApp', []);

myApp.controller("EmployeeController", ["$http", function ($http) {
  console.log('running');

  var self = this;
  self.newEmployee = {};
  self.employees = [];

  getEmployees();

  function getEmployees() {
    $http.get('/routes')
      .then(function (response) {
        console.log(response.data);
        self.employees = response.data;

        var salarySum = 0;

        for (var i = 0; i < self.employees.length; i++) {
          salarySum += Number(self.employees[i].salary)
        }
        self.monthlySalary = salarySum/12;
      });
  }

  self.addEmployees = function () {
    console.log('new employee: ', self.newEmployee);
    $http.post('/routes', self.newEmployee)
      .then(function (response) {
        console.log('POST finished. Get employees again.');
        getEmployees();
      });
  };

  self.deleteEmployees = function (empObj) {
      console.log(empObj);
      $http.delete('/routes/' + empObj.id)
        .then(function (response) {
          console.log('DELETE finished');
          getEmployees();
        });
    };
}]);
