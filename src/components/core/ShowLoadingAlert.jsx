import loadingGif from "../../../assets/gif/loading.gif";
import "react-alert-confirm/lib/style.css";
import AlertConfirm from "react-alert-confirm";

let dispatchRef = null;

export default async function showLoadingAlert(
  text = "Loading...",
  width = 14
) {
  const [dispatch, instance] = await AlertConfirm({
    maskClosable: true,
    custom: (dispatch) => {
      dispatchRef = dispatch;
      return (
        <div className="flex justify-center items-center !px-14 !py-10 bg-white rounded-md">
          <img src={loadingGif} className={"w-" + width} alt="Loading Gif" />
          <p className="!ml-3 text-2xl font-bold">{text}</p>
        </div>
      );
    },
  });
  return instance;
}

export function closeLoadingAlert() {
  if (dispatchRef) {
    dispatchRef("cancel");
    dispatchRef = null;
  }
}
