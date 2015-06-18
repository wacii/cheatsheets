//= require spec_helper

describe('ItemModel', function () {
  beforeEach(angular.mock.module('app.services'))

  beforeEach(function () {
    angular.mock.module({
      $http: jasmine.createSpyObj('$http', ['patch', 'post', 'delete'])
    });
  });

  var $http
  var model;
  beforeEach(inject(function ($injector) {
    $http = $injector.get('$http');
    var ItemModel = $injector.get('ItemModel');
    model = new ItemModel;
  }))

  describe('#attributes', function () {
    it('gets models attributes', function () {
      model.name = 'asdf';
      model.description = 'qwer'
      model.garbage = 'zxcv'
      expect(model.attributes).toEqual(jasmine.objectContaining({
        name: 'asdf'
      }));
      expect(model.attributes).toEqual(jasmine.objectContaining({
        description: 'qwer'
      }));
      expect(model.attributes).not.toEqual(jasmine.objectContaining({
        garbage: 'zxcv'
      }));
    });
  });

  describe('#save()', function () {
    describe('when persisted', function () {
      it('sends a patch request', function () {
        model.id = 1;
        model.save()
        expect($http.patch).toHaveBeenCalledWith(
          '/items/1',
          jasmine.any(Object)
        );
      });
    });

    describe('when new', function () {
      it('throws an error without cheatsheet id', function () {
        expect(model.save).toThrow()
      });

      it('sends a post request', function () {
        model.cheatsheetId = 1
        model.save()
        expect($http.post).toHaveBeenCalledWith(
          '/cheatsheets/1/items',
          jasmine.any(Object)
        );
      });
    });
  });

  describe('#update()', function () {
    it('is a convenience method for set and save', function () {
      spyOn(model, 'set');
      spyOn(model, 'save');

      model.update();

      expect(model.set).toHaveBeenCalled();
      expect(model.save).toHaveBeenCalled();
    });
  });

  describe('#destroy()', function () {
    it('sends a delete request', function () {
      model.id = 1
      model.destroy()
      expect($http.delete).toHaveBeenCalledWith('/items/1');
    });
  });

  describe('#set()', function () {
    it('sets attributes', function () {
      expect(model.name).toEqual('');
      model.set({ name: 'asdf' })
      expect(model.name).toEqual('asdf');
    });

    it('does not save changes', function () {
      spyOn(model, 'save');
      model.set();
      expect(model.save).not.toHaveBeenCalled();
    });
  });
});
