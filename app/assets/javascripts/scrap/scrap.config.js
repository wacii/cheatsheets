;(function () {
  angular
    .module('app.scrap')
    .config(config);

  config.$inject = ['$httpProvider'];

  function config ($httpProvider) {
    var token = $('meta[name=csrf-token]').attr('content');
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = token;
  }
})();
