export default function({CHANGE, RESET}, modelName) {
    return (state = {}, action) => {
        const modelJSON = {
            [modelName]: action.data
        };

        switch (action.type) {
            case CHANGE:
                console.log('CHANGE', {...state, ...modelJSON});
                return {...state, ...modelJSON};

            case RESET:
                console.log('RESET', {...state, ...modelJSON});
                return {...state, ...modelJSON};

            default:
                return state;
        }
    };
}
