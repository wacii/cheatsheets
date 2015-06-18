angular
  .module('app.cheatsheets')
  .config(['$httpProvider', function($httpProvider) {
    token = $('meta[name=csrf-token]').attr('content');
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = token;
  }]);