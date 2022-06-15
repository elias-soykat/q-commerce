import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  CartIcon,
  CloseNavBar,
  NameIcon,
  NavHamburger,
  SearchIcon,
} from "../../assets/svg";
import { DropDown } from "../Utils";

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

  const isCartLength = cart?.cartItems.length;

  return (
    <>
      <Toaster />
      <nav className="text fixed top-0 z-50 w-full bg-white/90 shadow backdrop-blur-sm">
        <div className="container px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <NavLink
                  to="/"
                  className="text-xl font-semibold text-gray-800 lg:text-2xl "
                >
                  Q-Sneakers
                </NavLink>

                <div className="mx-10 hidden md:block">
                  <form className="flex items-center rounded border border-gray-300 bg-white pr-4">
                    <input
                      type="text"
                      className="w-full rounded-md bg-white py-2 px-5 text-sm text-gray-700 focus:outline-none"
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
              <div className="mt-2 flex flex-col items-center md:mx-1 md:mt-0 md:flex-row">
                <NavLink
                  to="/"
                  className="my-5 text-sm text-gray-700 duration-300 hover:text-blue-600 md:my-0  md:mr-12"
                >
                  Home
                </NavLink>
                <NavLink
                  to="/products"
                  className="mb-5 text-sm text-gray-700 duration-300 hover:text-blue-600 md:my-0  md:mr-12"
                >
                  Products
                </NavLink>
                <button
                  type="button"
                  onClick={() =>
                    toast.loading("This feature is coming soon", {
                      duration: 3000,
                    })
                  }
                  className="mb-5 text-sm text-gray-700 duration-300 hover:text-blue-600 md:my-0  md:mr-12"
                >
                  English / বাংলা
                </button>
                {user.isAuthenticated ? (
                  <DropDown {...user} />
                ) : (
                  <NavLink
                    to="auth/login"
                    className="mb-5 rounded bg-gray-900  px-10 py-2.5 text-sm font-medium text-white duration-300 hover:bg-gray-600 md:my-0 md:mr-12"
                  >
                    Login
                  </NavLink>
                )}
              </div>
              <div className="-mx-1 flex items-center justify-center py-2 md:mx-0">
                <Link to="/cart" className="relative">
                  {isCartLength > 0 && (
                    <span className="absolute left-4 bottom-3 rounded-full bg-black px-1.5 py-0.5 text-xs text-white">
                      {isCartLength}
                    </span>
                  )}
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
                    className="w-full rounded-md border bg-white py-2 pl-10 pr-4 text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
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
