export const ON_FOCUS_INPUT = "ON_FOCUS_INPUT";
export const ON_BLUR_INPUT = "ON_BLUR_INPUT";
export const ON_SET_USERNAME = "ON_SET_USERNAME";
export const ON_ERROR_INPUT = "ON_ERROR_INPUT";

export const onFocusInput = () => ({
    type: ON_FOCUS_INPUT,
});

export const onBlurInput = () => ({
    type: ON_BLUR_INPUT,
});

export const onSetUsername = (username) => ({
    type: ON_SET_USERNAME,
    payload: username,
});

export const onErrorJoinChat = (error) => ({
    type: ON_ERROR_INPUT,
    data: error,
});


const initialState = {
    onFocus: false,
    onBlur: false,
    error: "",
    username: null,
};

const usernameStore = (state = initialState, action) => {
    switch (action.type) {
        case ON_FOCUS_INPUT:
            return {
                ...state,
                onFocus: true,
                onBlur: false,
            };
        case ON_ERROR_INPUT:
            return {
                ...state,
                error: action.data,
            };
        case ON_BLUR_INPUT:
            return {
                ...state,
                onFocus: false,
                onBlur: true,
            };
        case ON_SET_USERNAME:
            return {
                ...state,
                username: action.payload,
            };
        default:
            return state;
    }
};

export default usernameStore;