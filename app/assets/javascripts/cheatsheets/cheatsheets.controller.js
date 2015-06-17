angular
  .module('app')
  .controller('CheatSheetsCtrl', ['$scope', '$filter', 'Cheatsheet', 'cheatsheets', function($scope, $filter, Cheatsheet, cheatsheets)
{
  $scope.cheatsheets = cheatsheets;

  $scope.addCheatSheet = function() {
    var newCheatSheet = { user_id: 1, title: $scope.title};
    cheatsheets.create(newCheatSheet);
  };

}]);