import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
      <div className="mt-16 mb-6 md:my-20 sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-5/12 mx-auto">
        <MetaData title="Update Password | Q - Commerce" />
        {loading && <Loading />}
        <form
          className="mt-8 bg-white px-4 py-5 sm:px-12 sm:py-14 rounded-md shadow"
          onSubmit={updatePasswordSubmit}
        >
          <h2 className="text-2xl pt-8 sm:pt-0 pb-8 sm:pb-12 text-center font-medium">
            Change Password
          </h2>

          {/* Old Password  */}
          <div className="flex flex-col mb-5">
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
          <div className="flex flex-col mb-7">
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
          <div className="flex flex-col mb-7">
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
            <a href="/" className="inline-flex text-xs sm:text-sm italic">
              Forgot Your Password ?
            </a>
          </div>

          <div className="my-6">
            <input
              type="submit"
              value="CHANGE PASSWORD"
              className="cursor-pointer w-full py-4 flex items-center justify-center font-bold text-center duration-500 rounded-md text-white bg-gray-900 hover:bg-gray-600"
            />
          </div>
        </form>
      </div>
    </Container>
  );
}
