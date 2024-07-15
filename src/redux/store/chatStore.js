const CHAT_GET = "CHAT_GET";
const CHAT_STORE = "CHAT_STORE";
const CHAT_EDIT = "CHAT_EDIT"
const CHAT_DELETE = "CHAT_DELETE"
const CHAT_RESET = "CHAT_RESET"

export const onChatInit = (data) => {
    return {
        type: CHAT_GET,
        payload: data,
    };
};

export const onChatStore = (data) => {
    return {
        type: CHAT_STORE,
        payload: data,
    };
};

export const onChatEdit = (data) => {
    return {
        type: CHAT_EDIT,
        payload: data,
    };
};

export const onChatDelete = (id) => {
    return {
        type: CHAT_DELETE,
        payload: id,
    };
};

export const resetChat = () => {
    return {
        type: CHAT_DELETE
    };
};

const initialState = {
    chats: [],
};

function chatStore(state = initialState, action) {
    switch (action.type) {
        case CHAT_GET:
            return {
                ...state,
                chats: action.payload,
            };

        case CHAT_STORE:
            return {
                ...state,
                chats: [...state.chats, action.payload],
            };

        case CHAT_EDIT:
            return {
                ...state,
                chats: state.chats.map((chat) =>
                    chat._id === action.payload._id ? action.payload : chat
                ),
            };

        case CHAT_DELETE:
            return {
                ...state,
                chats: state.chats.filter((chat) => chat._id !== action.payload),
            };

        case CHAT_RESET:
            return {
                chats: initialState.chats
            };

        default:
            return state;
    }
}

export default chatStore;
