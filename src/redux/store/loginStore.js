const CHANGE_LOGIN_STATUS = 'CHANGE_LOGIN_STATUS'
const SET_STATE_LOGIN_FIELDS = "SET_STATE_LOGIN_FIELDS"
const RESET_STATE = "RESET_STATE"

export function changeLoginStatus(status) {
    return {
        type: CHANGE_LOGIN_STATUS,
        status
    }
}

export function resetLoginState(status) {
    return {
        type: RESET_STATE,
        status: status
    }
}

export function setLoginDataInput(data) {
    return {
        type: SET_STATE_LOGIN_FIELDS,
        data
    }
}

let loginStatusState = false
const dataFields = {
    username: "",
    password: ""
}

const initialState = {
    isLoggedIn: loginStatusState,
    fields: dataFields,
};

function loginStore(state = initialState, action) {
    switch (action.type) {
        case SET_STATE_LOGIN_FIELDS:
            return {
                ...state,
                fields: {
                    ...state.fields,
                    ...action.data,
                },
            };
        case CHANGE_LOGIN_STATUS:
            return {
                ...state,
                isLoggedIn: action.status,
            };

        case RESET_STATE:
            return {
                isLoggedIn: initialState.isLoggedIn,
                fields: initialState.fields,
            };
        default:
            return state;
    }
}

export default loginStore