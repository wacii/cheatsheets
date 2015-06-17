angular
  .module('app.services')
  .factory('CheatsheetModel', factory);

factory.$inject = ['$http'];

function factory ($http) {
  function CheatsheetModel (attributes) {
    this.name = '';
    this.set(attributes);
  }

  Object.defineProperty(CheatsheetModel.prototype, 'attributes', {
    get: function () {
      return { name: this.name, items_attributes: this.items || [] };
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
