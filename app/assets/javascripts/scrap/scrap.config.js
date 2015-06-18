;(function () {
  angular
    .module('app.scrap')
    .config(config);

  config.$inject = ['$httpProvider', 'markedProvider'];

  function config ($httpProvider, markedProvider) {
    var token = $('meta[name=csrf-token]').attr('content');
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = token;

    markedProvider.setOptions({
      highlight: function (code) {
        return hljs.highlightAuto(code).value;
      }
    });
  }
})();
