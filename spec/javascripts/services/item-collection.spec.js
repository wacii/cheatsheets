//= require spec_helper

describe('ItemCollection', function () {
  beforeEach(angular.mock.module('app.services'))

  beforeEach(function () {
    angular.mock.module({
      $http: jasmine.createSpyObj('$http', ['post', 'delete'])
    });
  });

  var $http;
  var collection;
  beforeEach(inject(function ($injector) {
    $http = $injector.get('$http');
    var ItemCollection = $injector.get('ItemCollection');
    collection = new ItemCollection;
  }));

  // begin tests

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

    it('adds cheatsheetId to created models', function () {
      collection.cheatsheetId = 1;

      collection.add([
        { id: 1, name: 'asdf' },
        { id: 2, name: 'qwer' }
      ]);

      var model = collection[0];
      expect(model.cheatsheetId).toEqual(1)
    });
  });

  describe('#create()', function () {
    describe('when cheatsheetId present', function () {
      beforeEach(function () {
        collection.cheatsheetId = 1;
      })

      it('returns new _Item_ object', function () {
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

    describe('when cheatsheetId missing', function () {
      it('throws an error', function () {
        expect(collection.create).toThrow();
      });
    });
  });

  describe('#remove()', function () {
    var cheatsheet;
    beforeEach(function () {
      cheatsheet = { name: 'zxcv' };
      collection.add([
        { id: 1, name: 'asdf' },
        { id: 2, name: 'qwer' },
        cheatsheet
      ]);
    });

    it('removes item from collection by id attribute', function () {
      collection.remove({ id: 1, name: 'asdf' });
      expect(collection).not.toEqual(jasmine.arrayContaining([
        { id: 1, name: 'asdf' }
      ]));
    });

    it('removes item from collection by object equivalence', function () {
      collection.remove(cheatsheet);
      expect(collection).not.toEqual(jasmine.arrayContaining([cheatsheet]));
    });

    it('calls destroy on removed item', function () {
      cheatsheet = collection[0];
      spyOn(cheatsheet, 'destroy');
      collection.remove({ id: 1, name: 'asdf' });
      expect(cheatsheet.destroy).toHaveBeenCalled();
    });
  })
});
