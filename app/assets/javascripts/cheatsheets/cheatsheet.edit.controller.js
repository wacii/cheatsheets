angular
  .module('app.cheatsheets')
  .controller('CheatSheetEditCtrl', ['$scope', '$filter', '$routeParams', 'Cheatsheet', function($scope, $filter, $routeParams, Cheatsheet)
{
  cheatsheet = {};

  Cheatsheet.find($routeParams.id).then(function (data) {
    $scope.cheatsheet = data;
    $scope.cheatsheetLoaded = true;
  });

  //console.log(cheatsheet);

  item = { cheatsheet_id: $routeParams.id, name: '', description: '' };

  $scope.editItem = function(item) {
    editItem = { cheatsheet_id: $routeParams.id, name: item.name, description: item.description };
    item.update(editItem);
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