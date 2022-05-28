import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { EmailIcon } from "../../assets/svg";
import { Loading, MetaData } from "../../helper";
import { clearErrors, forgetPassword } from "../../redux/actions/userAction";
import { Container, Input, Label } from "../Common";

export default function ForgetPassword() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const { message, loading, err } = useSelector(
    (state) => state.forgetPassword
  );

  const forgetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);

    dispatch(forgetPassword(myForm));
  };

  useEffect(() => {
    if (err) {
      toast.error(err.message || err);
      dispatch(clearErrors());
    }
  }, [dispatch, err]);

  return (
    <Container>
      <div className="mt-16 mb-6 md:my-20 sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-5/12 mx-auto">
        <MetaData title="Forget Password | Q - Commerce" />
        {loading && <Loading />}
        <form
          className="mt-8 bg-white px-4 py-5 sm:px-12 sm:py-14 rounded-md shadow"
          onSubmit={forgetPasswordSubmit}
        >
          <h2 className="text-2xl pt-8 sm:pt-0 pb-8 sm:pb-10 text-center font-medium">
            Forget Password
          </h2>

          {message && (
            <div className="py-3 mb-6 sm:mb-8 pl-4 text-green-900 border-l-4 border-green-700 bg-green-200 rounded-sm">
              Email Send to:{" "}
              <span className="text-sm font-bold">{message.split(" ")[3]}</span>
            </div>
          )}

          {/* Email  */}
          <div className="flex flex-col mb-6">
            <Label f="email">E-Mail Address</Label>
            <div className="relative">
              <Input
                type="email"
                name="email"
                value={email}
                plc="Enter Your Email"
                icon={<EmailIcon />}
                onChange={(e) => setEmail(e.target.value)}
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
              value="Forget Password"
              className="cursor-pointer w-full py-2.5 flex items-center justify-center text-sm sm:text-base font-medium text-center duration-500 rounded-md text-white bg-gray-900 hover:bg-gray-600"
            />
          </div>
        </form>
      </div>
    </Container>
  );
}
