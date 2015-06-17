angular
  .module('app.services')
  .factory('Cheatsheet', Cheatsheet);

Cheatsheet.$inject = ['$http'];

function Cheatsheet ($http) {
  return {
    all: function all () {
      var cheatsheets = new _CheatsheetCollection_();

      $http.get('/cheatsheets')
        .done(angular.bind(cheatsheets, cheatsheets.add));
      // TODO: handle failure

      return cheatsheets;
    },

    find: function find (id) {
      var cheatsheet = new _Cheatsheet_();

      $http.get('/cheatsheets/' + id)
        .done(angular.bind(cheatsheet, cheatsheet.set));
      // TODO: handle failure

      return cheatsheet;
    },

    search: function search (query) {
      var cheatsheets = new _CheatsheetCollection_();

      $http.get('/cheatsheets?s=' + query)
        .done(angular.bind(cheatsheets, cheatsheets.add));
      // TODO: handle failure

      return cheatsheets;
    }
  };
}