import { combineReducers } from "redux";
import trueOrFalseStore from "./trueOrFalseStore.js";
import loginStore from "./loginStore.js";
import onEditStore from "./onEdit.js";
import roomStore from "./roomStore.js";
import onJoinChatStore from "./onJoinChatStore.js";
import userStore from "./userStore.js";

const storeStates = combineReducers({
    trueOrFalseState: trueOrFalseStore,
    loginState: loginStore,
    onEditState: onEditStore,
    onRoomState: roomStore,
    onUserState: userStore,
    onJoinChatState: onJoinChatStore,
})

export default storeStates