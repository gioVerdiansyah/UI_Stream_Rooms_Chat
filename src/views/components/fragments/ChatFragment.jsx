import { formatTime } from "../../../utils/handleDates";

export function ChatYou({ username = "", message = "" , date = ""}) {
  return (
    <div className="chat-content">
      <p className="username">{username}</p>
      <div className="chat-message w-max max-w-xl ms-5">
        <div className="triangle-thumb"></div>
        <p className="text-gray-400 border border-success px-5 py-3 text-wrap break-words">
          {message}
        </p>
        <p className="text-gray-400 text-xs text-end">{formatTime(date)}</p>
      </div>
    </div>
  );
}

export function ChatMe({ username = "", message = "" , date = ""}) {
  return (
    <div className="chat-content flex flex-col items-end">
      <p className="username text-end">{username}</p>
      <div className="chat-message max-w-xl me-5">
        <div className="triangle-thumb-you"></div>
        <p className="text-gray-400 border border-success px-5 py-3 text-wrap break-words">
          {message}
        </p>
        <p className="text-gray-400 text-xs">{formatTime(date)}</p>
      </div>
    </div>
  );
}
