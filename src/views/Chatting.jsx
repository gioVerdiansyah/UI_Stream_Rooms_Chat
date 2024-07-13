import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import {
  onRoomDelete,
  onRoomEdit,
  onRoomInit,
  onRoomStore,
} from "../redux/store/roomStore";
import fetcher from "../utils/fetcher";
import { toast, ToastContainer } from "react-toastify";
import { apiRoutes } from "../routes/api";

const socket = io(import.meta.env.VITE_WEBSOCKET_URL, {
  extraHeaders: {
    "x-socket-key": import.meta.env.VITE_API_KEY,
  },
});

export default function Chatting() {
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.onRoomState).rooms;

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

  useEffect(() => {
    if (typeof rooms == "object" && rooms?.length < 1) {
      handleGetRoomsFirstTime();
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
  }, []);

  return (
    <div className="bg-black flex flex-row w-svw h-svh font-mono">
      <ToastContainer />
      <aside className="border border-success w-64 relative">
        <div className="profile flex flex-col border border-success border-x-0 px-2">
          <p className="text-sm text-gray-400">Username</p>
          <div>
            <p className="font-bold text-center">Verdi</p>
          </div>
        </div>
        <div className="profile flex flex-col border border-success mt-4 ps-2 h-5/6">
          <p className="text-sm text-gray-400 mb-3">Available Rooms</p>
          <div className="overflow-scroll w-full">
            <ol className="ms-8 list-disc">
              {rooms?.length > 0 &&
                rooms.map((item, index) => (
                  <li key={index} className="font-bold text-gray-400">
                    <button>{item.name}</button>
                  </li>
                ))}
            </ol>
          </div>
        </div>
        <button className="absolute bottom-0 btn btn-outline btn-success w-full">
          Logout
        </button>
      </aside>
      <main className="border border-success w-full relative">
        <nav className="border border-success h-14 flex flex-row justify-between items-center px-5">
          <p className="font-bold">Room 1</p>
          <p className="font-bold">20:30</p>
        </nav>
        <div className="content px-5 py-3 h-5/6 overflow-y-scroll">
          <div className="chat-content">
            <p className="username">si A</p>
            <div className="chat-message w-3/4 ms-5">
              <div className="triangle-thumb"></div>
              <p className="text-gray-400 border border-success px-5 py-3">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos
                esse quo dolorem necessitatibus consequuntur atque quam, sit
                nobis nostrum, similique dolor, quibusdam labore enim nulla?
              </p>
              <p className="text-gray-400 text-xs text-end">10:20 AM</p>
            </div>
          </div>
          {/* You */}
          <div className="chat-content flex flex-col items-end">
            <p className="username text-end">Verdi</p>
            <div className="chat-message w-3/4 me-5">
              <div className="triangle-thumb-you"></div>
              <p className="text-gray-400 border border-success px-5 py-3">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos
                esse quo dolorem necessitatibus consequuntur atque quam, sit
                nobis nostrum, similique dolor, quibusdam labore enim nulla?
              </p>
              <p className="text-gray-400 text-xs">10:20 AM</p>
            </div>
          </div>
          <div className="chat-content">
            <p className="username">si A</p>
            <div className="chat-message w-3/4 ms-5">
              <div className="triangle-thumb"></div>
              <p className="text-gray-400 border border-success px-5 py-3">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos
                esse quo dolorem necessitatibus consequuntur atque quam, sit
                nobis nostrum, similique dolor, quibusdam labore enim nulla?
              </p>
              <p className="text-gray-400 text-xs text-end">10:20 AM</p>
            </div>
          </div>
          {/* You */}
          <div className="chat-content flex flex-col items-end">
            <p className="username text-end">Verdi</p>
            <div className="chat-message w-3/4 me-5">
              <div className="triangle-thumb-you"></div>
              <p className="text-gray-400 border border-success px-5 py-3">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos
                esse quo dolorem necessitatibus consequuntur atque quam, sit
                nobis nostrum, similique dolor, quibusdam labore enim nulla?
              </p>
              <p className="text-gray-400 text-xs">10:20 AM</p>
            </div>
          </div>
          <div className="chat-content">
            <p className="username">si A</p>
            <div className="chat-message w-3/4 ms-5">
              <div className="triangle-thumb"></div>
              <p className="text-gray-400 border border-success px-5 py-3">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos
                esse quo dolorem necessitatibus consequuntur atque quam, sit
                nobis nostrum, similique dolor, quibusdam labore enim nulla?
              </p>
              <p className="text-gray-400 text-xs text-end">10:20 AM</p>
            </div>
          </div>
          {/* You */}
          <div className="chat-content flex flex-col items-end">
            <p className="username text-end">Verdi</p>
            <div className="chat-message w-3/4 me-5">
              <div className="triangle-thumb-you"></div>
              <p className="text-gray-400 border border-success px-5 py-3">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos
                esse quo dolorem necessitatibus consequuntur atque quam, sit
                nobis nostrum, similique dolor, quibusdam labore enim nulla?
              </p>
              <p className="text-gray-400 text-xs">10:20 AM</p>
            </div>
          </div>
          <div className="chat-content">
            <p className="username">si A</p>
            <div className="chat-message w-3/4 ms-5">
              <div className="triangle-thumb"></div>
              <p className="text-gray-400 border border-success px-5 py-3">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos
                esse quo dolorem necessitatibus consequuntur atque quam, sit
                nobis nostrum, similique dolor, quibusdam labore enim nulla?
              </p>
              <p className="text-gray-400 text-xs text-end">10:20 AM</p>
            </div>
          </div>
          {/* You */}
          <div className="chat-content flex flex-col items-end">
            <p className="username text-end">Verdi</p>
            <div className="chat-message w-3/4 me-5">
              <div className="triangle-thumb-you"></div>
              <p className="text-gray-400 border border-success px-5 py-3">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos
                esse quo dolorem necessitatibus consequuntur atque quam, sit
                nobis nostrum, similique dolor, quibusdam labore enim nulla?
              </p>
              <p className="text-gray-400 text-xs">10:20 AM</p>
            </div>
          </div>
        </div>
        <form className="chat-input absolute bottom-2.5 w-full px-10 flex flex-row">
          <input
            type="text"
            className="input input-bordered w-full placeholder:text-gray-400 input-success"
            placeholder="Type here to message..."
            autoFocus
          />
          <button className="btn btn-outline btn-success">Send</button>
        </form>
      </main>
    </div>
  );
}
