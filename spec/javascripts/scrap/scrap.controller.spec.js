//= require spec_helper

describe('ScrapController', function () {
  beforeEach(angular.mock.module('app.scrap'));

  var $controller;
  beforeEach(inject(function (_$controller_) {
    $controller = _$controller_;
  }));

  it('initializes name and body attributes', function () {
    var controller = $controller('ScrapController');

    expect(controller.name).not.toBeUndefined();
    expect(controller.body).not.toBeUndefined();
  });
});
