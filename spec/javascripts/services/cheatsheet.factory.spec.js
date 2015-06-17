//= require spec_helper

describe('Cheatsheet factory', function () {
  beforeEach(angular.mock.module('app.services'));

  var $httpBackend;
  var factory;
  beforeEach(inject(function (_$httpBackend_, Cheatsheet) {
    $httpBackend = _$httpBackend_;
    factory = Cheatsheet;

    $httpBackend.whenGET('/cheatsheets').respond(200, [
      { id: 1, name: 'asdf' },
      { id: 2, name: 'qwer' }
    ]);
    $httpBackend.whenGET('/cheatsheets/1').respond(200,
      { id: 1, name: 'asdf' }
    );
    $httpBackend.whenGET('/cheatsheets?s=asdf').respond(200, [
      { id: 2, name: 'qwer' }
    ]);
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('#all()', function () {
    it('returns a promise resolving to a cheatsheet collection', function () {
      $httpBackend.expectGET('/cheatsheets');

      var xhr = factory.all();
      var value;
      xhr.then(function (data) {
        value = data;
      });

      $httpBackend.flush();
      expect(value).toEqual(
        jasmine.arrayContaining([new _Cheatsheet_({ id: 1, name: 'asdf' })])
      );
      expect(value).toEqual(
        jasmine.arrayContaining([new _Cheatsheet_({ id: 2, name: 'qwer' })])
      );
    });
  });

  describe('#find()', function () {
    it('returns a promise resolving to a cheatsheet model', function () {
      $httpBackend.expectGET('/cheatsheets/1');

      var xhr = factory.find(1);
      var value;
      xhr.then(function (data) {
        value = data;
      });

      $httpBackend.flush();
      expect(value.name).toEqual('asdf');
      expect(value.save).not.toBeUndefined();
    });
  });

  describe('#search()', function () {
    it('returns a promise resolving to a cheatsheet collection', function () {
      $httpBackend.expectGET('/cheatsheets?s=asdf')

      var xhr = factory.search('asdf');
      var value;
      xhr.then(function (data) {
        value = data;
      });

      $httpBackend.flush();
      expect(value).not.toEqual(
        jasmine.arrayContaining([new _Cheatsheet_({ id: 1, name: 'asdf' })])
      );
      expect(value).toEqual(
        jasmine.arrayContaining([new _Cheatsheet_({ id: 2, name: 'qwer' })])
      );
    });
  })
});
