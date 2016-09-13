import test from 'tape';
import { createStore } from 'redux';
import earModelFabric from '../src/ear-model-fabric';
import actionModelFabric from '../src/action-model-fabric';
import Backbone from 'backbone';

test('Testing listeners on model events', t => {
  t.test('with default state ano no index map', t => {
    const Model = Backbone.Model.extend({
      defaults: {
        property: 'abc'
      }
    });
    const model = new Model();
    const store = createStore(() => {});

    const rawActions = actionModelFabric({ CHANGE: 'CHANGE_MODEL' });

    t.test('model should have a change listener', t => {
      earModelFabric(model, rawActions, store.dispatch);

      t.deepEqual(model._events.change.length, 1);
      t.end();
    });

    t.test('change listener should be cleared when the ear are called with the same model', t => {
      earModelFabric(model, rawActions, store.dispatch);
      earModelFabric(model, rawActions, store.dispatch);

      t.deepEqual(model._events.change.length, 1);
      t.end();
    });

    t.end();
  });

  t.end();
});
