describe('CheatsheetCollection', function () {
  beforeEach(angular.mock.module('app.services'))

  var $http;
  beforeEach(function () {
    $http = jasmine.createSpyObj('$http', ['post'])
    angular.mock.module({
      $http: $http
    });
  });

  var CheatsheetCollection;
  var collection;
  beforeEach(inject(function (_CheatsheetCollection_) {
    CheatsheetCollection = _CheatsheetCollection_;
    collection = new CheatsheetCollection;
  }))

  describe('#add()', function () {
    it('adds models', function () {
      expect(collection.length).toEqual(0);
      collection.add([
        { id: 1, name: 'asdf' },
        { id: 2, name: 'qwer' }
      ]);
      expect(collection.length).toEqual(2);

      var model = collection[0];
      expect(model.name).toEqual('asdf');
    })
  });

  describe('#create()', function () {
    it('returns new _Cheatsheet_ object', function () {
      var value = collection.create({ name: 'asdf' });
      expect(value.name).toEqual('asdf');
      expect(value.save).not.toBeUndefined();
    });

    it('saves created object', function () {
      collection.create({ name: 'asdf' });
      expect($http.post).toHaveBeenCalled();
    });

    it('pushes object', function () {
      spyOn(collection, 'push');
      collection.create({ name: 'asdf' });
      expect(collection.push).toHaveBeenCalled();
    });
  });
});
