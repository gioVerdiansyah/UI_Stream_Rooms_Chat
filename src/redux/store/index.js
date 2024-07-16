import { combineReducers } from "redux";
import trueOrFalseStore from "./trueOrFalseStore.js";
import loginStore from "./loginStore.js";
import onEditStore from "./onEdit.js";
import roomStore from "./roomStore.js";
import userStore from "./userStore.js";
import usernameStore from "./usernameStore.js";
import chatStore from "./chatStore.js";
import timeStore from "./timeStore.js";
import adminLogStore from "./adminLogStore.js";

const storeStates = combineReducers({
    trueOrFalseState: trueOrFalseStore,
    loginState: loginStore,
    onEditState: onEditStore,
    onRoomState: roomStore,
    onUserState: userStore,
    usernameState: usernameStore,
    chatState: chatStore,
    timeState: timeStore,
    adminLogState: adminLogStore
})

export default storeStates