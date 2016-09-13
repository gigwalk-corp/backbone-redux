import test from 'tape';
import actionModelFabric from '../src/action-model-fabric';

test('Building action creators', t => {
  const CHANGE = 'CHANGE';
  const constants = { CHANGE };
  const actionCreator = actionModelFabric(constants);

  t.test('returns action creator that works with single entities', t => {
    const entity = { toJSON: () => ({ id: 1 } )};

    t.deepEqual(actionCreator.change(entity), { type: CHANGE, data: { id: 1 } });

    t.end();
  });

  t.end();
});

