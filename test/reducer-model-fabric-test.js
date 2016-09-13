import test from 'tape';
import reducerModelFabric from '../src/reducer-model-fabric';

test('Building reducers', t => {
  const CHANGE = 'CHANGE';
  const constants = { CHANGE };

  t.test('with default state', t => {
    const reducer = reducerModelFabric(constants);

    t.test('with null action', t => {
      const action = {type: null};
      t.deepEqual(reducer(undefined, action), {});
      t.end();
    });

    t.test('with change action', t => {
      const action = { type: CHANGE, data: { id: 1 } };
      t.deepEqual(reducer(undefined, action), { id: 1 });
      t.end();
    });

    t.end();
  });

  t.end();
});

