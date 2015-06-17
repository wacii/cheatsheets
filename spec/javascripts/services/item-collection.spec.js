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
});
