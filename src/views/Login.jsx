import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import InputLabelComponent from "../components/core/InputLabel";
import LoadingAnimation from "../components/core/LoadingAnimation";
import { useDispatch, useSelector } from "react-redux";
import { setLoginDataInput } from "../redux/store/loginStore";
import fetcher from "../utils/fetcher";
import { apiRoutes } from "../routes/api";
import { useContext } from "react";
import { AuthMidContext } from "../AuthMidContext";
import { setLoading } from "../redux/store/trueOrFalseStore";

export default function Login() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.trueOrFalseState).isLoading;
  const fields = useSelector((state) => state.loginState).fields;
  const { loginUser } = useContext(AuthMidContext);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    dispatch(setLoginDataInput({ [name]: value }));
  };

  const handleSubmitData = async (e) => {
    e.preventDefault();
    console.log(fields)
    dispatch(setLoading(true));
    console.log({ fields });
    const res = await fetcher(apiRoutes.login, {
      method: "POST",
      body: JSON.stringify(fields),
    });

    console.log(res);
    if (res?.meta?.isSuccess) {
      loginUser(res?.data);
    } else {
      toast.error(res?.meta?.message);
    }
    dispatch(setLoading(false));
  };

  return (
    <main className="w-screen h-screen">
      <ToastContainer />
      <div className="flex justify-center items-center h-full">
        <div className="card card-compact bg-base-100 w-96 shadow-xl shadow-gray-400 rounded-md">
          <form
            className="p-3 flex flex-col justify-center items-center"
            onSubmit={handleSubmitData}
          >
            <div className="flex flex-col">
              <InputLabelComponent
                labelName="Name"
                type="name"
                name="username"
                placeholder="Enter Admin Username"
                labelClassName="self-start"
                defaultValue={fields.username}
                onChangeEvent={handleChangeInput}
              />
            </div>
            <div className="mt-3 mb-3 flex flex-col">
              <InputLabelComponent
                labelName="Password"
                type="password"
                name="password"
                placeholder="Enter Admin Password"
                labelClassName="self-start"
                defaultValue={fields.password}
                onChangeEvent={handleChangeInput}
              />
            </div>
            {/* {isLoading && } */}
            <div className="mt-3 mb-3 flex flex-row items-center">
              {isLoading ? (
                <div>
                  <LoadingAnimation className="w-14" />{" "}
                  <p className="font-bold ms-3">Loading...</p>
                </div>
              ) : (
                <button className="btn btn-outline rounded-md btn-primary">
                  Login
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
