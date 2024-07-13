import { ToastContainer } from "react-toastify";

export default function NavbarAdmin() {
  return (
    <div
      className="navbar bg-base-100 mb-10 "
      style={{ boxShadow: "0px 0px 10px rgb(255,255,255,0.2)" }}
    >
      <ToastContainer />
      <div className="navbar-center mx-auto">
        <h1 className="text-center text-3xl font-bold font-mono">Welcome Admin</h1>
      </div>
    </div>
  );
}
