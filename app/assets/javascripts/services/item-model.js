;(function () {
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

    ItemModel.prototype.save = function save (cheatsheetId) {
      var url = '/cheatsheets/' + cheatsheetId;
      if (this.id === undefined) {
        $http.post(url + '/items', { item: this.attributes });
      } else {
        $http.patch(url + '/items/' + this.id, { item: this.attributes });
      }
    };

    ItemModel.prototype.update = function update (attributes) {
      this.set(attributes);
      this.save()
    };

    ItemModel.prototype.destroy = function destroy () {
      if (this.id === undefined)
        return this;
      $http.delete('/items/' + this.id);
    };

    ItemModel.prototype.set = function set (attributes) {
      angular.extend(this, attributes);
    };

    return ItemModel;
  }
})();
