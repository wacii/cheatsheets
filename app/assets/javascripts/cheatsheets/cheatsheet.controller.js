angular
  .module('app.cheatsheets')
  .controller('CheatSheetCtrl', ['$scope', '$filter', '$routeParams', 'Cheatsheet', function($scope, $filter, $routeParams, Cheatsheet)
{

  cheatsheet = { title: '' };

  $scope.newItem = {};

  Cheatsheet.find($routeParams.id).then(function (data) {
    $scope.cheatsheet = data;
    $scope.cheatsheetLoaded = true;
  });

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