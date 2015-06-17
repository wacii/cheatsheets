angular
  .module('app.services')
  .factory('Cheatsheet', Cheatsheet);

Cheatsheet.$inject = ['$http'];

function Cheatsheet ($http) {
  return {
    all: function all () {
      var cheatsheets = new _CheatsheetCollection_();

      return $http.get('/cheatsheets').then(
        function (resp) {
          cheatsheets.add(resp.data);
          return cheatsheets;
        }
      );
    },

    find: function find (id) {
      var cheatsheet = new _Cheatsheet_();

      return $http.get('/cheatsheets/' + id).then(
        function (resp) {
          cheatsheet.set(resp.data);
          return cheatsheet;
        },
        angular.identity
      );
    },

    search: function search (query) {
      var cheatsheets = new _CheatsheetCollection_();

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
