import actionModelFabric from './action-model-fabric';
import reducerModelFabric from './reducer-model-fabric';
import earModelFabric from './ear-model-fabric';

import { combineReducers } from 'redux';

function buildConstants(modelName) {
    const uppercasedModelName = modelName.toUpperCase();

    return {
        CHANGE: `CHANGE_${uppercasedModelName}`,
        RESET: `RESET_${uppercasedModelName}`
    };
}

export function buildModelReducers(modelsMap) {
    return Object.keys(modelsMap).reduce((collector, modelName) => {
        const indexMap = modelsMap[modelName].cid;
        console.log(collector, modelName, indexMap);
        collector[modelName] = reducerModelFabric(buildConstants(modelName), indexMap);
        return collector;
    }, {});
}

export function buildModelEars(modelsMap, { dispatch }) {
    Object.keys(modelsMap).forEach(modelName => {
        const rawActions = actionModelFabric(buildConstants(modelName));
        earModelFabric(modelsMap[modelName], rawActions, dispatch);
    });
}

export function syncModels(modelsMap, store, extraReducers = {}) {
    console.log('backbone-redux: syncModels', modelsMap, store);
    const reducers = buildModelReducers(modelsMap);
    store.replaceReducer(combineReducers({...reducers, ...extraReducers}));
    buildModelEars(modelsMap, store);
}
