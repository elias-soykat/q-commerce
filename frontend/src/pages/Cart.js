import React from "react";
import { useSelector } from "react-redux";
import { RightArrow } from "../assets/svg";
import { ProductCart } from "../components/Cart";
import { Button } from "../components/Common";
import noProduct from "../assets/no-product.png";

export default function Cart() {
  const { cartItems } = useSelector((state) => state.cart);

  console.log(cartItems);
  return (
    <div className="container my-16 sm:mt-28">
      {cartItems.length === 0 ? (
        <div className="border-2">
          <img src={noProduct} alt="no product found" />
        </div>
      ) : (
        <div className="lg:flex my-10">
          <div className="lg:w-3/4 py-10 sm:py-16">
            {/* cart title  */}
            <div className="flex justify-between ml-4 sm:ml-0">
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                Details
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
          <div className="lg:w-1/4 px-6 md:px-8 py-2 md:py-8 flex flex-col justify-end lg:border-l border-gray-600">
            <div className="flex justify-between my-3">
              <p className="font-semibold text-sm">Items 3</p>
              <p className="font-semibold text-sm">590$</p>
            </div>
            <div className="flex justify-between my-3">
              <p className="font-semibold text-sm">Items 3</p>
              <p className="font-semibold text-sm">590$</p>
            </div>

            <div className="border-t mt-6 border-gray-400">
              <div className="flex font-semibold justify-between py-6">
                <span>Total cost</span>
                <span>$600</span>
              </div>
              <Button size="flex items-center justify-center w-full py-3 text-md mt-2">
                <span className="uppercase">Checkout</span>
                <RightArrow />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
