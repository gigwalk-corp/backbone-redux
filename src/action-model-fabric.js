export default function({CHANGE, RESET}) {
    return {
        change(model, modelName) {
            return {
                type: CHANGE,
                data: model.toJSON(),
                key: modelName
            };
        },

        reset(model, modelName) {
            return {
                type: RESET,
                data: model.toJSON(),
                key: modelName
            };
        }
    };
}
