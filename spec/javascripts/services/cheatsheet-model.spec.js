//= require spec_helper

describe('CheatsheetModel', function () {
  beforeEach(angular.mock.module('app.services'))

  var $http;
  beforeEach(function () {
    $http = jasmine.createSpyObj('$http', ['patch', 'post', 'delete'])
    angular.mock.module({
      $http: $http
    });
  });

  var CheatsheetModel;
  var model;
  beforeEach(inject(function (_CheatsheetModel_) {
    CheatsheetModel = _CheatsheetModel_;
    model = new CheatsheetModel;
  }))

  describe('#attributes', function () {
    it('gets models attributes', function () {
      model.title = 'asdf';
      expect(model.attributes).toEqual(jasmine.objectContaining({
        title: 'asdf'
      }));
    });
  });

  describe('#save()', function () {
    describe('when persisted', function () {
      it('sends a patch request', function () {
        model.id = 1;
        model.save()
        expect($http.patch).toHaveBeenCalledWith(
          '/cheatsheets/1',
          jasmine.any(Object)
        );
      });
    });

    describe('when new', function () {
      it('sends a post request', function () {
        model.save()
        expect($http.post).toHaveBeenCalledWith(
          '/cheatsheets',
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
      expect($http.delete).toHaveBeenCalledWith('/cheatsheets/1');
    });
  });

  describe('#set()', function () {
    it('sets attributes', function () {
      expect(model.title).toEqual('');
      model.set({ title: 'asdf' })
      expect(model.title).toEqual('asdf');
    });

    it('does not save changes', function () {
      spyOn(model, 'save');
      model.set();
      expect(model.save).not.toHaveBeenCalled();
    });
  });
});
