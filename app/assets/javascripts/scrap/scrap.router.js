angular
  .module('app')
  .config(config);

config.$inject = ['$routeProvider'];

function config ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'cheatsheet.index.html',
      controller: 'CheatsheetCtrl',
      controllerAs: 'Ctrl'

      // templateUrl: 'scrap.template.html',
      // controller: 'ScrapController',
      // controllerAs: 'vm'
    })
    .otherwise('/');
}
