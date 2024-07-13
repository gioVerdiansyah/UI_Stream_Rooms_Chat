const ROOM_GET = "ROOM_GET";
const ROOM_STORE = "ROOM_STORE";
const ROOM_EDIT = "ROOM_EDIT"
const ROOM_DELETE = "ROOM_DELETE"

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


const initialState = {
    rooms: [],
};

function roomStore(state = initialState, action) {
    switch (action.type) {
        case ROOM_GET:
            console.log(action.payload)
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

        default:
            return state;
    }
}

export default roomStore;
