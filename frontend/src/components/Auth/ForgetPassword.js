import { useEffect, useState } from "react";
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
      <div className="mx-auto mt-16 mb-6 sm:w-10/12 md:my-20 md:w-8/12 lg:w-6/12 xl:w-5/12">
        <MetaData title="Forget Password | Q - Sneakers" />
        {loading && <Loading />}
        <form
          className="mt-8 rounded-md bg-white px-4 py-5 shadow sm:px-12 sm:py-14"
          onSubmit={forgetPasswordSubmit}
        >
          <h2 className="pt-8 pb-8 text-center text-2xl font-medium sm:pt-0 sm:pb-10">
            Forget Password
          </h2>

          {message && (
            <div className="mb-6 rounded-sm border-l-4 border-green-700 bg-green-200 py-3 pl-4 text-green-900 sm:mb-8">
              Email Send to:{" "}
              <span className="text-sm font-bold">{message.split(" ")[3]}</span>
            </div>
          )}

          {/* Email  */}
          <div className="mb-6 flex flex-col">
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
              className="inline-flex text-xs italic sm:text-sm "
            >
              Already have an account ?
            </Link>
          </div>

          <div className="my-6">
            <input
              type="submit"
              value="Forget Password"
              className="flex w-full cursor-pointer items-center justify-center rounded-md bg-gray-900 py-2.5 text-center text-sm font-medium text-white duration-500 hover:bg-gray-600 sm:text-base"
            />
          </div>
        </form>
      </div>
    </Container>
  );
}
