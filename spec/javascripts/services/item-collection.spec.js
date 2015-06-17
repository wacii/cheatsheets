//= require spec_helper

describe('ItemCollection', function () {
  beforeEach(angular.mock.module('app.services'))

  var $http;
  beforeEach(function () {
    $http = jasmine.createSpyObj('$http', ['post'])
    angular.mock.module({
      $http: $http
    });
  });

  var ItemCollection;
  var collection;
  beforeEach(inject(function (_ItemCollection_) {
    ItemCollection = _ItemCollection_;
    collection = new ItemCollection;
  }));

  describe('#attributes', function () {
    it('returns items attributes as array', function () {
      expect(collection.attributes.length).toEqual(0);
      collection.add([
        { name: 'asdf', description: 'asdf' },
        { name: 'qwer', description: 'qwer' }
      ]);
      expect(collection.attributes.length).toEqual(2);
      expect(collection.attributes).toEqual(jasmine.arrayContaining(
        [{ name: 'asdf', description: 'asdf' }]
      ));
      expect(collection.attributes).toEqual(jasmine.arrayContaining(
        [{ name: 'qwer', description: 'qwer' }]
      ));
    });
  });
});
