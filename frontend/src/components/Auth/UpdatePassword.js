import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { PasswordLock } from "../../assets/svg";
import { Loading, MetaData } from "../../helper";
import {
  clearErrors,
  updatePassword,
  UPDATE_PASSWORD_RESET,
} from "../../redux/actions/userAction";
import { Container, Input, Label } from "../Common";

export default function UpdatePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const { isUpdated, loading, err } = useSelector((state) => state.profile);
  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPass);
    myForm.set("newPassword", newPass);
    myForm.set("confirmPassword", confirmPass);
    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (err) {
      toast.error(err.message || err);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Password Updated Successfully");
      navigate("/account");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, err, isUpdated, navigate]);

  return (
    <Container>
      <div className="mx-auto mt-16 mb-6 sm:w-10/12 md:my-20 md:w-8/12 lg:w-6/12 xl:w-5/12">
        <MetaData title="Update Password | Q - Sneakers" />
        {loading && <Loading />}
        <form
          className="mt-8 rounded-md bg-white px-4 py-5 shadow sm:px-12 sm:py-14"
          onSubmit={updatePasswordSubmit}
        >
          <h2 className="pt-8 pb-8 text-center text-2xl font-medium sm:pt-0 sm:pb-12">
            Change Password
          </h2>

          {/* Old Password  */}
          <div className="mb-5 flex flex-col">
            <Label f="oldPassword">Old Password</Label>
            <div className="relative">
              <Input
                type="password"
                name="oldPassword"
                value={oldPass}
                plc="Enter Old Password"
                icon={<PasswordLock />}
                onChange={(e) => setOldPass(e.target.value)}
              />
            </div>
          </div>

          {/* New Password  */}
          <div className="mb-7 flex flex-col">
            <Label f="newPassword">New Password</Label>
            <div className="relative">
              <Input
                type="password"
                icon={<PasswordLock />}
                name="newPassword"
                value={newPass}
                plc="Enter New Password"
                onChange={(e) => setNewPass(e.target.value)}
              />
            </div>
          </div>

          {/* Confirm Password  */}
          <div className="mb-7 flex flex-col">
            <Label f="confirmPassword">Confirm New Password</Label>
            <div className="relative">
              <Input
                type="password"
                icon={<PasswordLock />}
                name="confirmPassword"
                value={confirmPass}
                plc="Enter Confirm New Password"
                onChange={(e) => setConfirmPass(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-end">
            <Link
              to="/password/forget"
              className="inline-flex pt-2 text-xs italic sm:text-sm"
            >
              Forgot Your Password ?
            </Link>
          </div>

          <div className="my-6">
            <input
              type="submit"
              value="CHANGE PASSWORD"
              className="flex w-full cursor-pointer items-center justify-center rounded-md bg-gray-900 py-4 text-center font-bold text-white duration-500 hover:bg-gray-600"
            />
          </div>
        </form>
      </div>
    </Container>
  );
}
