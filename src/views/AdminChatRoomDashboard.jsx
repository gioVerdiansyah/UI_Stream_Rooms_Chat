import { toast } from "react-toastify";
import fetcher from "../utils/fetcher";
import { apiRoutes } from "../routes/api";
import { useDispatch, useSelector } from "react-redux";
import { on_edit, reset_edit } from "../redux/store/onEdit";
import { useContext, useEffect, useRef } from "react";
import {
  onRoomDelete,
  onRoomEdit,
  onRoomInit,
  onRoomStore,
} from "../redux/store/roomStore";
import { io } from "socket.io-client";
import NavbarAdmin from "./components/fragments/NavbarAdmin";
import { AuthMidContext } from "../AuthMidContext";
import { useNavigate } from "react-router-dom";
import { webPath } from "../routes/web";
import {
  onUserDelete,
  onUserEdit,
  onUserInit,
  onUserStore,
} from "../redux/store/userStore";

const socket = io(import.meta.env.VITE_WEBSOCKET_URL, {
  extraHeaders: {
    "x-socket-key": import.meta.env.VITE_API_KEY,
  },
});

export default function AdminChatRoomDashboard() {
  const dispatch = useDispatch();
  const onEdit = useSelector((state) => state.onEditState);
  const rooms = useSelector((state) => state.onRoomState).rooms;
  const users = useSelector((state) => state.onUserState).users;
  const { logoutUser } = useContext(AuthMidContext);
  const navigate = useNavigate();

  const handleOnEdit = (id, name) => {
    dispatch(on_edit({ onEdit: true, data: { id: id, room_name: name } }));
  };

  const handleRoom = async (e) => {
    e.preventDefault();
    const room_name = e.target.room_name.value;
    const res = await fetcher(
      onEdit.onEdit ? apiRoutes.editRoom : apiRoutes.addRoom,
      {
        method: onEdit.onEdit ? "PUT" : "POST",
        body: !onEdit.onEdit
          ? JSON.stringify({ room_name: room_name })
          : JSON.stringify({
              data: { id: onEdit.data.id, name: room_name },
            }),
      }
    );

    if (!res?.meta?.isSuccess) {
      toast.error(res?.meta?.message);
    } else {
      e.target.reset();
      if (onEdit.onEdit) dispatch(reset_edit());
    }
  };

  const handleDeleteRoom = async () => {
    const res = await fetcher(apiRoutes.deleteRoom, {
      method: "DELETE",
      body: JSON.stringify({ id: onEdit.data.id }),
    });

    if (!res?.meta?.isSuccess) {
      toast.error(res?.meta?.message);
    } else {
      dispatch(reset_edit());
    }
  };

  const handleGetRoomsFirstTime = async () => {
    const res = await fetcher(apiRoutes.getRoom, {
      method: "GET",
    });

    if (res?.meta?.isSuccess) {
      dispatch(onRoomInit(res?.data));
    } else {
      toast.error(res?.meta?.message);
    }
  };

  const handleGetUsersFirstTime = async () => {
    const res = await fetcher(apiRoutes.getUser, {
      method: "GET",
    });

    console.log(res)
    if (res?.meta?.isSuccess) {
      dispatch(onUserInit(res?.data));
    } else {
      toast.error(res?.meta?.message);
    }
  };

  const escPressCount = useRef(0);
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        escPressCount.current++;

        if (escPressCount.current === 2) {
          logoutUser();
          navigate(webPath.login);
          escPressCount.current = 0;
        }
      }

      if (event.ctrlKey && event.key === "q") {
        dispatch(reset_edit());
      }

      if (event.key === "Delete") {
        if (onEdit.onEdit) {
          handleDeleteRoom();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch, onEdit.onEdit]);

  useEffect(() => {
    if (typeof rooms == "object" && rooms?.length < 1) {
      handleGetRoomsFirstTime();
    }

    if (typeof users == "object" && users?.length < 1) {
      handleGetUsersFirstTime();
    }

    socket.on("stream_rooms", (response) => {
      if (response.status == "create") {
        console.log(response);
        dispatch(onRoomStore(response.data));
      }
      if (response.status == "update") {
        dispatch(onRoomEdit(response.data));
      }
      if (response.status == "delete") {
        dispatch(onRoomDelete(response.data._id));
      }
    });

    socket.on("stream_users", (response) => {
      if (response.status == "create") {
        console.log(response);
        dispatch(onUserStore(response.data));
      }
      if (response.status == "update") {
        dispatch(onUserEdit(response.data));
      }
      if (response.status == "delete") {
        dispatch(onUserDelete(response.data._id));
      }
    });

    return () => {
      socket.off("stream_rooms", (response) => {
        console.log(response);
      });

      socket.off("stream_users", (response) => {
        console.log(response);
      });
    };
  }, []);

  return (
    <main className="bg-black">
      <NavbarAdmin />
      <div className="content font-mono">
        <div className="flex">
          <aside className="box border border-success w-6/12 h-56 me-1 relative">
            <p className="pt-1.5 translate-x-5 -translate-y-5 bg-black w-max">
              User List
            </p>
            <div className="overflow-y-scroll w-full h-full absolute top-0">
              <ol className="text-white list-disc flex justify-center items-center flex-wrap">
                {users?.length > 0 ? (
                  users.map((item, index) => (
                    <li className="mx-3" key={index}>
                      {item.name}
                    </li>
                  ))
                ) : (
                  <li>Empty User</li>
                )}
              </ol>
            </div>
            <p className="absolute -bottom-3 left-2 bg-black">
              User total: {users.length}
            </p>
          </aside>
          <aside className="box border border-success w-6/12 h-56 me-1 relative">
            <p className="pt-1.5 translate-x-5 -translate-y-5 bg-black w-max">
              Room List
            </p>
            <div className="overflow-y-scroll w-full h-full absolute top-0">
              <ol className="text-white list-none flex justify-center items-center flex-wrap">
                {rooms?.length > 0 ? (
                  rooms.map((item, index) => (
                    <li
                      className="mx-3 btn btn-success !min-h-8 !h-8 p-2 rounded-md my-2"
                      key={index}
                      onClick={() => handleOnEdit(item._id, item.name)}
                    >
                      {item.name}
                    </li>
                  ))
                ) : (
                  <li className="text-center">Empty Room</li>
                )}
              </ol>
            </div>
            <p className="absolute -bottom-3 right-2 bg-black">
              Room total: {rooms.length}
            </p>
          </aside>
        </div>
        <form
          className="flex justify-center items-center h-40"
          onSubmit={handleRoom}
        >
          <input
            type="text"
            placeholder={onEdit.onEdit ? "Edit" : "Add" + " room"}
            name="room_name"
            className="input input-bordered input-success w-full max-w-xs"
            defaultValue={onEdit.onEdit ? onEdit.data.room_name : ""}
            required
          />
          <button className="btn btn-outline btn-success">
            {onEdit.onEdit ? "Edit" : "Add"}
          </button>
        </form>
        <div className="console absolute bottom-1 w-full bg-black">
          <p className="font-mono translate-x-5 translate-y-3 bg-black w-max">
            Admin console logs
          </p>
          <div className="box border border-success w-full h-52 overflow-y-scroll">
            <p>></p>
            <p>></p>
            <p>></p>
            <p>></p>
            <p>></p>
          </div>
        </div>
      </div>
    </main>
  );
}
