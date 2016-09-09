export default function({CHANGE}) {
    return {
        change(model) {
            return {
                type: CHANGE,
                data: model.toJSON()
            };
        }
    };
}
