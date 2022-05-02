import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { EmailIcon, GoogleIcon, NameIcon, PasswordLock } from "../assets/svg";
import { Input, Label } from "../components/Common";
import { Loading } from "../helper";
import { registerAction } from "../redux/actions/userAction";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [avatar, setAvatar] = useState(
    "https://img.icons8.com/ios/80/000000/user-male-circle.png"
  );

  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(files[0]);
    } else {
      setRegister({ ...register, [name]: value });
    }
  };

  const { name, email, password } = register;

  const submitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);

    dispatch(registerAction(myForm));
  };

  const { isAuthenticated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated) {
      return navigate("/account");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex mt-16 md:mt-20 xl:mt-10 2xl:mt-0 items-center justify-center bg-gray-100">
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
        <form className="mt-8" onSubmit={submitHandler}>
          {/* Email  */}

          <div className="flex flex-col mb-5">
            <Label f="name">Name</Label>
            <div className="relative">
              <Input
                icon={<NameIcon />}
                name="name"
                plc="Your Name"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex flex-col mb-5">
            <Label f="email">E-Mail Address</Label>
            <div className="relative">
              <Input
                icon={<EmailIcon />}
                name="email"
                plc="Your Email"
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Password  */}

          <div className="flex flex-col mb-5">
            <Label f="password">Password</Label>
            <div className="relative">
              <Input
                icon={<PasswordLock />}
                name="password"
                plc="Your Password"
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* File  */}

          <div className="flex flex-col mb-5">
            <Label f="password">Upload Avatar</Label>
            <div className="flex justify-between mt-1">
              <img width="11%" src={avatar} alt="user" />
              <div className="relative duration-500 hover:bg-gray-100 rounded-lg">
                <Input
                  name="file"
                  plc="Your Password"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end">
            <a
              href="/"
              className="inline-flex text-xs sm:text-sm italic border-b"
            >
              Forgot Your Password ?
            </a>
          </div>

          <div className="my-6">
            <input
              type="submit"
              value="Register"
              className="cursor-not-allowed w-full py-2.5 flex items-center justify-center text-sm sm:text-base font-medium text-center duration-500 rounded-md text-white bg-gray-900 hover:bg-gray-600"
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
