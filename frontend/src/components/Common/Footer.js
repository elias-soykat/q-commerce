import { useLocation } from "react-router-dom";
import { FooterIcon } from "../../assets/footer";
import Container from "./Container";

export default function Footer() {
  const { pathname: path } = useLocation();
  const updatePage = path.split("/")[3];
  const orderPage = path.split("/")[2];

  const checkPath =
    path !== "/admin/dashboard" &&
    path !== "/admin/products" &&
    path !== "/admin/product/create" &&
    path !== "/admin/orders" &&
    path !== "/admin/users" &&
    path !== "/admin/review" &&
    updatePage !== "update" &&
    orderPage !== "order";

  return (
    checkPath && (
      <>
        <Container bg="bg-gray-900">
          <div className="mt-8 grid grid-cols-2 gap-8 sm:px-2 lg:mt-0 lg:grid-cols-5 lg:gap-y-10">
            <div className="col-span-2">
              <div>
                <h2 className="text-2xl font-bold text-white md:text-3xl">
                  Get the latest news!
                </h2>
                <p className="mt-6 text-gray-500">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse
                  non cupiditate quae nam molestias.
                </p>
              </div>
            </div>

            <div className="col-span-2 lg:col-span-3 lg:flex lg:items-end"></div>

            <div className="col-span-2 border-t border-white/10 pt-7 sm:col-span-1">
              <p className="font-bold text-white sm:text-lg"> Services </p>

              <nav className="mt-8 flex flex-col space-y-4 text-sm text-gray-300">
                <p className="cursor-pointer hover:underline">1on1 Coaching</p>
                <p className="cursor-pointer hover:underline">Company Review</p>
                <p className="cursor-pointer hover:underline">
                  Accounts Review
                </p>
              </nav>
            </div>

            <div className="col-span-2 border-t border-white/10 pt-7 sm:col-span-1">
              <p className="font-bold text-white sm:text-lg"> Company </p>

              <nav className="mt-8 flex flex-col space-y-4 text-sm text-gray-300">
                <p className="cursor-pointer hover:underline">About</p>
                <p className="cursor-pointer hover:underline">Meet the Team</p>
                <p className="cursor-pointer hover:underline">History</p>
              </nav>
            </div>

            <div className="col-span-2 border-t border-white/10 pt-7 sm:col-span-1">
              <p className="font-bold text-white sm:text-lg"> Helpful Links </p>

              <nav className="mt-8 flex flex-col space-y-4 text-sm text-gray-300">
                <p className="cursor-pointer hover:underline">Contact</p>
                <p className="cursor-pointer hover:underline">FAQs</p>
                <p className="cursor-pointer hover:underline">Live Chat</p>
              </nav>
            </div>

            <div className="col-span-2 border-t border-white/10 pt-7 sm:col-span-1">
              <p className="font-bold text-white sm:text-lg"> Legal </p>

              <nav className="mt-8 flex flex-col space-y-4 text-sm text-gray-300">
                <p className="cursor-pointer hover:underline">Accessibility</p>
                <p className="cursor-pointer hover:underline">Returns Policy</p>
                <p className="cursor-pointer hover:underline">Refund Policy</p>
              </nav>
            </div>

            <div className="col-span-2 border-t border-white/10 pt-7 sm:col-span-1">
              <p className="font-bold text-white sm:text-lg"> Downloads </p>

              <nav className="mt-8 flex flex-col space-y-4 text-sm text-gray-300">
                <p className="cursor-pointer hover:underline">
                  Marketing Calendar
                </p>
                <p className="cursor-pointer hover:underline">
                  SEO Infographics
                </p>
              </nav>
            </div>

            <div className="col-span-2 mt-2 flex items-center justify-center space-x-9 text-gray-500 sm:justify-start lg:col-span-5">
              <p className="cursor-pointer hover:opacity-70">
                <svg
                  className="w-7"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </p>

              <FooterIcon />
            </div>
          </div>
        </Container>
      </>
    )
  );
}
