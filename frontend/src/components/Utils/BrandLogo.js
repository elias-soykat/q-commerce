import React from "react";
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
import { Container, SectionHeader } from "../Common";

const awesomeProducts = [
  {
    id: 0,
    title: "Copy & Paste Components",
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
      <div className="lg:flex lg:items-center justify-between py-4 md:py-6">
        <div className="w-full space-y-12 lg:w-1/2 ">
          <SectionHeader>
            explore our <br /> awesome Products
          </SectionHeader>

          {awesomeProducts.map(({ id, title, details, icon }) => (
            <div key={id} className="md:flex md:items-start md:-mx-4">
              <span className="inline-block p-2 text-blue-500 bg-blue-100 rounded-xl md:mx-4">
                {icon}
              </span>

              <div className="mt-4 md:mx-4 md:mt-0">
                <h1 className="text-2xl font-semibold text-gray-700 capitalize ">
                  {title}
                </h1>

                <p className="mt-3 text-gray-500 ">{details}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden lg:flex lg:items-center lg:w-1/2 lg:justify-end">
          <img
            className=" object-cover w-7/12"
            src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=755&q=80"
            alt=""
          />
        </div>
      </div>

      <hr className="border-gray-300 my-10 pt-10" />

      <div className="my-2 md:my-8 grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
        <div className="flex items-center justify-center col-span-1 md:col-span-2 lg:col-span-1">
          <BrandFacebook />
        </div>

        <div className="flex items-center justify-center col-span-1 md:col-span-2 lg:col-span-1">
          <BrandDigitalOcean />
        </div>

        <div className="flex items-center justify-center col-span-1 md:col-span-2 lg:col-span-1">
          <BrandAmazon />
        </div>

        <div className="flex items-center justify-center col-span-1 md:col-span-3 lg:col-span-1">
          <BrandTesla />
        </div>

        <div className="flex items-center justify-center col-span-2 md:col-span-3 lg:col-span-1">
          <BrandAdobe />
        </div>
      </div>
    </Container>
  );
}
