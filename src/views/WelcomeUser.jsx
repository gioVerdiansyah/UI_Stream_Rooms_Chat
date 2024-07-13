import { useDispatch, useSelector } from "react-redux";
import NavbarUser from "./components/fragments/NavbarUser";
import {
  onBlurInput,
  onEnterChat,
  onErrorJoinChat,
  onFocusInput,
} from "../redux/store/onJoinChatStore";
import { useNavigate } from "react-router-dom";
import { webPath } from "../routes/web";
import fetcher from "../utils/fetcher";
import { apiRoutes } from "../routes/api";

export default function WelcomeUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userJoinChat = useSelector((state) => state.onJoinChatState);

  const handleOnJoinChat = async (e) => {
    e.preventDefault();
    if (userJoinChat.onEnterRoom == "Admin") {
      navigate(webPath.login);
    } else {
      const res = await fetcher(apiRoutes.userLogin, {
        method: "POST",
        body: JSON.stringify({ username: e.target.username.value }),
      });

      console.log(res);
      if (res?.meta?.isSuccess) {
        // console.log(res)
      } else {
        console.error(res);
        dispatch(onErrorJoinChat(res?.meta?.message));
      }
    }
    console.log(userJoinChat)
  };

  return (
    <div className="bg-black h-svh">
      <NavbarUser />
      <form
        className="flex flex-col items-center justify-center"
        onSubmit={handleOnJoinChat}
      >
        <label htmlFor="username" className="font-mono mb-5">
          {userJoinChat.onFocus
            ? "Press Enter to join room"
            : "Enter name to join room"}
        </label>
        <div className="w-full flex flex-col items-center justify-center">
          <input
            type="text"
            placeholder="Username to display in chat"
            name="username"
            onFocus={() => dispatch(onFocusInput())}
            onBlur={() => dispatch(onBlurInput())}
            onChange={(e) => dispatch(onEnterChat(e.target.value))}
            className={
              "input input-bordered w-full max-w-xs placeholder:text-center input-" +
              (userJoinChat.error ? "error" : "success")
            }
            required
          />
          {userJoinChat.error && (
            <p className="text-red-500">{userJoinChat.error}</p>
          )}
        </div>
      </form>
    </div>
  );
}
