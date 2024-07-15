const ROOM_GET = "ROOM_GET";
const ROOM_STORE = "ROOM_STORE";
const ROOM_EDIT = "ROOM_EDIT"
const ROOM_DELETE = "ROOM_DELETE"
const SET_JOINED_ROOM = "SET_JOINED_ROOM"
const SET_NEW_USERNAME = "SET_NEW_USERNAME"

export const onRoomInit = (data) => {
    return {
        type: ROOM_GET,
        payload: data,
    };
};

export const onRoomStore = (data) => {
    return {
        type: ROOM_STORE,
        payload: data,
    };
};

export const onRoomEdit = (data) => {
    return {
        type: ROOM_EDIT,
        payload: data,
    };
};

export const onRoomDelete = (id) => {
    return {
        type: ROOM_DELETE,
        payload: id,
    };
};


export const setJoinRoom = (room_id, room_name) => {
    return {
        type: SET_JOINED_ROOM,
        data: { id: room_id, name: room_name }
    }
}

export const setNewUsername = (username) => {
    return {
        type: SET_NEW_USERNAME,
        data: username
    }
}

const initialState = {
    current_room: null,
    rooms: [],
    last_room_joined: "",
    username_in_chat: "",
};

function roomStore(state = initialState, action) {
    switch (action.type) {
        case ROOM_GET:
            return {
                ...state,
                rooms: action.payload,
            };

        case ROOM_STORE:
            return {
                ...state,
                rooms: [action.payload, ...state.rooms],
            };

        case ROOM_EDIT:
            return {
                ...state,
                rooms: state.rooms.map((room) =>
                    room._id === action.payload._id ? action.payload : room
                ),
            };

        case ROOM_DELETE:
            return {
                ...state,
                rooms: state.rooms.filter((room) => room._id !== action.payload),
            };

        case SET_JOINED_ROOM:
            return {
                ...state,
                current_room: { ...state.current_room, id: action.data.id, name: action.data.name }
            };

        case SET_NEW_USERNAME:
            return {
                ...state,
                username_in_chat: action.data
            };

        default:
            return state;
    }
}

export default roomStore;
