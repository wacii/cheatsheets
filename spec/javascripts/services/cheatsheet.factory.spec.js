//= require spec_helper

describe('Cheatsheet factory', function () {
  beforeEach(angular.mock.module('app.services'));

  var $http;
  beforeEach(function () {
    $http = jasmine.createSpyObj('$http', ['get']);

    var xhr = jasmine.createSpyObj('xhr', ['done', 'fail']);
    xhr.done.and.returnValue(xhr);
    xhr.fail.and.returnValue(xhr);

    $http.get.and.returnValue(xhr);

    angular.mock.module({
      $http: $http
    });
  })

  var factory;
  beforeEach(inject(function (Cheatsheet) {
    factory = Cheatsheet;
  }));

  describe('#all()', function () {
    it('immediately returns a cheatsheet collection', function () {
      value = factory.all();
      expect(value.length).toEqual(0);
      expect(value.create).not.toBeUndefined();
    });

    it('makes a get request for all cheatsheets', function () {
      factory.all();
      expect($http.get).toHaveBeenCalledWith('/cheatsheets');
    });
  });

  describe('#find()', function () {
    it('immediately returns a cheatsheet model', function () {
      value = factory.find(1);
      expect(value.name).toEqual('');
      expect(value.save).not.toBeUndefined();
    });

    it('makes a get request for specified cheatsheet', function () {
      factory.find(1);
      expect($http.get).toHaveBeenCalledWith('/cheatsheets/1');
    })
  });

  describe('#search()', function () {
    it('immediately returns a cheatsheet collection', function () {
      value = factory.search('asdf');
      expect(value.length).toEqual(0);
      expect(value.create).not.toBeUndefined();
    });

    it('makes a get request for all cheatsheets', function () {
      factory.search('asdf');
      expect($http.get).toHaveBeenCalledWith('/cheatsheets?s=asdf');
    });
  })
});
