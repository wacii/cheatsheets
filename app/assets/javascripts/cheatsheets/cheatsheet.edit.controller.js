angular
  .module('app.cheatsheets')
  .controller('CheatSheetEditCtrl', ['$scope', '$http', '$filter', 'cheatsheet', function($scope, $http, $filter, cheatsheet)
{
  var orderBy = $filter('orderBy');
  $scope.cheatsheet = cheatsheet;
  $scope.cheatsheet.items = orderBy($scope.cheatsheet.items, 'rank')

  $scope.newItem = {};
  $scope.addItem = function createItem() {
    if (!$scope.newItem.name || !$scope.newItem.description) return;
    $scope.cheatsheet.items.create($scope.newItem);
    $scope.newItem = {};
  };
  $scope.dragControlListeners = {
    itemMoved: angular.noop,
    orderChanged: function(event) {
      var item = event.dest.sortableScope.modelValue[event.dest.index];
      $http.post('/items/' + item.id + '/insert_at', { position: event.dest.index + 1 })
    }
  };
}]);
