//= require spec_helper

describe('CoreController', function () {
  beforeEach(angular.mock.module('app.core'));

  var $rootScope;
  var controller;
  beforeEach(inject(function ($injector) {
    $rootScope = $injector.get('$rootScope');

    var $controller = $injector.get('$controller');
    controller = $controller('CoreController');
  }));

  // begin tests

  it('defines message as blank string', function () {
    expect(controller.message).toEqual('');
  });

  it('responds to unauthorized event by updating message', function () {
    $rootScope.$emit('unauthorized');
    expect(controller.message).not.toEqual('');
  });

  it('responds to serverError event by updating message', function () {
    $rootScope.$emit('serverError', 401);
    expect(controller.message).not.toEqual('');
  });

  it('responds to $routeChangeError event by updating message', function () {
    $rootScope.$emit('$routeChangeError');
    expect(controller.message).not.toEqual('');
  })
});
