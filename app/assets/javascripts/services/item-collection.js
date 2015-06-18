;(function () {
  angular
    .module('app.services')
    .factory('ItemCollection', factory);

  factory.$inject = ['$http', 'ItemModel'];

  function factory ($http, ItemModel) {
    function ItemCollection (models) {
      var array = [];

      array.add = this.add;
      array.create = this.create;
      array.remove = this.remove;

      array.add(models);
      return array;
    }

    ItemCollection.prototype.add = function add (models) {
      if (models === undefined) return this;

      for (var i = 0; i < models.length; i++) {
        var item = new ItemModel(models[i]);
        item.cheatsheetId = this.cheatsheetId;
        this.push(item);
      }
    }

    ItemCollection.prototype.create = function create (attributes) {
      if (this.cheatsheetId === undefined)
        throw new Error('parent must be persisted')
      var item = new ItemModel(attributes);
      item.cheatsheetId = this.cheatsheetId
      item.save();
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
