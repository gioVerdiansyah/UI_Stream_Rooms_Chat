import { combineReducers } from "redux";
import trueOrFalseStore from "./trueOrFalseStore.js";
import loginStore from "./loginStore.js";
import onEditStore from "./onEdit.js";

const storeStates = combineReducers({
    trueOrFalseState: trueOrFalseStore,
    loginState: loginStore,
    onEditState: onEditStore,
})

export default storeStates