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
      var item = new ItemModel(attributes);
      item.save();
      this.push(item);
      return item;
    };

    return ItemCollection;
  }
})();
