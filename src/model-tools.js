import reduceReducers from 'reduce-reducers';
import { combineReducers } from 'redux';

import actionModelFabric from './action-model-fabric';
import reducerModelFabric from './reducer-model-fabric';
import earModelFabric from './ear-model-fabric';

function buildConstants(modelName) {
    const uppercasedModelName = modelName.toUpperCase();

    return {
        CHANGE: `CHANGE_${uppercasedModelName}`
    };
}

export function buildModelReducers(modelsMap) {
    return Object.keys(modelsMap).reduce((collector, modelName) => {
        collector[modelName] = reducerModelFabric(buildConstants(modelName));
        return collector;
    }, {});
}

export function buildModelEars(modelsMap, { dispatch }) {
    Object.keys(modelsMap).forEach(modelName => {
        const rawActions = actionModelFabric(buildConstants(modelName));
        earModelFabric(modelsMap[modelName], rawActions, dispatch);
    });
}

export function syncModels(modelsMap, store, allReducers = {}, extraReducers = []) {
    const reducers = buildModelReducers(modelsMap);
    store.replaceReducer(reduceReducers(combineReducers({ ...reducers, ...allReducers }), ...extraReducers));
    buildModelEars(modelsMap, store);
}
