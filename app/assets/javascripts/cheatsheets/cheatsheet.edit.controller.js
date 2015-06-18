angular
  .module('app.cheatsheets')
  .controller('CheatSheetEditCtrl', ['$scope', '$routeParams', 'Cheatsheet', function($scope, $routeParams, Cheatsheet) {
    $scope.cheatsheet = {};
    $scope.newItem = {};
    $scope.addItem = function createItem() {
      if (!$scope.newItem.name || !$scope.newItem.description) return;
      $scope.cheatsheet.items.create($scope.newItem);
      $scope.newItem = {};
    };

    Cheatsheet.find($routeParams.id).then(function (data) {
      $scope.cheatsheet = data;
      $scope.cheatsheetLoaded = true;
    });
  }
]);
