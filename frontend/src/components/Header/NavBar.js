import React, { useEffect, useState } from "react";
import {
  CartIcon,
  CloseNavBar,
  NameIcon,
  NavHamburger,
  SearchIcon,
} from "../../assets/svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { DropDown } from "../Utils";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

export default function NavBar() {
  const [toggle, setToggle] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();

  const { productsList, user, cart } = useSelector((state) => state);

  const handleSubmit = (e) => {
    e.preventDefault();

    let trimmedKeyword = searchKeyword && searchKeyword.trim();

    if (trimmedKeyword) {
      navigate(`/products/${trimmedKeyword}`);
      setSearchKeyword((trimmedKeyword = ""));
    } else {
      navigate("/products");
    }
  };

  let errStatus = productsList.err;

  useEffect(() => {
    if (errStatus) {
      toast.error(errStatus.message || errStatus);
    }
  }, [errStatus]);

  return (
    <>
      <Toaster />
      <nav className="backdrop-blur-sm text bg-white/90 shadow z-50 fixed w-full top-0">
        <div className="container px-4 py-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <NavLink
                  to="/"
                  className="text-xl font-semibold lg:text-2xl text-gray-800 "
                >
                  Q-Commerce
                </NavLink>

                <div className="hidden mx-10 md:block">
                  <form className="flex items-center border border-gray-400 bg-white pr-4 rounded">
                    <input
                      type="text"
                      className="w-full py-2 px-5 text-gray-700 bg-white text-sm rounded-md focus:outline-none"
                      placeholder="Search.."
                      name="search"
                      onChange={(e) => setSearchKeyword(e.target.value)}
                      value={searchKeyword}
                      required
                    />
                    <button onClick={handleSubmit} className="cursor-pointer">
                      <SearchIcon />
                    </button>
                  </form>
                </div>
              </div>
              <div className="flex md:hidden">
                <button onClick={() => setToggle(!toggle)} type="button">
                  {!toggle && <CloseNavBar />}
                </button>
                <button onClick={() => setToggle(!toggle)} type="button">
                  {toggle && <NavHamburger />}
                </button>
              </div>
            </div>

            <div className={`items-center md:flex ${toggle && "hidden"}`}>
              <div className="flex flex-col mt-2 md:flex-row md:mt-0 md:mx-1 items-center">
                <NavLink
                  to="/"
                  className="my-5 text-sm text-gray-700 duration-300 hover:text-blue-600 md:mr-12  md:my-0"
                >
                  Home
                </NavLink>
                <NavLink
                  to="/password/update"
                  className="my-5 text-sm text-gray-700 duration-300 hover:text-blue-600 md:mr-12  md:my-0"
                >
                  Update Password
                </NavLink>
                <NavLink
                  to="/products"
                  className="mb-5 text-sm text-gray-700 duration-300 hover:text-blue-600 md:mr-12  md:my-0"
                >
                  Products
                </NavLink>
                <NavLink
                  to="/password/reset/token"
                  className="mb-5 text-sm text-gray-700 duration-300 hover:text-blue-600 md:mr-12  md:my-0"
                >
                  Reset
                </NavLink>
                <NavLink
                  to="/password/forget"
                  className="mb-5 text-sm text-gray-700 duration-300 hover:text-blue-600 md:mr-12  md:my-0"
                >
                  Forget password
                </NavLink>
                <NavLink
                  to="auth/login"
                  className="mb-5 text-sm text-gray-700 duration-300 hover:text-blue-600 md:mr-12  md:my-0"
                >
                  Login
                </NavLink>
                {user.isAuthenticated ? (
                  <DropDown {...user} />
                ) : (
                  <NavLink
                    to="auth/login"
                    className="mb-5 md:mr-12 md:my-0  text-sm duration-300 px-10 py-2.5 rounded font-medium text-white bg-gray-900 hover:bg-gray-600"
                  >
                    Login
                  </NavLink>
                )}
              </div>
              <div className="flex items-center py-2 -mx-1 md:mx-0">
                <Link to="/cart" className="relative">
                  <span className="absolute left-4 bottom-3 bg-black text-white px-1.5 py-0.5 text-xs rounded-full">
                    {cart.cartItems.length}
                  </span>
                  <CartIcon />
                </Link>
                <Link to="/auth/login" className="ml-7">
                  <NameIcon color="#000" w="26" />
                </Link>
              </div>

              <div className="mt-4 mb-2 md:hidden">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <SearchIcon />
                  </span>

                  <input
                    type="text"
                    className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Search"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
