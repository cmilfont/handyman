var app = angular.module('mr-handyman', []);

app.controller('MainController', ['$scope', '$http', function($scope, $http) {
  $scope.search = function() {
    var queryFilter = $scope.queryFilter || "";

    $http.get('/handymans?filter='+queryFilter).then(function(response) {
      $scope.handymanList = response.data;
    });
  }

  $scope.search();
}]);

app.controller('RatingController', ['$scope', '$http', function($scope, $http) {
}]);
