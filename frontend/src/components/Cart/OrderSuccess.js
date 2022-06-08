import React from "react";
import { Link } from "react-router-dom";
import successMsg from "../../assets/order-success.png";

export default function OrderSuccess() {
  return (
    <section className="mt-14 mb-20 flex flex-col items-center justify-center py-20">
      <img src={successMsg} alt="order success" />

      <div className="flex flex-col items-center justify-center">
        <h3 className="my-4 text-center text-2xl font-medium sm:text-3xl">
          Your Order has been Placed Successfully
        </h3>

        <Link
          className="mt-6 rounded-md bg-gray-800 py-3 px-8 font-medium text-white duration-300 hover:bg-gray-600"
          to="/orders"
        >
          View Orders
        </Link>
      </div>
    </section>
  );
}
