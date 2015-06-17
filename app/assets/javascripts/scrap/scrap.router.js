angular
  .module('app.scrap')
  .config(config);

function config ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'scrap.template.html',
      controller: 'ScrapController',
      controllerAs: 'vm',
      resolve: {
        cheatsheets: function (Cheatsheet) {
          return Cheatsheet.all();
        }
      }
    })
    .otherwise('/');
}
