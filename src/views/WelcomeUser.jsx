import { useDispatch, useSelector } from "react-redux";
import NavbarUser from "./components/fragments/NavbarUser";
import {
  onBlurInput,
  onErrorJoinChat,
  onFocusInput,
  onSetFieldsLoginRegister,
  onUnSetFields,
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

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    dispatch(onSetFieldsLoginRegister({ [name]: value }));
  };

  const handleOnJoinChat = async (e) => {
    e.preventDefault();
    const usr = userJoinChat.fields.username?.trim().toLowerCase();
    console.log(usr)
    if (usr === "admin" || usr == "administrator" || usr == "administrators") {
      navigate(webPath.login);
    } else {
      const res = await fetcher(apiRoutes.userLogin, {
        method: "POST",
        body: JSON.stringify(userJoinChat.fields),
      });

      if (res?.meta?.isSuccess) {
        dispatch(onBlurInput());
        dispatch(onUnSetFields());
        Cookies.set(import.meta.env.VITE_USER_COOKIE_NAME, res?.data, {
          expires: 1,
        });
        navigate(webPath.chatting);
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
            : "Fill fields to join room"}
        </label>
        <div className="w-full flex flex-col items-center justify-center">
          <input
            type="text"
            placeholder="Username to display in chat"
            name="username"
            onFocus={() => dispatch(onFocusInput())}
            onBlur={() => dispatch(onBlurInput())}
            onChange={handleChangeInput}
            defaultValue={userJoinChat.fields.username}
            className={
              "input input-bordered w-full max-w-xs placeholder:text-center input-" +
              (userJoinChat.error ? "error" : "success")
            }
            required
          />
          <input
            type="password"
            placeholder="Your Password"
            name="password"
            onFocus={() => dispatch(onFocusInput())}
            onBlur={() => dispatch(onBlurInput())}
            onChange={handleChangeInput}
            defaultValue={userJoinChat.fields.password}
            className={
              "mt-5 input input-bordered w-full max-w-xs placeholder:text-center input-" +
              (userJoinChat.error ? "error" : "success")
            }
            required
          />
          {userJoinChat.error && (
            <p className="text-red-500">{userJoinChat.error}</p>
          )}
          <button className="btn btn-outline btn-success mt-5">Join</button>
        </div>
      </form>
    </div>
  );
}
