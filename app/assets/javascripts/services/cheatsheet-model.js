;(function () {
  angular
    .module('app.services')
    .factory('CheatsheetModel', factory);

  factory.$inject = ['$http', 'ItemCollection'];

  function factory ($http, ItemCollection) {
    function CheatsheetModel (attributes) {
      this.title = '';
      this.set(attributes);
    }

    Object.defineProperty(CheatsheetModel.prototype, 'attributes', {
      get: function () {
        return { title: this.title };
      }
    });

    CheatsheetModel.prototype.save = function save () {
      if (this.id === undefined) {
        $http.post('/cheatsheets', { cheatsheet: this.attributes });
      } else {
        $http.patch('/cheatsheets/' + this.id, { cheatsheet: this.attributes });
      }
    };

    CheatsheetModel.prototype.update = function update (attributes) {
      this.set(attributes);
      this.save()
    };

    CheatsheetModel.prototype.destroy = function destroy () {
      if (this.id === undefined)
        return this;
      $http.delete('/cheatsheets/' + this.id);
    };

    CheatsheetModel.prototype.set = function set (attributes) {
      angular.extend(this, attributes);
      var _items = this.items;
      this.items = new ItemCollection(_items);
      this.items.cheatsheetId = this.id;
    };

    return CheatsheetModel;
  }
})();


