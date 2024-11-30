import bannerImg from "../../assets/header.jpg";
import { RightArrow } from "../../assets/svg";

export default function Banner() {
  return (
    <section className="relative sm:px-2 lg:px-4">
      <img
        className="absolute inset-0 h-full w-full object-cover object-[75%] sm:object-[25%]"
        src={bannerImg}
        alt="banner img"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent "></div>
      <div className="relative mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="max-w-xl text-left">
          <div className="text-white">
            <p className="uppercase">brand new</p>
            <h1 className="py-2 text-3xl font-extrabold sm:py-7 sm:text-5xl">
              SHOP YOUR FAVORITE
            </h1>
            <h1 className="text-4xl font-extrabold tracking-wide sm:text-5xl md:text-6xl">
              SNEAKER STYLE
            </h1>
          </div>

          <p className="mt-4 max-w-lg text-white sm:text-xl sm:leading-relaxed ">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
            illo tenetur fuga ducimus numquam ea!
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-center">
           
            <button className="flex w-full rounded-md bg-gray-600 px-7 py-5 text-center   text-sm font-medium text-white duration-500 hover:bg-gray-500 sm:w-auto md:mx-0 md:w-auto">
              Get Started &nbsp; <RightArrow />
            </button>



            <button
              type="button"
              className="block w-full rounded bg-white px-12 py-5 text-sm font-medium shadow duration-200 hover:bg-slate-200 focus:outline-none sm:w-auto"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
