var app = angular.module('myApp', []);

app.controller("EmployeeController", ["$http", function ($http) {
  console.log('running');

  var self = this;
  self.newEmployee = {};
  self.employees = [];

  getEmployees();

  // read only
  function getEmployees() {
    $http.get('/employees')
      .then(function (response) {
        console.log(response.data);
        self.employees = response.data;
      });
  }

  // tied to DOM thru self object
  self.addEmployee = function () {
    console.log('new book: ', self.newEmployee);
    $http.post('/employees', self.newEmployee)
      .then(function (response) {
        console.log('POST finished. Get employees again.');
        getEmployees();
      });
  };
}]);
