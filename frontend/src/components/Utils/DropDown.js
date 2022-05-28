import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CaretDown } from "../../assets/svg";
import { logoutUser } from "../../redux/actions/userAction";

export default function DropDown({ user }) {
  const [click, setClick] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const options = [
    {
      name: "Orders",
      func() {
        navigate("/orders");
      },
    },
    {
      name: "Profile",
      func() {
        navigate("/account");
      },
    },
    {
      name: "Logout",
      func() {
        dispatch(logoutUser());
        toast.success("Logout Successfully");
      },
    },
  ];

  if (user.role === "admin") {
    options.unshift({
      name: "Dashboard",
      func() {
        navigate("/dashboard");
      },
    });
  }

  const userRouteHandler = (routeFunc) => {
    setClick(false);
    routeFunc();
  };

  return (
    <div className="mb-5 relative text-sm md:mr-12  md:my-0">
      <Toaster />
      <button
        onClick={() => setClick(!click)}
        className="flex items-center justify-center w-28 rounded font-medium py-2.5 text-white bg-gray-900"
      >
        {user?.name.slice(0, 6)}
        <span className="pl-2">
          <CaretDown />
        </span>
      </button>
      {click && (
        <div className="absolute z-50 w-28 text-white text-left rounded-b-md font-medium bg-gray-700">
          {options.map(({ name, func }) => (
            <div
              key={name}
              onClick={() => userRouteHandler(func)}
              className="cursor-pointer border-b py-3 text-center text-xs  hover:bg-gray-500 block hover:border-b hover:border-b-gray-500"
            >
              {name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
