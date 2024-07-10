import { toast, ToastContainer } from "react-toastify";
import fetcher from "../utils/fetcher";
import { apiRoutes } from "../routes/api";
import { useDispatch, useSelector } from "react-redux";
import { on_edit, reset_edit } from "../redux/store/onEdit";
import { useEffect } from "react";

export default function AdminChatRoomDashboard() {
  const dispatch = useDispatch();
  const onEdit = useSelector((state) => state.onEditState);

  const handleOnEdit = (id, name) => {
    dispatch(on_edit({ onEdit: true, data: { id: id, room_name: name } }));
  };

  const handleRoom = async (e) => {
    e.preventDefault();
    const room_name = e.target.room_name.value;
    const res = await fetcher(
      onEdit.onEdit ? apiRoutes.editRoom : apiRoutes.addRoom,
      {
        method: onEdit.onEdit ? "PUT" : "POST",
        body: !onEdit.onEdit
          ? JSON.stringify({ room_name: room_name })
          : JSON.stringify({
              data: { id: onEdit.data.id, name: room_name },
            }),
      }
    );

    console.log(res)
    if (!res?.meta?.isSuccess) {
      toast.error(res?.meta?.message);
    } else {
      e.target.reset();
      if (onEdit.onEdit) dispatch(reset_edit());
    }
  };

  const handleDeleteRoom = async () => {
    const res = await fetcher(apiRoutes.deleteRoom, {
      method: "DELETE",
      body: JSON.stringify({ id: onEdit.data.id }),
    });

    if (!res?.meta?.isSuccess) {
      toast.error(res?.meta?.message);
    } else {
      dispatch(reset_edit());
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "q") {
        dispatch(reset_edit());
      }

      if (event.key === "Delete") {
        if (onEdit.onEdit) {
          handleDeleteRoom();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch, onEdit.onEdit]);

  return (
    <main>
      <div
        className="nav"
        className="navbar bg-base-100 mb-10 "
        style={{ boxShadow: "0px 0px 10px rgb(255,255,255,0.2)" }}
      >
        <ToastContainer />
        <div className="navbar-center mx-auto">
          <h1 className="text-center text-3xl font-bold">Welcome Admin</h1>
        </div>
      </div>
      <div className="content font-mono">
        <div className="flex">
          <aside className="box border border-success w-6/12 h-56 me-1 relative">
            <p className="pt-1.5 translate-x-5 -translate-y-5 bg-black w-max">
              User List
            </p>
            <div className="overflow-y-scroll w-full h-full absolute top-0">
              <ol className="text-white list-disc flex justify-center items-center flex-wrap">
                <li className="mx-3">Verdi</li>
                <li className="mx-3">Verdi</li>
                <li className="mx-3">Verdi</li>
                <li className="mx-3">Verdi</li>
                <li className="mx-3">Verdi</li>
                <li className="mx-3">Verdi</li>
                <li className="mx-3">Verdi</li>
                <li className="mx-3">Verdi</li>
                <li className="mx-3">Verdi</li>
                <li className="mx-3">Verdi</li>
                <li className="mx-3">Verdi</li>
                <li className="mx-3">Verdi</li>
                <li className="mx-3">Verdi</li>
                <li className="mx-3">Verdi</li>
                <li className="mx-3">Verdi</li>
                <li className="mx-3">Verdi</li>
                <li className="mx-3">Verdi</li>
                <li className="mx-3">Verdi</li>
                <li className="mx-3">Verdi</li>
                <li className="mx-3">Verdi</li>
                <li className="mx-3">Verdi</li>
                <li className="mx-3">Verdi</li>
                <li className="mx-3">Verdi</li>
                <li className="mx-3">Verdi</li>
                <li className="mx-3">Verdi</li>
                <li className="mx-3">Verdi</li>
                <li className="mx-3">Verdi</li>
                <li className="mx-3">Verdi</li>
                <li className="mx-3">Verdi</li>
                <li className="mx-3">Verdi</li>
                <li className="mx-3">Verdi</li>
                <li className="mx-3">Verdi</li>
                <li className="mx-3">Verdi</li>
                <li className="mx-3">Verdi</li>
                <li className="mx-3">Verdi</li>
                <li className="mx-3">Verdi</li>
                <li className="mx-3">Verdi</li>
                <li className="mx-3">Verdi</li>
                <li className="mx-3">Verdi</li>
                <li className="mx-3">Verdi</li>
                <li className="mx-3">Verdi</li>
                <li className="mx-3">Verdi</li>
                <li className="mx-3">Verdi</li>
                <li className="mx-3">Verdi</li>
                <li className="mx-3">Verdi</li>
                <li className="mx-3">Verdi</li>
                <li className="mx-3">Verdi</li>
                <li className="mx-3">Verdi</li>
              </ol>
            </div>
            <p className="absolute -bottom-3 left-2 bg-black">User total: 12</p>
          </aside>
          <aside className="box border border-success w-6/12 h-56 me-1 relative">
            <p className="pt-1.5 translate-x-5 -translate-y-5 bg-black w-max">
              Room List
            </p>
            <div className="overflow-y-scroll w-full h-full absolute top-0">
              <ol className="text-white list-none flex justify-center items-center flex-wrap">
                {rooms.map((item, index) => (
                  <li
                    className="mx-3 btn btn-success !min-h-8 !h-8 p-2 rounded-md my-2"
                    key={index}
                    onClick={() => handleOnEdit(item._id, item.name)}
                  >
                    {item.name}
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
        <form
          className="flex justify-center items-center h-40"
          onSubmit={handleRoom}
        >
          <input
            type="text"
            placeholder={onEdit.onEdit ? "Edit" : "Add" + " room"}
            name="room_name"
            className="input input-bordered input-success w-full max-w-xs"
            defaultValue={onEdit.onEdit ? onEdit.data.room_name : ""}
            required
          />
          <button className="btn btn-outline btn-success">
            {onEdit.onEdit ? "Edit" : "Add"}
          </button>
        </form>
        <div className="console absolute bottom-1 w-full">
          <p className="font-mono translate-x-5 translate-y-3 bg-black w-max">
            Admin see user logs
          </p>
          <div className="box border border-success w-full h-52 overflow-y-scroll">
            <p>></p>
            <p>></p>
            <p>></p>
            <p>></p>
            <p>></p>
          </div>
        </div>
      </div>
    </main>
  );
}

const rooms = [
  {
    _id: "668e2f668b39108224d69def",
    name: "sasa",
    inRoom: 0,
    created_at: "2024/07/10 13:51:18",
    updated_at: "2024/07/10 13:51:18",
  },
  {
    _id: "668e2fb58b39108224d69df2",
    name: "sasaa",
    inRoom: 0,
    created_at: "2024/07/10 13:52:37",
    updated_at: "2024/07/10 13:52:37",
  },
  {
    _id: "668e306a8b39108224d69df4",
    name: "sasas",
    inRoom: 0,
    created_at: "2024/07/10 13:55:38",
    updated_at: "2024/07/10 13:55:38",
  },
  {
    _id: "668e31028b39108224d69dfa",
    name: "sasas",
    inRoom: 0,
    created_at: "2024/07/10 13:58:10",
    updated_at: "2024/07/10 13:58:10",
  },
  {
    _id: "668e31248b39108224d69dfc",
    name: "sasas",
    inRoom: 0,
    created_at: "2024/07/10 13:58:44",
    updated_at: "2024/07/10 13:58:44",
  },
  {
    _id: "668e31268b39108224d69dfe",
    name: "sasas",
    inRoom: 0,
    created_at: "2024/07/10 13:58:46",
    updated_at: "2024/07/10 13:58:46",
  },
  {
    _id: "668e3182ec2851a0fd3760c5",
    name: "sasas",
    inRoom: 0,
    created_at: "2024/07/10 14:00:18",
    updated_at: "2024/07/10 14:00:18",
  },
  {
    _id: "668e3193ec2851a0fd3760c7",
    name: "tes",
    inRoom: 0,
    created_at: "2024/07/10 14:00:35",
    updated_at: "2024/07/10 14:00:35",
  },
  {
    _id: "668e31adec2851a0fd3760c9",
    name: "tes",
    inRoom: 0,
    created_at: "2024/07/10 14:01:01",
    updated_at: "2024/07/10 14:01:01",
  },
  {
    _id: "668e3290e60ed59854891104",
    name: "tessss",
    inRoom: 0,
    created_at: "2024/07/10 14:04:48",
    updated_at: "2024/07/10 14:04:48",
  },
  {
    _id: "668e3298e60ed59854891106",
    name: "tessss",
    inRoom: 0,
    created_at: "2024/07/10 14:04:56",
    updated_at: "2024/07/10 14:04:56",
  },
  {
    _id: "668e32b03be7fa30f3fc4cf3",
    name: "room_test",
    inRoom: 0,
    created_at: "2024/07/10 14:05:20",
    updated_at: "2024/07/10 14:05:20",
  },
  {
    _id: "668e32b33be7fa30f3fc4cf5",
    name: "room_test",
    inRoom: 0,
    created_at: "2024/07/10 14:05:23",
    updated_at: "2024/07/10 14:05:23",
  },
  {
    _id: "668e32cb4a2fc9cb36be7319",
    name: "room_test",
    inRoom: 0,
    created_at: "2024/07/10 14:05:47",
    updated_at: "2024/07/10 14:05:47",
  },
  {
    _id: "668e32f20cff3fbbb045a33a",
    name: "ress",
    inRoom: 0,
    created_at: "2024/07/10 14:06:26",
    updated_at: "2024/07/10 14:06:26",
  },
  {
    _id: "668e332a37f1e29822940976",
    name: "ressa",
    inRoom: 0,
    created_at: "2024/07/10 14:07:22",
    updated_at: "2024/07/10 14:07:22",
  },
  {
    _id: "668e333337f1e29822940978",
    name: "ressaaqsasas",
    inRoom: 0,
    created_at: "2024/07/10 14:07:31",
    updated_at: "2024/07/10 14:07:31",
  },
  {
    _id: "668e334537f1e2982294097a",
    name: "ressaaqsasassas",
    inRoom: 0,
    created_at: "2024/07/10 14:07:49",
    updated_at: "2024/07/10 14:07:49",
  },
  {
    _id: "668e338bd52112a75b87ae24",
    name: "ressaaqsasassas",
    inRoom: 0,
    created_at: "2024/07/10 14:08:59",
    updated_at: "2024/07/10 14:08:59",
  },
  {
    _id: "668e3394d52112a75b87ae26",
    name: "ressaaqsasassas",
    inRoom: 0,
    created_at: "2024/07/10 14:09:08",
    updated_at: "2024/07/10 14:09:08",
  },
  {
    _id: "668e3406b880203a1df68703",
    name: "ressaaqsasassas",
    inRoom: 0,
    created_at: "2024/07/10 14:11:02",
    updated_at: "2024/07/10 14:11:02",
  },
  {
    _id: "668e34bac72d2ec5c4537607",
    name: "test",
    inRoom: 0,
    created_at: "2024/07/10 14:14:02",
    updated_at: "2024/07/10 14:14:02",
  },
  {
    _id: "668e360fe294baa8347a554f",
    name: "test_bang",
    inRoom: 0,
    created_at: "2024/07/10 14:19:43",
    updated_at: "2024/07/10 14:19:43",
  },
];
