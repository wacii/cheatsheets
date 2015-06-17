;(function () {
  angular
    .module('app.scrap')
    .config(config);

  function config ($routeProvider) {
    $routeProvider
      .when('/scrap', {
        templateUrl: 'scrap.template.html',
        controller: 'ScrapController',
        controllerAs: 'vm',
        resolve: { cheatsheets: getCheatsheets }
      });
  }

  getCheatsheets.$inject = ['Cheatsheet'];

  function getCheatsheets (Cheatsheet) {
    return Cheatsheet.all();
  }
})();
