import test from 'tape';
import Backbone from 'backbone';
import { createStore } from 'redux';
import { syncModels } from '../src/model-tools';

test('Syncing models', t => {
  t.test('default values', t => {
    const Model = Backbone.Model.extend({
        defaults: {
            property: 'abc'
        }
    });
    const model = new Model();
    const store = createStore(() => {});
    syncModels({ test: model }, store);

    // initial state
    t.deepEqual(store.getState(), { test: { property: 'abc' } });

    // update model
    model.set({ updated: true });

    t.deepEqual(store.getState(), { test: { property: 'abc', updated: true } });

    // update model
    model.clear().set(model.defaults);

    t.deepEqual(store.getState(), { test: { property: 'abc' } });

    t.end();
  });

  t.test('extra reducers', t => {
    const Model = Backbone.Model.extend({
      defaults: {
        property: 'abc'
      }
    });
    const model = new Model();
    const store = createStore(() => {});
    const extraReducer = (state = {}) => state;

    syncModels({ test: model }, store, { some_extra_branch: extraReducer });

    t.deepEqual(store.getState(), { test: { property: 'abc' }, some_extra_branch: {} });
    t.end();
  });

  t.end();
});
