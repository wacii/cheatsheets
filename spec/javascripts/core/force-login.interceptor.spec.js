//= require spec_helper

describe('forceLogin interceptor', function () {
  beforeEach(angular.mock.module('app.core'));

  beforeEach(function () {
    angular.mock.module({
      $q: jasmine.createSpyObj('$q', ['reject']),
      $location: jasmine.createSpyObj('$location', ['path'])
    });
  });

  var $q;
  var $location;
  var interceptor;
  beforeEach(inject(function ($injector) {
    $q = $injector.get('$q');
    $location = $injector.get('$location');
    interceptor = $injector.get('forceLogin');
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

    it('redirects to login on 401', function () {
      var rejection = { status: 401 };
      handler(rejection);
      expect($location.path).toHaveBeenCalledWith('/users/sign_in');
    });

    it('passes rejection to next interceptor', function () {
      var rejection = {};
      handler(rejection);
      expect($q.reject).toHaveBeenCalledWith(rejection);
    });
  });
});
