const ON_EDIT = "ON_EDIT";
const RESET_EDIT = "RESET_EDIT";

export function on_edit(data) {
    return {
        type: ON_EDIT,
        payload: data,
    };
}

export function reset_edit() {
    return {
        type: RESET_EDIT,
    };
}

const initialState = {
    onEdit: false,
    data: {}
}

function onEditStore(state = initialState, action) {
    switch (action.type) {
        case ON_EDIT:
            return {
                ...state,
                onEdit: action.payload.onEdit,
                data: action.payload.data,
            };
        case RESET_EDIT:
            return initialState;
        default:
            return state;
    }
}

export default onEditStore;
