import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { EmailIcon, GoogleIcon, PasswordLock } from "../../assets/svg";
import { Loading, MetaData } from "../../helper";
import { clearErrors, loginAction } from "../../redux/actions/userAction";
import { Input, Label } from "../Common";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, loading, err } = useSelector((state) => state.user);

  const [login, setLogin] = useState({
    email: "user@gmail.com",
    password: "123456",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const { email, password } = login;

  const loginSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(loginAction(email, password));
  };

  const search = location.search;
  const redirect = search ? `/${search.split("=")[1]}` : "/account";

  useEffect(() => {
    if (err) {
      toast.error(err.message || err);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, err, isAuthenticated, navigate, redirect]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <MetaData title="Login | Q - Sneakers" />
      {loading && <Loading />}
      <div className="flex w-full max-w-lg flex-col rounded-md bg-white px-6 py-8 shadow-md md:px-12 md:py-12 lg:px-14 lg:py-14">
        <button className="my-8 flex items-center justify-center  rounded bg-gray-100 py-3">
          <GoogleIcon />
          <h3 className="ml-4 font-medium">Login with Google</h3>
        </button>
        <div className="relative mt-8 h-px bg-gray-400">
          <div className="absolute left-0 top-0 -mt-2 flex w-full justify-center">
            <span className="bg-white px-4 text-xs uppercase text-gray-500">
              Or Login With Email
            </span>
          </div>
        </div>
        <form className="mt-10" onSubmit={loginSubmitHandler}>
          {/* Email  */}

          <div className="mb-7 flex flex-col">
            <Label f="email">E-Mail Address</Label>
            <div className="relative">
              <Input
                type="email"
                name="email"
                value={email}
                plc="Enter Your Email"
                icon={<EmailIcon />}
                onChange={handleInputChange}
              />
            </div>
            <small className="pt-1.5 font-normal italic">
              for admin : admin@gmail.com
            </small>
          </div>

          {/* Password  */}

          <div className="mb-7 flex flex-col">
            <Label f="password">Password</Label>
            <div className="relative">
              <Input
                type="password"
                name="password"
                value={password}
                plc="Enter Your Password"
                icon={<PasswordLock />}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="-mt-4 flex items-center">
            <div className="ml-auto flex">
              <Link
                to="/password/forget"
                className="inline-flex pt-2 text-xs italic sm:text-sm"
              >
                Forgot Your Password ?
              </Link>
            </div>
          </div>

          <div className="mt-8">
            <input
              type="submit"
              value="Login"
              className="flex w-full cursor-pointer items-center justify-center rounded-md bg-gray-900 py-3 text-center text-sm font-medium text-white duration-500 hover:bg-gray-600 sm:text-base"
            />
          </div>
        </form>
        <div className="mt-6 flex items-center justify-center">
          <Link
            to="/auth/register"
            className="pt-1 text-center text-xs font-medium"
          >
            You don't have an account ?
          </Link>
        </div>
      </div>
    </div>
  );
}
