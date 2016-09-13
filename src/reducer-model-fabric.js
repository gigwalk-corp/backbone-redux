export default function({ CHANGE }) {
    return (state = {}, action) => {
        switch (action.type) {
            case CHANGE:
                return { ...action.data };

            default:
                return state;
        }
    };
}
