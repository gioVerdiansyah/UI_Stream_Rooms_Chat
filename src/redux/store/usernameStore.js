export const ON_FOCUS_INPUT = "ON_FOCUS_INPUT";
export const ON_BLUR_INPUT = "ON_BLUR_INPUT";
export const ON_SET_FIELDS = "ON_SET_FIELDS";
export const ON_UNSET_FIELDS = "ON_UNSET_FIELDS";
export const ON_ERROR_INPUT = "ON_ERROR_INPUT";

export const onFocusInput = () => ({
    type: ON_FOCUS_INPUT,
});

export const onBlurInput = () => ({
    type: ON_BLUR_INPUT,
});

export const onSetFieldsLoginRegister = (data) => ({
    type: ON_SET_FIELDS,
    payload: data,
});

export const onErrorJoinChat = (error) => ({
    type: ON_ERROR_INPUT,
    data: error,
});

export const onUnSetFields = () => ({
    type: ON_UNSET_FIELDS
});


const initialState = {
    onFocus: false,
    onBlur: false,
    error: "",
    fields: {
        username: null,
        password: null,
    }
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
        case ON_SET_FIELDS:
            return {
                ...state,
                fields: {
                    ...state.fields,
                    ...action.payload
                }
            };
        case ON_UNSET_FIELDS:
            return {
                ...state,
                fields: {
                    username: null,
                    password: null
                }
            };
        default:
            return state;
    }
};

export default usernameStore;