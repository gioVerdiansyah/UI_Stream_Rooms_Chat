import "react-alert-confirm/lib/style.css";
import AlertConfirm, { Button } from "react-alert-confirm";

export default async function showConfirmAlert({
  Icon,
  title = "Are you sure?",
  description,
  cancelText,
  yesText,
  yesFunc,
  styleType = "primary"
}) {
  await AlertConfirm({
    title: (
      <div className="flex flex-row items-center">
        {Icon && (
          <Icon
            className={`text-2xl ${
              styleType === "danger"
                ? "text-red-600"
                : styleType === "warning"
                ? "text-yellow-400"
                : styleType === "primary"
                ? "text-blue-600"
                : ""
            }`}
          />
        )}
        <p className="font-bold !ml-1">{title}</p>
      </div>
    ),
    desc: (
      <span>
        {description ??
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, odit."}
      </span>
    ),
    footer: (dispatch) => {
      return (
        <>
          <Button className="pointer" onClick={() => dispatch("cancel")}>
            {cancelText ?? "Cancel"}
          </Button>
          <Button
            onClick={() => dispatch("yes")}
            className={`!text-white ${
              styleType === "danger"
                ? "!bg-red-600"
                : styleType === "warning"
                ? "!bg-yellow-400"
                : styleType === "primary"
                ? "!bg-blue-600"
                : ""
            }`}
          >
            {yesText ?? "Yes"}
          </Button>
        </>
      );
    },
    closeBefore: async (action) => {
      if (action === "yes") yesFunc();
    },
  });
}
