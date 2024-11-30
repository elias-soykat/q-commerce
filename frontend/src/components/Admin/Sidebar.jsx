import React from "react";
import { Link } from "react-router-dom";
import dashboard from "../../assets/dashboard/dashboard.svg";
import orders from "../../assets/dashboard/orders.svg";
import products from "../../assets/dashboard/products.svg";
import reviews from "../../assets/dashboard/reviews.svg";
import users from "../../assets/dashboard/users.svg";
import { CaretDown } from "../../assets/svg";

export default function Sidebar() {
  const [active, setActive] = React.useState(false);
  return (
    <div className="fixed left-10 z-10 hidden h-screen w-[300px] border-r border-r-gray-400 bg-white md:block">
      <div className="my-4 flex flex-col items-center justify-center sm:my-8">
        <div className="my-6  flex w-32 items-center justify-between">
          <img src={dashboard} alt="sidebar icon" />
          <Link to="/admin/dashboard" className="pl-3">
            Dashboard
          </Link>
        </div>
        <div className="relative my-6  flex w-32 items-center justify-between">
          <img src={products} alt="sidebar icon" className="ml-1.5" />
          <h1
            onClick={() => setActive(!active)}
            className="flex cursor-pointer pl-4"
          >
            Products <CaretDown color="bg-slate-600" />
          </h1>

          {active && (
            <div className="absolute top-10 left-3 cursor-pointer space-y-2 bg-white px-1.5 py-3 underline shadow-lg">
              <Link to="/admin/products" className="block text-sm">
                All Products
              </Link>
              <Link to="/admin/product/create" className="block text-sm">
                Create Product
              </Link>
            </div>
          )}
        </div>
        <div className="my-6  flex w-32 items-center justify-between">
          <img src={orders} alt="sidebar icon" />
          <Link to="/admin/orders" className="pr-[22px]">
            Orders
          </Link>
        </div>
        <div className="my-6 flex  w-32 items-center justify-between">
          <img src={users} alt="sidebar icon" />
          <Link to="/admin/users" className="pr-[29px]">
            Users
          </Link>
        </div>
        <div className="my-6 flex  w-32 items-center justify-between">
          <img src={reviews} alt="sidebar icon" className="ml-1" />
          <h1 className="pr-[12px]">Reviews</h1>
        </div>
      </div>
    </div>
  );
}
