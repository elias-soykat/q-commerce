import {
  BrandAdobe,
  BrandAmazon,
  BrandDigitalOcean,
  BrandFacebook,
  BrandTesla,
  ElegantDarkMode,
  ListIcon,
  ZeroConfig,
} from "../../assets/brand";
import brandImg from "../../assets/brandImg.webp";
import { Container, SectionHeader } from "../Common";

const awesomeProducts = [
  {
    id: 0,
    title: "Best Sneakars in Town",
    details:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ab nulla quod dignissimos vel non corrupti doloribus voluptatum eveniet",
    icon: <ListIcon />,
  },
  {
    id: 1,
    title: "Zero Configurations",
    details:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ab nulla quod dignissimos vel non corrupti doloribus voluptatum eveniet",
    icon: <ZeroConfig />,
  },
  {
    id: 2,
    title: "Elegant Dark Mode",
    details:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ab nulla quod dignissimos vel non corrupti doloribus voluptatum eveniet",
    icon: <ElegantDarkMode />,
  },
];

export default function BrandLogo() {
  return (
    <Container>
      <div className="justify-between py-4 md:py-6 lg:flex lg:items-center">
        <div className="w-full space-y-12 lg:w-1/2 ">
          <SectionHeader>
            explore our <br /> awesome Sneakers
          </SectionHeader>

          {awesomeProducts.map(({ id, title, details, icon }) => (
            <div key={id} className="md:-mx-4 md:flex md:items-start">
              <span className="inline-block rounded-xl bg-blue-100 p-2 text-blue-500 md:mx-4">
                {icon}
              </span>

              <div className="mt-4 md:mx-4 md:mt-0">
                <h1 className="text-2xl font-semibold capitalize text-gray-700 ">
                  {title}
                </h1>

                <p className="mt-3 text-gray-500 ">{details}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden lg:flex lg:w-1/2 lg:items-center lg:justify-end">
          <img className="w-8/12 object-fill" src={brandImg} alt="logo" />
        </div>
      </div>

      <hr className="my-10 border-gray-300 pt-10" />

      <div className="my-2 grid grid-cols-2 gap-8 md:my-8 md:grid-cols-6 lg:grid-cols-5">
        <div className="col-span-1 flex items-center justify-center md:col-span-2 lg:col-span-1">
          <BrandFacebook />
        </div>

        <div className="col-span-1 flex items-center justify-center md:col-span-2 lg:col-span-1">
          <BrandDigitalOcean />
        </div>

        <div className="col-span-1 flex items-center justify-center md:col-span-2 lg:col-span-1">
          <BrandAmazon />
        </div>

        <div className="col-span-1 flex items-center justify-center md:col-span-3 lg:col-span-1">
          <BrandTesla />
        </div>

        <div className="col-span-2 flex items-center justify-center md:col-span-3 lg:col-span-1">
          <BrandAdobe />
        </div>
      </div>
    </Container>
  );
}
