import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Loading, MetaData } from "../../helper";
import { clearErrors, resetPassword } from "../../redux/actions/userAction";
import { Container, Input, Label } from "../Common";
import { PasswordLock } from "../../assets/svg";

export default function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { success, loading, err } = useSelector(
    (state) => state.forgetPassword
  );

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(resetPassword(token, myForm));
  };

  useEffect(() => {
    if (err) {
      toast.error(err.message || err);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Password Updated Successfully");
      navigate("/login");
    }
  }, [dispatch, err, navigate, success]);

  return (
    <Container>
      <div className="mt-16 mb-6 md:my-20 sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-5/12 mx-auto">
        <MetaData title="Reset Password | Q - Commerce" />
        {loading && <Loading />}
        <form
          className="mt-8 bg-white px-4 py-5 sm:px-12 sm:py-14 rounded-md shadow"
          onSubmit={resetPasswordSubmit}
        >
          <h2 className="text-2xl pt-8 sm:pt-0 pb-8 sm:pb-12 text-center font-medium">
            Reset Password
          </h2>

          {/*  Password  */}
          <div className="flex flex-col mb-6">
            <Label f="password">New Password</Label>
            <div className="relative">
              <Input
                type="password"
                name="password"
                value={password}
                plc="Enter New Password"
                icon={<PasswordLock />}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Confirm Password  */}
          <div className="flex flex-col mb-7">
            <Label f="confirmPassword">New Confirm Password</Label>
            <div className="relative">
              <Input
                type="password"
                icon={<PasswordLock />}
                name="confirmPassword"
                value={confirmPassword}
                plc="Enter New Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-end">
            <Link
              to="/auth/login"
              className="inline-flex text-xs sm:text-sm italic "
            >
              Already have an account ?
            </Link>
          </div>

          <div className="my-6">
            <input
              type="submit"
              value="Reset Password"
              className="cursor-pointer w-full py-2.5 flex items-center justify-center text-sm sm:text-base font-medium text-center duration-500 rounded-md text-white bg-gray-900 hover:bg-gray-600"
            />
          </div>
        </form>
      </div>
    </Container>
  );
}
