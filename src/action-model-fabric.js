export default function({CHANGE, RESET}) {
    return {
        change(model) {
            return {
                type: CHANGE,
                data: model.toJSON()
            };
        },

        reset(model) {
            return {
                type: RESET,
                data: model.toJSON()
            };
        }
    };
}
