angular
  .module('app.services')
  .factory('CheatsheetModel', factory);

factory.$inject = ['$http', 'ItemCollection'];

function factory ($http, ItemCollection) {
  function CheatsheetModel (attributes) {
    this.title = '';
    this.set(attributes);

    var _items = this.items;
    this.items = new ItemCollection(_items);
  }

  Object.defineProperty(CheatsheetModel.prototype, 'attributes', {
    get: function () {
      return { title: this.title, items_attributes: this.items.attributes };
    }
  });

  CheatsheetModel.prototype.save = function save () {
    if (this.id === undefined) {
      $http.post('/cheatsheets', this.attributes);
    } else {
      $http.patch('/cheatsheets/' + this.id, this.attributes);
    }
  };

  CheatsheetModel.prototype.update = function update (attributes) {
    this.set(attributes);
    this.save()
  };

  CheatsheetModel.prototype.destroy = function destroy () {
    $http.delete('/cheatsheets/' + this.id);
  };

  CheatsheetModel.prototype.set = function set (attributes) {
    angular.extend(this, attributes);
  };

  return CheatsheetModel;
}
