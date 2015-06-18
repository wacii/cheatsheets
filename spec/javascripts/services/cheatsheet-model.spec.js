//= require spec_helper

describe('CheatsheetModel', function () {
  beforeEach(angular.mock.module('app.services'))

  beforeEach(function () {
    angular.mock.module({
      $http: jasmine.createSpyObj('$http', ['patch', 'post', 'delete']),
      ItemCollection: jasmine.createSpy('ItemCollection', [])
    });
  });

  var $http
  var ItemCollection;
  var model;
  beforeEach(inject(function ($injector) {
    $http = $injector.get('$http');
    ItemCollection = $injector.get('ItemCollection');

    var CheatsheetModel = $injector.get('CheatsheetModel');
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
        model.title = 'asdf'
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
        model.title = 'asdf'
        model.save()
        expect($http.post).toHaveBeenCalledWith(
          '/cheatsheets',
          jasmine.any(Object)
        );
      });
    });

    it('escapes when title not set', function () {
      model.title = '';
      model.save();

      model.title = undefined;
      model.save();

      expect($http.post).not.toHaveBeenCalled()
      expect($http.patch).not.toHaveBeenCalled()
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

    it('wraps items in ItemCollection', function () {
      var items = [];
      ItemCollection.and.returnValue(items);
      model.set({ items: [{ name: 'asdf' }] });
      expect(model.items).toEqual(items);
    });

    it('sets cheatsheetId on ItemCollection', function () {
      var items = [];
      ItemCollection.and.returnValue(items);
      model.set();
      expect(model.items.cheatsheetId).toEqual(model.id);
    });

    it('does not save changes', function () {
      spyOn(model, 'save');
      model.set();
      expect(model.save).not.toHaveBeenCalled();
    });
  });
});
