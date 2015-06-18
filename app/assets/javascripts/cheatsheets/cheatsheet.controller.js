angular
  .module('app.cheatsheets')
  .controller('CheatSheetCtrl', ['$scope', '$http', '$filter', '$routeParams', 'Cheatsheet', function($scope, $http, $filter, $routeParams, Cheatsheet)
{

  cheatsheet = { title: '' };
  item = { cheatsheet_id: $routeParams.id, name: '', description: '', rank: 0 };
  $scope.newItem = {};

  Cheatsheet.find($routeParams.id).then(function (data) {
    $scope.cheatsheet = data;
    $scope.cheatsheet.items = $filter('orderBy')($scope.cheatsheet.items, 'rank');
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

  $scope.dragControlListeners = {
      // accept: function (sourceItemHandleScope, destSortableScope) {return boolean}

      itemMoved: function (event) {
      },
      orderChanged: function(event) {
        console.log(event);
        var item = event.dest.sortableScope.modelValue[event.dest.index];
        console.log(item.id);
        console.log(event.dest.index);
        $http.post('/items/' + item.id + '/insert_at', { position: event.dest.index })
      }
      // containment: '#board'//optional param.
  };

}]);