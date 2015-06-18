angular
  .module('app.cheatsheets')
  .controller('CheatSheetsCtrl', ['$scope', '$filter', 'Cheatsheet', 'cheatsheets', function($scope, $filter, Cheatsheet, cheatsheets)
{
  $scope.cheatsheets = cheatsheets;

  $scope.addCheatSheet = function() {
    var newCheatSheet = { user_id: 1, title: $scope.title };
    cheatsheets.create(newCheatSheet);
  };

  $scope.options = { editorEnabled: false };
  $scope.enableEditor = function() {
    $scope.options.editorEnabled = true;
  };
  $scope.disableEditor = function() {
    $scope.options.editorEnabled = false;
  };

}]);