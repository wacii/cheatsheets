function _Cheatsheet_ (attributes) {
  this.name = '';
  this.set(attributes);
}

Object.defineProperty(_Cheatsheet_.prototype, 'attributes', {
  get: function () { return { name: this.name }; }
});

_Cheatsheet_.prototype.save = function save () {
  if (this.id === undefined) {
    $http.post('/cheatsheets', this.attributes);
  } else {
    $http.patch('/cheatsheets/' + this.id, this.attributes);
  }
};

_Cheatsheet_.prototype.update = function update (attributes) {
  this.set(attributes);
  this.save()
};

_Cheatsheet_.prototype.destroy = function destroy () {
  $http.delete('/cheatsheets/' + this.id);
};

_Cheatsheet_.prototype.set = function set (attributes) {
  angular.extend(this, attributes);
}

function _CheatsheetCollection_ (models) {
  var array = [];

  array.add = this.add;
  array.create = this.create;

  array.add(models);
  return array;
}

_CheatsheetCollection_.prototype.add = function add (models) {
  if (models === undefined) return;

  for (var i = 0; i < models.length; i++)
    this.push(new _Cheatsheet_(models[i]));
}

_CheatsheetCollection_.prototype.create = function create (attributes) {
  var cheatsheet = new _Cheatsheet_(attributes);
  cheatsheet.save();
  this.push(cheatsheet);
  return cheatsheet;
}
