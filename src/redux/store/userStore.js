const USER_GET = "USER_GET";
const USER_STORE = "USER_STORE";
const USER_EDIT = "USER_EDIT"
const USER_DELETE = "USER_DELETE"

export const onUserInit = (data) => {
    return {
        type: USER_GET,
        payload: data,
    };
};

export const onUserStore = (data) => {
    return {
        type: USER_STORE,
        payload: data,
    };
};

export const onUserEdit = (data) => {
    return {
        type: USER_EDIT,
        payload: data,
    };
};

export const onUserDelete = (id) => {
    return {
        type: USER_DELETE,
        payload: id,
    };
};


const initialState = {
    users: [],
};

function userStore(state = initialState, action) {
    switch (action.type) {
        case USER_GET:
            return {
                ...state,
                users: action.payload,
            };

        case USER_STORE:
            return {
                ...state,
                users: [action.payload, ...state.users],
            };

        case USER_EDIT:
            return {
                ...state,
                users: state.users.map((room) =>
                    room._id === action.payload._id ? action.payload : room
                ),
            };

        case USER_DELETE:
            return {
                ...state,
                users: state.users.filter((room) => room._id !== action.payload),
            };

        default:
            return state;
    }
}

export default userStore;
