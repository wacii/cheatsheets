//= require spec_helper

describe('_Cheatsheet_', function () {
  var model;
  beforeEach(function () {
    // TODO: this shouldn't be instantiated directly
    model = new _Cheatsheet_;
    window.$http = jasmine.createSpyObj('$http', ['patch', 'post', 'delete']);
  });

  afterEach(function () {
    delete window.$http;
  });

  describe('#attributes', function () {
    it('gets models attributes', function () {
      model.name = 'asdf';
      expect(model.attributes).toEqual({ name: 'asdf' });
    })
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

describe('_CheatsheetCollection_', function () {
  var collection;
  beforeEach(function () {
    // TODO: this shouldn't be instantiated directly
    collection = new _CheatsheetCollection_;
    window.$http = jasmine.createSpyObj('$http', ['post'])
  });

  afterEach(function () {
    delete window.$http;
  });

  describe('#add()', function () {
    it('adds models', function () {
      expect(collection.length).toEqual(0);
      collection.add([
        { id: 1, name: 'asdf' },
        { id: 2, name: 'qwer' }
      ]);
      expect(collection.length).toEqual(2);

      var model = collection[0];
      expect(model.name).toEqual('asdf');
    })
  });

  describe('#create()', function () {
    it('returns new _Cheatsheet_ object', function () {
      var value = collection.create({ name: 'asdf' });
      expect(value.name).toEqual('asdf');
      expect(value.save).not.toBeUndefined();
    });

    it('saves created object', function () {
      collection.create({ name: 'asdf' });
      expect($http.post).toHaveBeenCalled();
    });

    it('pushes object', function () {
      spyOn(collection, 'push');
      collection.create({ name: 'asdf' });
      expect(collection.push).toHaveBeenCalled();
    });
  });
});
