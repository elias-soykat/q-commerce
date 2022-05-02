import React, { useState } from "react";
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
      icon: "1",
      name: "Orders",
      func() {
        navigate("/orders");
      },
    },
    {
      icon: "2",
      name: "Profile",
      func() {
        navigate("/profile");
      },
    },
    {
      icon: "3",
      name: "Logout",
      func() {
        dispatch(logoutUser());
        return navigate("/auth/login");
      },
    },
  ];

  if (user?.role === "admin") {
    options.unshift({ icon: "4", name: "Dashboard" });
  }
  const userRouteHandler = (routeFunc) => {
    setClick(false);
    routeFunc();
  };

  return (
    <div className="mb-5 relative text-sm md:mr-12  md:my-0">
      <button
        onClick={(e) => setClick(!click)}
        className="flex items-center justify-center w-28 rounded font-medium py-2.5 text-white bg-gray-900"
      >
        {(user?.name || user?.user?.name)?.slice(0, 6)}
        <span className="ml-1">
          <CaretDown />
        </span>
      </button>
      {click && (
        <div className="absolute z-50 w-28 text-white text-center rounded-sm font-medium bg-gray-700">
          {options.map(({ name, icon, func }) => (
            <div
              to={name.toLowerCase()}
              key={name}
              onClick={() => userRouteHandler(func)}
              className="border-b py-3 text-xs  hover:bg-gray-500 block hover:border-b hover:border-b-gray-500"
            >
              {name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
