//= require spec_helper

describe('broadcastError interceptor', function () {
  beforeEach(angular.mock.module('app.core'));

  beforeEach(function () {
    angular.mock.module({
      $q: jasmine.createSpyObj('$q', ['reject']),
      $rootScope: jasmine.createSpyObj('$rootScope', ['$emit'])
    });
  });

  var $q;
  var $rootScope;
  var interceptor;
  beforeEach(inject(function ($injector) {
    $q = $injector.get('$q');
    $rootScope = $injector.get('$rootScope');
    interceptor = $injector.get('broadcastErrors');
  }));

  // begin tests

  it('returns a responseError handler', function () {
    var value = interceptor.responseError;
    expect(typeof value).toBe('function');
  });

  describe('responseError handler', function () {
    var handler;
    beforeEach(function () {
      handler = interceptor.responseError;
    });

    it('emits an unauthorized event when status code is 403', function () {
      var rejection = { status: 403 };
      handler(rejection);
      expect($rootScope.$emit).toHaveBeenCalledWith('unauthorized');
    });

    it('emits a serverError event when status code is 5xx', function () {
      var rejection = { status: 500 };
      handler(rejection);
      expect($rootScope.$emit).toHaveBeenCalledWith('serverError', 500);
    });

    it('passes rejection to next interceptor', function () {
      var rejection = {};
      handler(rejection);
      expect($q.reject).toHaveBeenCalledWith(rejection);
    });
  });
});
