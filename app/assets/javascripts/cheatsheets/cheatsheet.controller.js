angular
  .module('app.cheatsheets')
  .controller('CheatSheetCtrl', ['$scope', 'cheatsheet', function($scope, cheatsheet)
{
  $scope.cheatsheet = cheatsheet;

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
