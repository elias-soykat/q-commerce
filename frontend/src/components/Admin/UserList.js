import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { EditIcon, TrashIcon } from "../../assets/svg";
import { Loading, MetaData } from "../../helper";
import {
  clearErrors,
  deleteUser,
  getAllUsers,
} from "../../redux/actions/userAction";
import Sidebar from "./Sidebar";

export default function UserList() {
  const dispatch = useDispatch();
  const [removeUser, setRemoveUser] = useState("");

  const { users, loading, err } = useSelector((state) => state.allUsers);

  const {
    isDeleted,
    loading: deleteLoading,
    err: deleteErr,
  } = useSelector((state) => state.profile);

  useEffect(() => {
    if (err) {
      toast.error(err.message || err);
      dispatch(clearErrors());
    }

    if (deleteErr) {
      toast.error(deleteErr.message || deleteErr);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success(isDeleted);
      dispatch({ type: "DELETE_PRODUCT_RESET" });
    }

    dispatch(getAllUsers());
  }, [deleteErr, dispatch, err, isDeleted]);

  const checkUsers = users.length > 0;

  const removeUserHandler = (id) => {
    dispatch(deleteUser(id));
    setRemoveUser(id);
  };

  return (
    <section className="container my-20">
      <MetaData title="All Users | Q Sneakers " />
      {(loading || deleteLoading) && <Loading />}
      <div className={`${checkUsers && "overflow-auto"}`}>
        <Sidebar />
        <div className="my-4 flex flex-col sm:my-0 md:ml-[300px]">
          <h3 className="my-10 text-center text-2xl font-medium sm:text-3xl">
            All Users
          </h3>
          <table className="w-full text-left">
            <thead className="animate pulse h-12 rounded-lg bg-gray-800 text-white duration-200 hover:bg-gray-600">
              <tr className="text-lg font-semibold">
                <th className="pl-10">User ID</th>
                <th>Email</th>
                <th>Name</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {!checkUsers && (
                <tr className="relative top-2 bottom-0 my-8 text-right text-lg font-medium">
                  <td>No User is available</td>
                </tr>
              )}
              {checkUsers &&
                users
                  .filter((u) => u._id !== removeUser)
                  .map((user) => (
                    <tr
                      key={user._id}
                      className="h-14 border-b border-gray-400 duration-200 hover:bg-gray-500 hover:text-white"
                    >
                      <td className="pl-10">{user._id}</td>
                      <td>{user.email}</td>
                      <td>{user.name}</td>
                      <td className="text-lg font-semibold">{user.role}</td>
                      <td className="flex items-center justify-center pt-3">
                        <Link
                          to={`/admin/user/update/${user._id}`}
                          className="mr-2"
                        >
                          <EditIcon />
                        </Link>
                        <button onClick={() => removeUserHandler(user._id)}>
                          <TrashIcon />
                        </button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
