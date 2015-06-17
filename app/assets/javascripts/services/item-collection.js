;(function () {
  angular
    .module('app.services')
    .factory('ItemCollection', factory);

  factory.$inject = ['$http', 'ItemModel'];

  function factory ($http, ItemModel) {
    function ItemCollection (models, cheatsheet) {
      var array = [];

      array.add = this.add;
      array.create = this.create;
      array.remove = this.remove;
      array.cheatsheet = cheatsheet;

      Object.defineProperty(array, 'attributes', {
        get: function () {
          var attrs = [];
          for (var i = 0; i < this.length; i++)
            attrs.push(this[i].attributes);
          return attrs;
        }
      });

      array.add(models);
      return array;
    }

    ItemCollection.prototype.add = function add (models) {
      if (models === undefined) return this;

      for (var i = 0; i < models.length; i++)
        this.push(new ItemModel(models[i]));
    }

    ItemCollection.prototype.create = function create (attributes) {
      if (this.cheatsheet === undefined || this.cheatsheet.id === undefined)
        throw new Error('parent must be persisted')
      var item = new ItemModel(attributes);
      item.save(this.cheatsheet.id);
      this.push(item);
      return item;
    };

    ItemCollection.prototype.remove = function remove (obj) {
      for (var i = 0; i < this.length; i++) {
        var item = this[i];
        if (item === obj || item.id === obj.id) {
          this.splice(i, 1);
          item.destroy();
          return item;
        }
      }
    }

    return ItemCollection;
  }
})();
