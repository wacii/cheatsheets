angular
  .module('app.cheatsheets')
  .config(config);

config.$inject = ['$routeProvider'];

function config ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'cheatsheet.index.html',
      controller: 'CheatSheetsCtrl',
      resolve: {
        cheatsheets: ['Cheatsheet', function (Cheatsheet) {
          return Cheatsheet.all();
        }]
      }
    })
    .when('/show/:id', {
      templateUrl: 'cheatsheet.show.html',
      controller: 'CheatSheetCtrl',
      resolve: {
        cheatsheet: ['$route', 'Cheatsheet', function ($route, Cheatsheet) {
          return Cheatsheet.find($route.current.params.id);
        }]
      }
    })
    .when('/edit/:id', {
      templateUrl: 'cheatsheet.edit.html',
      controller: 'CheatSheetEditCtrl',
      resolve: {
        cheatsheet: ['$route', 'Cheatsheet', function ($route, Cheatsheet) {
          return Cheatsheet.find($route.current.params.id);
        }]
      }
    })
    .otherwise('/');
}
