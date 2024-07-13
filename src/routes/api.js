const url = import.meta.env.VITE_API_URL;

export const apiRoutes = {
    login: url + "admin/login",
    getRoom: url + "admin/room/get",
    getUser: url + "admin/user/get",
    addRoom: url + "admin/room/add",
    editRoom: url + "admin/room/edit",
    deleteRoom: url + "admin/room/delete",

    userLogin: url + "user/join"
}