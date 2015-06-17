angular
  .module('app.services')
  .factory('ItemModel', factory);

factory.$inject = ['$http'];

function factory ($http) {
  function ItemModel (attributes) {
    this.name = '';
    this.set(attributes);
  }

  Object.defineProperty(ItemModel.prototype, 'attributes', {
    get: function () {
      return { name: this.name, description: this.description };
    }
  });

  ItemModel.prototype.save = function save () {
    if (this.id === undefined) {
      $http.post('/items', this.attributes);
    } else {
      $http.patch('/items/' + this.id, this.attributes);
    }
  };

  ItemModel.prototype.update = function update (attributes) {
    this.set(attributes);
    this.save()
  };

  ItemModel.prototype.destroy = function destroy () {
    $http.delete('/items/' + this.id);
  };

  ItemModel.prototype.set = function set (attributes) {
    angular.extend(this, attributes);
  };

  return ItemModel;
}
