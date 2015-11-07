var app = angular.module('mr-handyman', []);

app.controller('HandymanController', ['$scope', '$http', function($scope, $http) {
  $http.get('/handymans').then(function(response) {
    $scope.handymanList = response.data;
  });
}]);
