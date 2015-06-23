angular
  .module('app.cheatsheets')
  .controller('CheatSheetCtrl', ['$scope', '$filter', 'cheatsheet', function($scope, $filter, cheatsheet)
{
  $scope.cheatsheet = cheatsheet;
  $scope.cheatsheet.items = $filter('orderBy')($scope.cheatsheet.items, 'rank');
  $scope.newItem = {};

  $scope.addItem = function(newItem) {
    $scope.cheatsheet.items.create(newItem);
    $scope.newItem.name = '';
    $scope.newItem.description = '';
  };

  $scope.editCheatSheet2 = function(cheatsheet) {
    cheatsheet.update(cheatsheet);
    $scope.options.editorEnabled = false;
  };

  $scope.options = { editorEnabled: false };
  $scope.enableEditor = function() {
    $scope.options.editorEnabled = true;
  };
  $scope.disableEditor = function() {
    $scope.options.editorEnabled = false;
  };
}]);
