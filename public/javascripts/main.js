var app = angular.module('mr-handyman', []);

app.controller('MainController', ['$scope', '$http', 'HandymanService', function($scope, $http, HandymanService) {
  $scope.search = function() {
    var queryFilter = $scope.queryFilter || "";

    HandymanService.allHandymans(queryFilter).then(function(response) {
      $scope.handymanList = response.data;
    });
  }

  $scope.search();
}]);

app.controller('RatingController', ['$scope', '$http', 'HandymanService', function($scope, $http, HandymanService) {
  $scope.rate = function() {
    var data = {
      name: $scope.name,
      phone: $scope.phone,
      skills: $scope.skills,
      recommend: $scope.recommend
    };

    HandymanService.addRating(data).then(function(response) {
      // Add a new rating!
    });
  }
}]);

app.service('HandymanService', function($http) {
  return {
    allHandymans: function(query) {
      var url = '/handymans?filter='+query;
      return $http.get(url);
    },
    addRating: function(data) {
      var url = '/rating';
      return $http.post(url, data);
    }
  };
});
