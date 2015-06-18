angular
  .module('app.cheatsheets')
  .config(config);

config.$inject = ['$routeProvider'];

function config ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'cheatsheet.index.html',
      controller: 'CheatSheetsCtrl',
      controllerAs: 'Ctrl',
      resolve: {
        'cheatsheets': function (Cheatsheet) {
          return Cheatsheet.all();
        }
      }
    })
    .when('/show/:id', {
      templateUrl: 'cheatsheet.show.html',
      controller: 'CheatSheetCtrl',
      controllerAs: 'Ctrl'
    })
    .otherwise('/');
}
