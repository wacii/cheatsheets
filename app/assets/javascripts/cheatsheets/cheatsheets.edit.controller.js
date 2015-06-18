angular
  .module('app.cheatsheets')
  .controller('CheatSheetsEditCtrl', ['$scope', '$routeParams', 'Cheatsheet', function($scope, $routeParams, Cheatsheet)
{
  cheatsheet = { title: '' };

  $scope.editCheatSheet = function(cheatsheet) {
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