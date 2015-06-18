angular
  .module('app.cheatsheets')
  .controller('CheatSheetCtrl', ['$scope', '$filter', '$routeParams', 'Cheatsheet', function($scope, $filter, $routeParams, Cheatsheet)
{
  $scope.cheatsheet = { title: '' };
  Cheatsheet.find($routeParams.id).then(function (data) {
    $scope.cheatsheet = data;
  });

  $scope.addItem = function() {
    var newItem = { cheatsheet_id: $routeParams.id, name: $scope.name, description: $scope.description };
  //   cheatsheets.create(newCheatSheet);
  };

  $scope.options = { editorEnabled: false };
  $scope.enableEditor = function() {
    $scope.options.editorEnabled = true;
  };
  $scope.disableEditor = function() {
    $scope.options.editorEnabled = false;
  };

}]);