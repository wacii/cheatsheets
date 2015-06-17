angular
  .module('app')
  .controller('CheatSheetCtrl', ['$scope', '$filter', 'Cheatsheet', function($scope, $filter, Cheatsheet)
{
  $scope.cheatsheets = [];
  $scope.cheatsheets = Cheatsheet.all();

  $scope.addCheatSheet = function() {
    Cheatsheet.add($scope.formData).success(function(data){

    });
  };

});

// Controller.$inject = [];
//
// function Controller () {
//   var vm = this;
//
//   vm.name = 'asdf';
//   vm.body = 'qwer';
// }