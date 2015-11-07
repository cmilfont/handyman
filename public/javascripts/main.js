var app = angular.module('mr-handyman', []);

app.controller('HandymanController', ['$scope', '$http', function($scope, $http) {
  function init() {
    $scope.search();
  }
  
  $scope.search = function() {
    var queryFilter = $scope.queryFilter || "";

    $http.get('/handymans?filter='+queryFilter).then(function(response) {
      $scope.handymanList = response.data;
    });
  }

  init();
}]);
