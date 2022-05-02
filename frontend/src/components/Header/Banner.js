import React from "react";
import { Button } from "../Common";

export default function Banner() {
  return (
    <section className="relative sm:px-2 lg:px-4">
      <img
        className="absolute inset-0 object-[75%] sm:object-[25%] object-cover w-full h-full"
        src="https://minimog.thememove.com/wp-content/uploads/2022/01/h_sneaker_slide_02.jpg"
        alt="bg header"
      />
      <div className="hidden sm:block sm:inset-0 sm:absolute sm:bg-gradient-to-r sm:from-gray-900 sm:to-transparent"></div>
      <div className="relative max-w-screen-xl px-4 py-32 mx-auto lg:h-screen lg:items-center lg:flex">
        <div className="max-w-xl text-left">
          <div className="text-white">
            <p className="uppercase">brand new</p>
            <h1 className="py-2 sm:py-7 text-3xl font-extrabold sm:text-5xl">
              SHOP YOUR FAVORITE
            </h1>
            <h1 className="tracking-wide text-4xl sm:text-5xl md:text-6xl font-extrabold">
              OUTFIT STYLE
            </h1>
          </div>

          <p className="max-w-lg mt-4 sm:leading-relaxed sm:text-xl text-white ">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
            illo tenetur fuga ducimus numquam ea!
          </p>

          <div className="flex flex-wrap gap-4 mt-8 text-center">
            <Button size="block w-full px-12 py-4 font-medium md:mx-0 md:w-auto md:w-auto sm:w-auto">
              Get Started
            </Button>

            <button
              type="button"
              className="block w-full px-12 py-4 text-sm font-medium duration-200 bg-white hover:bg-slate-200 rounded shadow sm:w-auto focus:outline-none"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
