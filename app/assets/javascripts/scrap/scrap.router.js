angular
  .module('app')
  .config(config);

config.$inject = ['$routeProvider'];

function config ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'scrap.template.html',
      controller: 'ScrapController',
      controllerAs: 'vm'
    })
    .otherwise('/');
}
