//= require spec_helper

describe('CheatsheetCollection', function () {
  beforeEach(angular.mock.module('app.services'))

  var $http;
  beforeEach(function () {
    $http = jasmine.createSpyObj('$http', ['post', 'delete'])
    angular.mock.module({
      $http: $http
    });
  });

  var CheatsheetCollection;
  var collection;
  beforeEach(inject(function (_CheatsheetCollection_) {
    CheatsheetCollection = _CheatsheetCollection_;
    collection = new CheatsheetCollection;
  }));

  describe('#add()', function () {
    it('adds models', function () {
      expect(collection.length).toEqual(0);
      collection.add([
        { id: 1, title: 'asdf' },
        { id: 2, title: 'qwer' }
      ]);
      expect(collection.length).toEqual(2);

      var model = collection[0];
      expect(model.title).toEqual('asdf');
    })
  });

  describe('#create()', function () {
    it('returns new _Cheatsheet_ object', function () {
      var value = collection.create({ title: 'asdf' });
      expect(value.title).toEqual('asdf');
      expect(value.save).not.toBeUndefined();
    });

    it('saves created object', function () {
      collection.create({ title: 'asdf' });
      expect($http.post).toHaveBeenCalled();
    });

    it('pushes object', function () {
      spyOn(collection, 'push');
      collection.create({ title: 'asdf' });
      expect(collection.push).toHaveBeenCalled();
    });
  });

  describe('#remove()', function () {
    var cheatsheet;
    beforeEach(function () {
      cheatsheet = { title: 'zxcv' };
      collection.add([
        { id: 1, title: 'asdf' },
        { id: 2, title: 'qwer' },
        cheatsheet
      ]);
    });

    it('removes item from collection by id attribute', function () {
      collection.remove({ id: 1, title: 'asdf' });
      expect(collection).not.toEqual(jasmine.arrayContaining([
        { id: 1, title: 'asdf' }
      ]));
    });

    it('removes item from collection by object equivalence', function () {
      collection.remove(cheatsheet);
      expect(collection).not.toEqual(jasmine.arrayContaining([cheatsheet]));
    });

    it('calls destroy on removed item', function () {
      cheatsheet = collection[0];
      spyOn(cheatsheet, 'destroy');
      collection.remove({ id: 1, title: 'asdf' });
      expect(cheatsheet.destroy).toHaveBeenCalled();
    });
  })
});
