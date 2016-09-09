import { bindActionCreators } from 'redux';

/**
 * @param {Object} actions
 * @param {Backbone.Model} model
 */
function handleChange(actions, model) {
    actions.change(model);
}

/**
 * Imports all models on the initial load
 *
 * @param {Object} actions
 * @param {Backbone.Model[]} models
 */
function initialSync(actions, model) {
    actions.change(model);
}

/**
 * Binds actions and partially applies handler events to these actions
 *
 * @param {Object} rawActions
 * @return {Object}
 */
function createHandlersWithActions(rawActions, dispatch) {
    const actions = bindActionCreators(rawActions, dispatch);

    return {
        initialSync: initialSync.bind(this, actions),
        handleChange: handleChange.bind(this, actions),
    };
}

/**
 * The ear itself
 * Listens on any event from the collection and updates The Big Tree
 *
 * @param {Backbone.Collection} collection
 * @param {Object} rawActions object with functions. They are not action creators yet.
 * @param {Function} dispatch
 */
export default function(model, rawActions, dispatch) {
    const handlers = createHandlersWithActions(rawActions, dispatch);

    handlers.initialSync(model);

    model.on('change', handlers.handleChange);
}
