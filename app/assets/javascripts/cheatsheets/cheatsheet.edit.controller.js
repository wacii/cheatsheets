angular
  .module('app.cheatsheets')
  .controller('CheatSheetEditCtrl', ['$scope', 'cheatsheet', function($scope, cheatsheet)
{
  $scope.cheatsheet = cheatsheet;
  $scope.newItem = {};
  $scope.addItem = function createItem() {
    if (!$scope.newItem.name || !$scope.newItem.description) return;
    $scope.cheatsheet.items.create($scope.newItem);
    $scope.newItem = {};
  };
}]);
