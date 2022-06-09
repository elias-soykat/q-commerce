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
        navigate("/admin/dashboard");
      },
    });
  }

  const userRouteHandler = (routeFunc) => {
    setClick(false);
    routeFunc();
  };

  return (
    <div className="relative mb-5 text-sm md:my-0  md:mr-12">
      <Toaster />
      <button
        onClick={() => setClick(!click)}
        className="flex w-28 items-center justify-center rounded bg-gray-900 py-2.5 font-medium text-white"
      >
        {user?.name.slice(0, 6)}
        <span className="pl-2">
          <CaretDown />
        </span>
      </button>
      {click && (
        <div className="absolute z-50 w-28 rounded-b-md bg-gray-700 text-left font-medium text-white">
          {options.map(({ name, func }) => (
            <div
              key={name}
              onClick={() => userRouteHandler(func)}
              className="block cursor-pointer border-b py-3 text-center  text-xs hover:border-b hover:border-b-gray-500 hover:bg-gray-500"
            >
              {name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
