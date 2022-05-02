import React from "react";
import { MinusIcon, PlusIcon, RightArrow } from "../assets/svg";
import { Button } from "../components/Common";

let data = [1, 2, 3];

export default function Cart() {
  return (
    <div className="container my-16 sm:mt-28">
      <div className="lg:flex my-10">
        <div className="lg:w-3/4 px-2 sm:px-6 md:px-8 py-10">
          <div className="flex justify-between  pb-6">
            <h1 className="font-medium sm:font-semibold text-xl sm:text-2xl">
              Shopping Cart
            </h1>
            <h2 className="font-medium sm:font-semibold text-xl sm:text-2xl">
              3 Items
            </h2>
          </div>
          <div className="flex">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
              Details
            </h3>
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
              Quantity
            </h3>
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
              Price
            </h3>
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
              Total
            </h3>
          </div>

          {data.map((cart) => (
            <div
              key={cart}
              className="flex items-center border-b border-gray-400 py-7"
            >
              <div className="flex flex-col items-center pt-2 md:flex-row w-2/5 ">
                <div className="w-20">
                  <img
                    className="h-24 rounded-md"
                    src="https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                    alt=""
                  />
                </div>
                <div className="flex flex-col justify-between text-center md:text-left md:ml-4 my-2 grow">
                  <span className="font-bold text-sm">Xiaomi Mi 20000mAh</span>
                  <span className="text-sm text-gray-500 mt-1">Xiaomi</span>
                  <a
                    href="/"
                    className="font-semibold text-red-500 text-xs mt-1"
                  >
                    Remove
                  </a>
                </div>
              </div>
              <div className="flex flex-col items-center sm:flex-row justify-center w-1/5 ">
                <span className="mb-2 sm:mb-0">
                  <MinusIcon />
                </span>
                <input
                  className="mx-2 text-center border w-8 text-sm"
                  type="text"
                  value="10"
                  disabled
                />
                <span className="mt-2 sm:mt-0">
                  <PlusIcon />
                </span>
              </div>
              <span className="text-center w-1/5 font-semibold text-sm">
                $40.00
              </span>
              <span className="text-center w-1/5 font-semibold text-sm">
                $40.00
              </span>
            </div>
          ))}
        </div>

        <div className="lg:w-1/4 px-6 md:px-8 py-2 md:py-8 flex flex-col justify-end lg:border-l border-gray-600">
          <div className="flex justify-between my-4">
            <p className="font-semibold text-sm uppercase">Items 3</p>
            <p className="font-semibold text-sm">590$</p>
          </div>
          <div className="flex justify-between my-4">
            <p className="font-semibold text-sm uppercase">Items 3</p>
            <p className="font-semibold text-sm">590$</p>
          </div>

          <div className="border-t mt-6">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Total cost</span>
              <span>$600</span>
            </div>
            <Button size="flex items-center justify-center w-full py-3.5 text-md mt-3">
              <span className="uppercase">Checkout</span>
              <RightArrow />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
