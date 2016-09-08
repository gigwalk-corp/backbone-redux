import actionFabric from './action-fabric';
import reducerFabric from './reducer-fabric';
import earFabric from './ear-fabric';

import { combineReducers } from 'redux';

function buildConstants(collectionName) {
    const uppercasedCollectionName = collectionName.toUpperCase();

    return {
        ADD: `ADD_${uppercasedCollectionName}`,
        REMOVE: `REMOVE_${uppercasedCollectionName}`,
        MERGE: `MERGE_${uppercasedCollectionName}`,
        RESET: `RESET_${uppercasedCollectionName}`
    };
}

function getIndex(indexesMap) {
    return indexesMap || {fields: {by_id: 'id'}};
}

function getSerializer({serializer}) {
    const defaultSerializer = model => ({...model.toJSON(), __optimistic_id: model.cid});
    return serializer || defaultSerializer;
}

function getCollection(collectionValue) {
    return collectionValue.collection || collectionValue;
}

export function buildReducers(collectionsMap) {
    return Object.keys(collectionsMap).reduce((collector, collectionName) => {
        const indexMap = getIndex(collectionsMap[collectionName].indexes_map);
        collector[collectionName] = reducerFabric(buildConstants(collectionName), indexMap);
        return collector;
    }, {});
}

export function buildEars(collectionsMap, {dispatch}) {
    Object.keys(collectionsMap).forEach(collectionName => {
        const serializer = getSerializer(collectionsMap[collectionName]);
        const rawActions = actionFabric(buildConstants(collectionName), serializer);
        earFabric(getCollection(collectionsMap[collectionName]), rawActions, dispatch);
    });
}

export function syncModels(modelsMap, store, extraReducers = {}) {
    console.log('backbone-redux: syncModels', modelsMap, store);
    store.replaceReducer(combineReducers({...extraReducers}));
}

export function syncCollections(collectionsMap, store, extraReducers = {}) {
    console.log('backbone-redux: syncCollections', collectionsMap, store);
    const reducers = buildReducers(collectionsMap);
    store.replaceReducer(combineReducers({...reducers, ...extraReducers}));
    buildEars(collectionsMap, store);
}

export function syncCollection() {
    if (console && console.log) {
        console.log('backbone-redux: syncCollection is deprecated, use syncCollections instead');
    }

    syncCollections.apply(this, arguments);
}

