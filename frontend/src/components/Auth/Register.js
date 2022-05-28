import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  EmailIcon,
  GoogleIcon,
  NameIcon,
  PasswordLock,
} from "../../assets/svg";
import { Input, Label } from "../Common";
import { Loading, MetaData } from "../../helper";
import { registerAction } from "../../redux/actions/userAction";
import simpleAvatar from "../../assets/avatar.png";
import toast from "react-hot-toast";

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
    <div className="min-h-screen flex mt-16 md:mt-20 xl:mt-10 2xl:mt-0 items-center justify-center bg-gray-100">
      <MetaData title="Register | Q - Commerce" />
      {loading && <Loading />}
      <div className="w-full max-w-lg flex flex-col shadow-md px-6 md:px-12 lg:px-14 py-6 md:py-10 lg:py-12 rounded-md bg-white">
        <button className="flex items-center justify-center mb-2  rounded py-3 bg-gray-100">
          <GoogleIcon />
          <h3 className="ml-4 font-medium">Login with Google</h3>
        </button>
        <div className="relative mt-8 h-px bg-gray-400">
          <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
            <span className="bg-white px-4 text-xs text-gray-500 uppercase">
              Or Login With Email
            </span>
          </div>
        </div>
        <form className="mt-8" onSubmit={registerSubmitHandler}>
          {/* Name  */}
          <div className="flex flex-col mb-5">
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
          <div className="flex flex-col mb-5">
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

          <div className="flex flex-col mb-5">
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

          <div className="flex flex-col mb-5">
            <Label f="avatar">Upload Avatar</Label>
            <div className="flex justify-between mt-1">
              <img width="11%" src={avatar} alt="user" />
              <div className="relative duration-500 hover:bg-gray-100 rounded-lg">
                <input
                  type="file"
                  onChange={handleInputChange}
                  name="avatar"
                  accept="image/*"
                  required
                  className="text-sm placeholder:italic placeholder-gray-500 pl-11 rounded-lg w-full py-2 focus:outline-none focus:border-gray-600"
                  placeholder="Your File"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end">
            <Link
              to="/password/forget"
              className="inline-flex text-xs sm:text-sm italic"
            >
              Forgot Your Password ?
            </Link>
          </div>

          <div className="my-6">
            <input
              type="submit"
              value="Register"
              className="cursor-pointer w-full py-2.5 flex items-center justify-center text-sm sm:text-base font-medium text-center duration-500 rounded-md text-white bg-gray-900 hover:bg-gray-600"
            />
          </div>
        </form>
        <div className="flex justify-center items-center">
          <Link
            to="/auth/login"
            className="pt-1 font-medium text-xs text-center"
          >
            Already have an account ?
          </Link>
        </div>
      </div>
    </div>
  );
}
