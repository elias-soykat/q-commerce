import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { EmailIcon, NameIcon } from "../../assets/svg";
import { Loading, MetaData } from "../../helper";
import {
  clearErrors,
  getUserDetails,
  updateUser,
} from "../../redux/actions/userAction";
import { Input, Label } from "../Common";
import Sidebar from "./Sidebar";

export default function UpdateUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const { loading, err, user } = useSelector((state) => state.userDetails);

  const {
    loading: updateLoading,
    err: updateErr,
    isUpdated,
  } = useSelector((state) => state.profile);

  useEffect(() => {
    if (user && user._id !== id) {
      dispatch(getUserDetails(id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }

    if (err) {
      toast.error(err.message || err);
      dispatch(clearErrors());
    }

    if (updateErr) {
      toast.error(updateErr.message || updateErr);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success(`${id} updated successfully`);
      navigate("/admin/users");
      dispatch({ type: "UPDATE_USER_RESET" });
    }
  }, [dispatch, err, id, isUpdated, navigate, updateErr, user]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(id, myForm));
  };

  return (
    <section className="container my-20">
      <MetaData title="Update User | Q Sneakers " />
      {(loading || updateLoading) && <Loading />}
      <div className="overflow-hidden">
        <Sidebar />
        <div className="my-4 flex flex-col sm:my-0 md:ml-[300px]">
          <h1 className="mt-10 text-center text-xl font-medium sm:text-2xl">
            Update User
          </h1>

          <form
            className="mx-auto mt-8 w-11/12 sm:w-8/12 md:w-7/12"
            onSubmit={updateUserSubmitHandler}
          >
            {/* User Name  */}
            <div className="mb-5 flex flex-col">
              <Label f="name">Product Name</Label>
              <div className="relative">
                <Input
                  type="text"
                  name="name"
                  value={name}
                  icon={<NameIcon />}
                  plc="Enter User Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            {/* User Email  */}
            <div className="mb-5 flex flex-col">
              <Label f="email">Product Email</Label>
              <div className="relative">
                <Input
                  type="text"
                  name="email"
                  value={email}
                  icon={<EmailIcon />}
                  plc="Enter User email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* User Role  */}
            <div className="mb-6 flex flex-col">
              <Label f="role">User Role</Label>

              <div className="relative flex w-full rounded-md border focus:border-gray-600">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  name="role"
                  className="w-full rounded-lg border border-gray-300 py-2 pl-4 text-sm placeholder-gray-500 transition-colors placeholder:italic focus:border-gray-600 focus:outline-none"
                  id="role"
                  required
                >
                  <option value="">Chose User Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
            </div>

            <div className="mt-12 mb-6">
              <input
                type="submit"
                value="Update User"
                disabled={updateLoading || role === "" ? true : false}
                className="flex w-full cursor-pointer items-center justify-center rounded-md bg-gray-900 py-3 text-center text-sm font-medium text-white duration-500 hover:bg-gray-600 sm:text-base"
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
