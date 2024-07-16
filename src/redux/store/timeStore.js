import { getCurrentTime } from "../../utils/handleDates"

const SET_TIME = "SET_TIME"

export function setTime(time) {
    return {
        type: SET_TIME,
        time: time
    }
}

const initialState = {
    time: getCurrentTime()
}

function timeStore(state = initialState, action) {
    switch (action.type) {
        case SET_TIME:
            return {
                ...state,
                time: action.time
            }
        default:
            return state
    }
}

export default timeStore