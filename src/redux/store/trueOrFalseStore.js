const IS_LOADING = "IS_LOADING"
const IS_SHOW_MODAL = "IS_SHOW_MODAL"

export function setLoading(bool){
    return {
        type: IS_LOADING,
        val: bool
    }
}

export function setShowModal(bool){
    return {
        type: IS_SHOW_MODAL,
        bool
    }
}

const initialState = {
    isLoading: false,
    isShowModal: false,
}

function trueOrFalseStore(state = initialState, action){
    switch(action.type){
        case IS_LOADING:
            return {
                ...state,
                isLoading: action.val
            }
        case IS_SHOW_MODAL:
            return {
                ...state,
                isShowModal: !state.isShowModal
            }
        default:
            return state
    }
}

export default trueOrFalseStore