import React, { useState } from "react";
import {
  CartIcon,
  CloseNavBar,
  NameIcon,
  NavHamburger,
  SearchIcon,
} from "../../assets/svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { Loading } from "../../helper";
import { DropDown } from "../Utils";

export default function NavBar() {
  const [toggle, setToggle] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();

  const { productsList, productDetails, user } = useSelector((state) => state);

  const errCheck = productsList.err || productDetails.err;

  errCheck &&
    toast.error(errCheck, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      draggable: false,
    });

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
  return (
    <>
      <nav className="backdrop-blur-sm bg-white/90 shadow z-50 fixed w-full top-0">
        {user?.loading && <Loading />}
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
                      className="w-full py-2 px-4 text-gray-700 bg-white rounded-md focus:outline-none"
                      placeholder="Search"
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
                  to="/products"
                  className="mb-5 text-sm text-gray-700 duration-300 hover:text-blue-600 md:mr-12  md:my-0"
                >
                  Products
                </NavLink>
                <NavLink
                  to="/cart"
                  className="mb-5 text-sm text-gray-700 duration-300 hover:text-blue-600 md:mr-12  md:my-0"
                >
                  Cart
                </NavLink>
                {user?.user && user ? (
                  <DropDown user={user} />
                ) : (
                  <NavLink
                    to="auth/login"
                    className="mb-5 text-sm duration-300 md:mr-12  md:my-0 px-6 py-2 rounded font-medium text-white bg-gray-900 hover:bg-gray-600"
                  >
                    Login
                  </NavLink>
                )}
              </div>

              <div className="flex items-center py-2 -mx-1 md:mx-0">
                <Link to="/cart">
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
      {errCheck && <ToastContainer limit={1} />}
    </>
  );
}
