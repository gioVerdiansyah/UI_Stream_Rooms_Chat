import { useDispatch, useSelector } from "react-redux";
import NavbarUser from "./components/fragments/NavbarUser";
import {
  onBlurInput,
  onErrorJoinChat,
  onFocusInput,
  onSetUsername,
} from "../redux/store/usernameStore";
import { useNavigate } from "react-router-dom";
import { webPath } from "../routes/web";
import fetcher from "../utils/fetcher";
import { apiRoutes } from "../routes/api";
import Cookies from "js-cookie";

export default function WelcomeUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userJoinChat = useSelector((state) => state.usernameState);

  const handleOnJoinChat = async (e) => {
    e.preventDefault();
    if (userJoinChat.username == "Admin") {
      navigate(webPath.login);
    } else {
      const res = await fetcher(apiRoutes.userLogin, {
        method: "POST",
        body: JSON.stringify({ username: userJoinChat.username }),
      });

      if (res?.meta?.isSuccess) {
        dispatch(onBlurInput())
        Cookies.set(import.meta.env.VITE_USER_COOKIE_NAME, res?.data);
        navigate(webPath.chatting)
      } else {
        console.error(res);
        dispatch(onErrorJoinChat(res?.meta?.message));
      }
    }
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
            onChange={(e) => dispatch(onSetUsername(e.target.value))}
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
