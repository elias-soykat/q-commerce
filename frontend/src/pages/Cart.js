import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import noCart from "../assets/no-cart.png";
import { RightArrow, TickMark } from "../assets/svg";
import { ProductCart } from "../components/Cart";
import { MetaData } from "../helper";

export default function Cart() {
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);

  const totalPrice = cartItems.reduce((prev, curr) => {
    return prev + curr.price * curr.quantity;
  }, 0);

  return (
    <div className="container my-16 sm:mt-28">
      <MetaData title="Cart | Q - Sneakers" />

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center pt-10 sm:py-14">
          <img src={noCart} alt="no product found" />
          <Link
            to="/products"
            className="my-10 flex items-center justify-between rounded-md bg-gray-500 px-5 py-3 text-center font-medium text-white hover:bg-gray-400 sm:px-7"
          >
            View Products <RightArrow />
          </Link>
        </div>
      ) : (
        <>
          <div className="py-4 sm:py-14 lg:flex">
            <div className="py-6 lg:w-3/4">
              {/* cart title  */}
              <div className="mx-4 flex justify-between">
                <h3 className="w-2/5 text-xs font-semibold uppercase text-gray-600">
                  Product
                </h3>
                <h3 className="w-1/5 text-center text-xs font-semibold uppercase text-gray-600">
                  Quantity
                </h3>

                <h3 className="w-1/5 text-center text-xs font-semibold uppercase text-gray-600">
                  Total
                </h3>
              </div>
              {cartItems.map((cart) => (
                <ProductCart key={cart.product} {...cart} />
              ))}
            </div>
            <div className="flex flex-col justify-end border-gray-600 px-6 py-2 md:px-8 md:py-6 lg:w-1/4 lg:border-l">
              {cartItems.map(({ name, price, quantity, product }) => (
                <div key={product} className="flex justify-between py-3">
                  <p className="text-sm font-semibold">{name}</p>
                  <p className="text-sm font-semibold">${price * quantity}</p>
                </div>
              ))}

              <div className="mt-6 border-t border-gray-400">
                <div className="flex justify-between py-6 text-lg font-semibold">
                  <span>Total cost</span>
                  <span>${totalPrice}</span>
                </div>
                <button
                  onClick={() => navigate("/auth/login?redirect=shipping")}
                  className="mt-3 flex w-full items-center justify-center rounded-md bg-gray-900 py-3 font-bold text-white duration-500 hover:bg-gray-600"
                  type="button"
                >
                  CHECKOUT
                  <RightArrow />
                </button>
              </div>
              <small className="mt-4 flex items-center text-sm font-medium italic underline">
                <TickMark /> Shipping & taxes calculated at checkout
              </small>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
