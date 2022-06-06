import React from "react";
import { Link } from "react-router-dom";
import successMsg from "../../assets/order-success.png";

export default function OrderSuccess() {
  return (
    <section className="mt-14 mb-20 py-20 flex flex-col items-center justify-center">
      <img src={successMsg} alt="order success" />

      <div className="flex flex-col justify-center items-center">
        <h3 className="text-2xl sm:text-3xl font-medium my-4 text-center">
          Your Order has been Placed Successfully
        </h3>

        <Link
          className="mt-6 py-3 px-8 bg-gray-800 hover:bg-gray-600 duration-300 text-white font-medium rounded-md"
          to="/orders/user"
        >
          View Orders
        </Link>
      </div>
    </section>
  );
}
