const SET_LOG = "SET_LOG"
const RESET_LOG = "RESET_LOG"

export function setLog(log) {
    return {
        type: SET_LOG,
        text: log
    }
}

export function resetLog() {
    return {
        type: RESET_LOG
    }
}

const initialState = []

function adminLogStore(state = initialState, action) {
    switch (action.type) {
        case SET_LOG:
            return [...state.slice(0, 49), action.text]
        case RESET_LOG:
            return []
        default:
            return state;
    }
}

export default adminLogStore;
