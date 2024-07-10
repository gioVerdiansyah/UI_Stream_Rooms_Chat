import AdminChatRoomDashboard from "../views/AdminChatRoomDashboard"
import Login from "../views/Login"

const webPath = {
    login: "/admin/login",
    dashboard: "/admin/dashboard"
}

const routes = [
    {path: webPath.login, content: <Login/>},
    {path: webPath.dashboard, content: <AdminChatRoomDashboard/>},
]

export {
    webPath,
    routes
}