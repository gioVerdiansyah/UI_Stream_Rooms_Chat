import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import {
  deletedCurrentRoom,
  onRoomDelete,
  onRoomEdit,
  onRoomInit,
  onRoomStore,
  setJoinRoom,
  setNewUsername,
} from "../redux/store/roomStore";
import fetcher from "../utils/fetcher";
import { toast, ToastContainer } from "react-toastify";
import { apiRoutes } from "../routes/api";
import { onBlurInput, onFocusInput } from "../redux/store/usernameStore";
import Cookies from "js-cookie";
import FirstPageChat from "./components/fragments/FistPageChat";
import {
  onChatDelete,
  onChatEdit,
  onChatInit,
  onChatStore,
  resetChat,
} from "../redux/store/chatStore";
import { ChatMe, ChatYou } from "./components/fragments/ChatFragment";
import { setLoading } from "../redux/store/trueOrFalseStore";
import { setTime } from "../redux/store/timeStore";
import { getCurrentTime } from "../utils/handleDates";
import { useNavigate } from "react-router-dom";
import { webPath } from "../routes/web";

export default function Chatting() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const roomState = useSelector((state) => state.onRoomState);
  const chatState = useSelector((state) => state.chatState);
  const isLoading = useSelector((state) => state.trueOrFalseState).isLoading;
  const usernameState = useSelector((state) => state.usernameState);
  const time = useSelector((state) => state.timeState).time;
  const socketRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const userToken = Cookies.get(import.meta.env.VITE_USER_COOKIE_NAME);
    socketRef.current = io(import.meta.env.VITE_WEBSOCKET_URL, {
      extraHeaders: {
        "x-socket-key": import.meta.env.VITE_API_KEY,
        "User-Token": userToken,
      },
    });

    if (!userToken) { navigate(webPath.welcomeUser) }
    const socket = socketRef.current;

    const handleGetRoomsFirstTime = async () => {
      const res = await fetcher(apiRoutes.getRoom, { method: "GET" });

      if (res?.meta?.isSuccess) {
        dispatch(onRoomInit(res?.data));
      } else {
        toast.error(res?.meta?.message);
      }
    };

    const handleStreamRooms = (response) => {
      console.log(response);
      if (response.status === "create") {
        dispatch(onRoomStore(response.data));
      }
      if (response.status === "update") {
        dispatch(onRoomEdit(response.data));
        dispatch(setJoinRoom(response.data._id, response.data.name));
      }
      if (response.status === "delete") {
        dispatch(onRoomDelete(response.data._id));
        if (roomState.current_room.id == response.data._id) {
          dispatch(deletedCurrentRoom());
        }
      }
    };

    const handleStreamChats = (response) => {
      if (response.status === "create") {
        dispatch(onChatStore(response.data));
      }
      if (response.status === "update") {
        dispatch(onChatEdit(response.data));
      }
      if (response.status === "delete") {
        dispatch(onChatDelete(response.data._id));
      }
    };

    const handleChangeUsername = (response) => {
      console.log(response);
      if (response?.meta?.statusCode == 401) {
        toast.error(response?.meta?.message);
      } else {
        if (!response.data) {
          Cookies.remove(import.meta.env.VITE_USER_COOKIE_NAME);
          navigate(webPath.welcomeUser);
        } else {
          dispatch(setNewUsername(response.data));
        }
      }
    };

    const getNewsChat = async (room_id) => {
      const res = await fetcher(apiRoutes.newsChat + "?room_id=" + room_id);

      console.log(res);
      if (res?.meta?.isSuccess) {
        setTimeout(() => {
          dispatch(setLoading(false));
          dispatch(onChatInit(res?.data));
        }, 1000);
      } else {
        console.log(res);
      }
    };

    const handleJoinedRoom = (response) => {
      if (response?.meta?.isSuccess) {
        dispatch(setJoinRoom(response.data.id, response.data.name));
        getNewsChat(response.data.id);
      } else {
        dispatch(setJoinRoom(null));
      }
    };

    const handleWantNewName = () => {
      socket.emit("want_username");
    };

    const handleInitLatestJoinedRoom = () => {
      socket.emit("want_latest_joined_room");
    };

    if (typeof roomState.rooms === "object" && roomState.rooms?.length < 1) {
      handleGetRoomsFirstTime();
    }

    if (!roomState.username_in_chat) {
      handleWantNewName();
    }

    if (roomState.current_room == null) {
      handleInitLatestJoinedRoom();
    }

    socket.on("want_username_response", handleChangeUsername);
    socket.on("stream_rooms", handleStreamRooms);
    socket.on("latest_user_room_response", handleJoinedRoom);
    socket.on("chat_response", handleStreamChats);

    return () => {
      socket.off("stream_rooms", handleStreamRooms);
      socket.off("want_username_response", handleChangeUsername);
      socket.off("latest_user_room_response", handleJoinedRoom);
      socket.off("chat_response", handleStreamChats);
      socket.disconnect();
    };
  }, [dispatch, roomState.rooms, usernameState.username]);

  const handleLeaveRoom = () => {
    return new Promise((resolve, reject) => {
      if (roomState.current_room && roomState.current_room !== null) {
        socketRef.current.emit(
          "leave_room",
          roomState.current_room.id,
          (ack) => {
            if (ack) {
              resolve();
            } else {
              reject(new Error("Failed to leave room"));
            }
          }
        );
      } else {
        resolve();
      }
    });
  };

  const handleJoinRoom = async (room_id) => {
    try {
      await handleLeaveRoom();
      socketRef.current.emit("join_room", room_id);
      dispatch(resetChat());
      dispatch(setLoading(true));
    } catch (error) {
      console.error("Error leaving room:", error);
    }
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    const value = e.target.chat_input.value;
    if (value.trim() !== "") {
      console.log(roomState.current_room.id);
      socketRef.current.emit("send_chat", {
        message: value,
        room_id: roomState.current_room.id,
      });
      e.target.reset();
    }
  };

  const handleChangeUsername = (e) => {
    e.preventDefault();
    socketRef.current.emit("rename_username", e.target.username.value);
    dispatch(onBlurInput());
  };

  const handleLogout = () => {
    socketRef.current.disconnect();
    Cookies.remove(import.meta.env.VITE_USER_COOKIE_NAME);
    navigate(webPath.welcomeUser);
  };

  // Auto Scroll
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatState.chats]);

  // Time
  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(setTime(getCurrentTime()));
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  return (
    <div className="bg-black flex flex-row w-svw h-svh font-mono">
      <ToastContainer theme="dark" />
      <aside className="border border-success w-64 relative">
        <div className="profile flex flex-col border border-success border-x-0 px-2">
          <p className="text-sm text-gray-400">Username</p>
          <div>
            {usernameState.onFocus ? (
              <form onSubmit={handleChangeUsername}>
                <input
                  type="text"
                  name="username"
                  className="input input-success h-5 w-full"
                  defaultValue={roomState.username_in_chat}
                  onBlur={() => dispatch(onBlurInput())}
                  placeholder="Type new username"
                  autoFocus
                />
              </form>
            ) : (
              <p
                className="font-bold text-center"
                onDoubleClick={() => dispatch(onFocusInput())}
              >
                {roomState.username_in_chat}
              </p>
            )}
          </div>
        </div>
        <div className="profile flex flex-col border border-success mt-4 ps-2 h-5/6">
          <p className="text-sm text-gray-400 mb-3">Available Rooms</p>
          <div className="overflow-scroll w-full h-full">
            <ol className="ms-8 list-disc">
              {roomState.rooms?.length > 0 &&
                roomState.rooms.map((item) => {
                  return (
                    <li
                      key={item._id}
                      className={
                        "font-bold " +
                        (roomState.current_room !== null &&
                          item._id === roomState.current_room.id
                          ? ""
                          : "text-gray-400")
                      }
                    >
                      <button onClick={() => handleJoinRoom(item._id)}>
                        {item.name}
                      </button>
                    </li>
                  );
                })}
            </ol>
          </div>
        </div>
        <button
          className="absolute bottom-0 btn btn-outline btn-success w-full"
          onClick={handleLogout}
        >
          Logout
        </button>
      </aside>
      <main className="border border-success w-full relative">
        {roomState.current_room ? (
          <>
            <nav className="border border-success h-14 flex flex-row justify-between items-center px-5">
              <p className="font-bold">{roomState.current_room.name}</p>
              <p className="font-bold">{time}</p>
            </nav>
            <div
              className="content px-5 py-3 h-5/6 overflow-y-scroll"
              ref={chatContainerRef}
            >
              {isLoading ? (
                <div className="w-full flex justify-center">
                  <span className="loading loading-spinner text-success"></span>
                </div>
              ) : chatState.chats && chatState.chats.length > 0 ? (
                chatState.chats.map((item, index) =>
                  item.user_id ===
                    Cookies.get(import.meta.env.VITE_USER_COOKIE_NAME) ? (
                    <ChatMe
                      key={index}
                      username={item.name}
                      message={item.message}
                      date={item.chat_at}
                    />
                  ) : (
                    <ChatYou
                      key={index}
                      username={item.name}
                      message={item.message}
                      date={item.chat_at}
                    />
                  )
                )
              ) : (
                <p className="text-center font-bold">Chat is Empty...</p>
              )}
            </div>
            <form
              className="chat-input absolute bottom-2.5 w-full px-10 flex flex-row"
              onSubmit={handleSendChat}
            >
              <input
                type="text"
                className="input input-bordered w-full placeholder:text-gray-400 input-success"
                placeholder="Type here to message..."
                name="chat_input"
                autoComplete="off"
                autoFocus
              />
              <button type="submit" className="btn btn-outline btn-success">
                Send
              </button>
            </form>
          </>
        ) : (
          <FirstPageChat />
        )}
      </main>
    </div>
  );
}
