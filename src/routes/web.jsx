import AdminChatRoomDashboard from "../views/AdminChatRoomDashboard"
import Chatting from "../views/Chatting"
import Login from "../views/Login"
import WelcomeUser from "../views/WelcomeUser"

const webPath = {
    // user
    welcomeUser: "/",
    chatting: "/user/chatting",
    // admin
    login: "/admin/login",
    dashboard: "/admin/dashboard",
}

const routes = [
    {path: webPath.welcomeUser, content: <WelcomeUser/>},
    {path: webPath.login, content: <Login/>},
    {path: webPath.dashboard, content: <AdminChatRoomDashboard/>},
    {path: webPath.chatting, content: <Chatting/>},
]

export {
    webPath,
    routes
}