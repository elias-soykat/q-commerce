import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import simpleAvatar from "../../assets/avatar.png";
import {
  EmailIcon,
  GoogleIcon,
  NameIcon,
  PasswordLock,
} from "../../assets/svg";
import { Loading, MetaData } from "../../helper";
import { registerAction } from "../../redux/actions/userAction";
import { Input, Label } from "../Common";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    avatar: simpleAvatar,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setRegister((v) => ({ ...v, avatar: reader.result }));
        }
      };
      reader.readAsDataURL(files[0]);
    } else {
      setRegister((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const { name, email, password, avatar } = register;

  const registerSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);

    dispatch(registerAction(myForm));
  };

  const { isAuthenticated, loading, err } = useSelector((state) => state.user);

  useEffect(() => {
    if (err) {
      toast.error(err.message || err);
    }
    if (isAuthenticated) {
      navigate("/account");
    }
  }, [err, isAuthenticated, navigate]);

  return (
    <div className="mt-16 flex min-h-screen items-center justify-center bg-gray-100 md:mt-20 xl:mt-10 2xl:mt-0">
      <MetaData title="Register | Q - Sneakers" />
      {loading && <Loading />}
      <div className="flex w-full max-w-lg flex-col rounded-md bg-white px-6 py-6 shadow-md md:px-12 md:py-10 lg:px-14 lg:py-12">
        <button className="mb-2 flex items-center justify-center  rounded bg-gray-100 py-3">
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
        <form className="mt-8" onSubmit={registerSubmitHandler}>
          {/* Name  */}
          <div className="mb-5 flex flex-col">
            <Label f="name">Name</Label>
            <div className="relative">
              <Input
                type="text"
                name="name"
                value={name}
                plc="Enter Your Name"
                icon={<NameIcon />}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Email  */}
          <div className="mb-5 flex flex-col">
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
          </div>

          {/* Password  */}

          <div className="mb-5 flex flex-col">
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

          {/* File  */}

          <div className="mb-5 flex flex-col">
            <Label f="avatar">Upload Avatar</Label>
            <div className="mt-1 flex justify-between">
              <img width="11%" src={avatar} alt="user" />
              <div className="relative rounded-lg duration-500 hover:bg-gray-100">
                <input
                  type="file"
                  onChange={handleInputChange}
                  name="avatar"
                  accept="image/*"
                  required
                  className="w-full rounded-lg py-2 pl-11 text-sm placeholder-gray-500 placeholder:italic focus:border-gray-600 focus:outline-none"
                  placeholder="Your File"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end">
            <Link
              to="/password/forget"
              className="inline-flex text-xs italic sm:text-sm"
            >
              Forgot Your Password ?
            </Link>
          </div>

          <div className="my-6">
            <input
              type="submit"
              value="Register"
              className="flex w-full cursor-pointer items-center justify-center rounded-md bg-gray-900 py-3 text-center text-sm font-medium text-white duration-500 hover:bg-gray-600 sm:text-base"
            />
          </div>
        </form>
        <div className="flex items-center justify-center">
          <Link
            to="/auth/login"
            className="pt-1 text-center text-xs font-medium"
          >
            Already have an account ?
          </Link>
        </div>
      </div>
    </div>
  );
}
