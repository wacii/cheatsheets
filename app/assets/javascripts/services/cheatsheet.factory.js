angular
  .module('app.services')
  .factory('Cheatsheet', Cheatsheet);

Cheatsheet.$inject = ['$http', 'CheatsheetModel', 'CheatsheetCollection'];

function Cheatsheet ($http, CheatsheetModel, CheatsheetCollection) {
  return {
    all: function all () {
      var cheatsheets = new CheatsheetCollection();

      return $http.get('/cheatsheets').then(
        function (resp) {
          cheatsheets.add(resp.data);
          return cheatsheets;
        }
      );

    },
    find: function find (id) {
      var cheatsheet = new CheatsheetModel();

      return $http.get('/cheatsheets/' + id).then(
        function (resp) {
          cheatsheet.set(resp.data);
          return cheatsheet;
        },
        angular.identity
      );
    },

    search: function search (query) {
      var cheatsheets = new CheatsheetCollection();

      return $http.get('/cheatsheets?s=' + query).then(
        function (resp) {
          cheatsheets.add(resp.data);
          return cheatsheets;
        },
        angular.identity
      );
    }
  };
}
