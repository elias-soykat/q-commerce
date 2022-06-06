import React from "react";
import { useSelector } from "react-redux";
import { RightArrow, TickMark } from "../assets/svg";
import { ProductCart } from "../components/Cart";
import noCart from "../assets/no-cart.png";
import { Link, useNavigate } from "react-router-dom";
import { MetaData } from "../helper";

export default function Cart() {
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);

  const totalPrice = cartItems.reduce((prev, curr) => {
    return prev + curr.price * curr.quantity;
  }, 0);

  return (
    <div className="container my-16 sm:mt-28">
      <MetaData title="Cart | Q - Commerce" />

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center pt-10 sm:py-14">
          <img src={noCart} alt="no product found" />
          <Link
            to="/products"
            className="my-10 px-5 text-center sm:px-7 py-3 flex items-center justify-between bg-gray-500 hover:bg-gray-400 text-white font-medium rounded-md"
          >
            View Products <RightArrow />
          </Link>
        </div>
      ) : (
        <>
          <div className="lg:flex py-4 sm:py-14">
            <div className="lg:w-3/4 py-6">
              {/* cart title  */}
              <div className="flex justify-between mx-4">
                <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                  Product
                </h3>
                <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
                  Quantity
                </h3>

                <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
                  Total
                </h3>
              </div>
              {cartItems.map((cart) => (
                <ProductCart key={cart.product} {...cart} />
              ))}
            </div>
            <div className="lg:w-1/4 px-6 md:px-8 py-2 md:py-6 flex flex-col justify-end lg:border-l border-gray-600">
              {cartItems.map(({ name, price, quantity, product }) => (
                <div key={product} className="flex justify-between py-3">
                  <p className="font-semibold text-sm">{name}</p>
                  <p className="font-semibold text-sm">${price * quantity}</p>
                </div>
              ))}

              <div className="border-t mt-6 border-gray-400">
                <div className="flex font-semibold justify-between text-lg py-6">
                  <span>Total cost</span>
                  <span>${totalPrice}</span>
                </div>
                <button
                  onClick={() => navigate("/auth/login?redirect=shipping")}
                  className="flex items-center justify-center w-full py-3 mt-3 font-bold duration-500 rounded-md text-white bg-gray-900 hover:bg-gray-600"
                  type="button"
                >
                  CHECKOUT
                  <RightArrow />
                </button>
              </div>
              <small className="text-sm mt-4 font-medium underline italic flex items-center">
                <TickMark /> Shipping & taxes calculated at checkout
              </small>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
