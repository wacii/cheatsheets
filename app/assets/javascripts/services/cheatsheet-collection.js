;(function () {
  angular
    .module('app.services')
    .factory('CheatsheetCollection', factory);

  factory.$inject = ['$http', 'CheatsheetModel'];

  function factory ($http, CheatsheetModel) {
    function CheatsheetCollection (models) {
      var array = [];

      array.add = this.add;
      array.create = this.create;

      array.add(models);
      return array;
    }

    CheatsheetCollection.prototype.add = function add (models) {
      if (models === undefined) return this;

      for (var i = 0; i < models.length; i++)
        this.push(new CheatsheetModel(models[i]));
    }

    CheatsheetCollection.prototype.create = function create (attributes) {
      var cheatsheet = new CheatsheetModel(attributes);
      cheatsheet.save();
      this.push(cheatsheet);
      return cheatsheet;
    };

    return CheatsheetCollection;
  }
})();
