// import {
//    addEntities,
//    removeEntities,
//    buildIndex,
//    buildRelation
// } from './reducer-tools';
//
// function buildInitialState({fields = {}, relations = {}}) {
//    const initIndex = (acc, index) => (acc[index] = {}, acc);
//
//    return {
//        entities: [],
//        ...Object.keys(fields).reduce(initIndex, {}),
//        ...Object.keys(relations).reduce(initIndex, {})
//    };
// }
//
// function buildIndexBuilder({fields = {}, relations = {}}) {
//    return (entities) => {
//        const fieldBuilder = (acc, indexName) => {
//            acc[indexName] = buildIndex(entities, fields[indexName]);
//            return acc;
//        };
//
//        const relationBuilder = (acc, indexName) => {
//            acc[indexName] = buildRelation(entities, relations[indexName]);
//            return acc;
//        };
//
//        return {
//            ...Object.keys(fields).reduce(fieldBuilder, {}),
//            ...Object.keys(relations).reduce(relationBuilder, {})
//        };
//    };
// }
//
// function collectIds(entity) {
//    return [entity.id, entity.__optimistic_id];
// }

export default function({CHANGE, RESET}) {
    // const initialState = buildInitialState(indexMap);
    // const indexBuilder = buildIndexBuilder(indexMap);

    return (state = {}, action) => {
        // let entities;
        // let indexes;

        switch (action.type) {
            case CHANGE:
                return {...state, ...action.data};

            case RESET:
                entities = addEntities({...initialState}.entities, action.entities);
                indexes = indexBuilder(entities);

                return {...initialState, entities, ...indexes};

            default:
                return state;
        }
    };
}
