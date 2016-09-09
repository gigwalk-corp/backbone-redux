export default function({CHANGE, RESET}) {
    return (state = {}, action) => {
        switch (action.type) {
            case CHANGE:
                return {...state, ...action.data};

            case RESET:
                return {...state, ...action.data};

            default:
                return state;
        }
    };
}
