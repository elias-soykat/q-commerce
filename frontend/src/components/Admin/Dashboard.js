import React from "react";
import { MetaData } from "../../helper";
import Sidebar from "./Sidebar";

export default function Dashboard() {
  return (
    <section className="container my-20">
      <MetaData title="Dashboard | Q Commerce " />
      <div className="overflow-hidden">
        <Sidebar />
        <div className="my-4 flex flex-col sm:my-0 md:ml-[300px]">
          <h3 className="my-10 text-center text-2xl font-medium sm:text-4xl">
            Dashboard
          </h3>
          <h3 className="my-3 bg-slate-500 py-6 text-center text-lg font-medium leading-8 text-white sm:text-xl">
            Total Amount <br /> $ 33
          </h3>

          <div className="my-8 flex flex-wrap items-center justify-evenly">
            <div className="m-2 flex h-32 w-32 items-center justify-center rounded-full border bg-teal-600 p-6 text-center font-medium text-white">
              Product 50
            </div>
            <div className="m-2 flex h-32 w-32 items-center justify-center rounded-full border bg-orange-600 p-6  text-center font-medium text-white">
              Orders 40
            </div>
            <div className="m-2 flex h-32 w-32 items-center justify-center rounded-full border bg-violet-500 p-6 text-center  font-medium text-white">
              Users 30
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
