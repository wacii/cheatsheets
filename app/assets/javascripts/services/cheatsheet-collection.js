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
      array.remove = this.remove

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

    CheatsheetCollection.prototype.remove = function remove (obj) {
      for (var i = 0; i < this.length; i++) {
        var cheatsheet = this[i];
        if (cheatsheet === obj || cheatsheet.id === obj.id) {
          this.splice(i, 1);
          cheatsheet.destroy();
          return cheatsheet;
        }
      }
    }

    return CheatsheetCollection;
  }
})();
