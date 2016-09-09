export default function({CHANGE, RESET}) {
    return {
        change(model) {
            return {
                type: CHANGE,
                data: model.toJSON()
            };
        }
    };
}
