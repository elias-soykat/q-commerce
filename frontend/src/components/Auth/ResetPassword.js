import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PasswordLock } from "../../assets/svg";
import { Loading, MetaData } from "../../helper";
import { clearErrors, resetPassword } from "../../redux/actions/userAction";
import { Container, Input, Label } from "../Common";

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
      <div className="mx-auto mt-16 mb-6 sm:w-10/12 md:my-20 md:w-8/12 lg:w-6/12 xl:w-5/12">
        <MetaData title="Reset Password | Q - Sneakers" />
        {loading && <Loading />}
        <form
          className="mt-8 rounded-md bg-white px-4 py-5 shadow sm:px-12 sm:py-14"
          onSubmit={resetPasswordSubmit}
        >
          <h2 className="pt-8 pb-8 text-center text-2xl font-medium sm:pt-0 sm:pb-12">
            Reset Password
          </h2>

          {/*  Password  */}
          <div className="mb-6 flex flex-col">
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
          <div className="mb-7 flex flex-col">
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
              className="inline-flex text-xs italic sm:text-sm "
            >
              Already have an account ?
            </Link>
          </div>

          <div className="my-6">
            <input
              type="submit"
              value="RESET PASSWORD"
              className="flex w-full cursor-pointer items-center justify-center rounded-md bg-gray-900 py-4 text-center text-sm font-medium text-white duration-500 hover:bg-gray-600 sm:text-base"
            />
          </div>
        </form>
      </div>
    </Container>
  );
}
