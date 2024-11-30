import React from "react";
import {
  CustomerSupport,
  VehicleTruck,
  WalletIcon,
  WareHouse,
} from "../../assets/svg";
import { Container } from "../Common";

const features = [
  {
    id: 0,
    name: "Fast Shipping",
    icon: <VehicleTruck />,
  },
  {
    id: 1,
    name: "Free in Sore Refund",
    icon: <WareHouse />,
  },
  {
    id: 2,
    name: "100% Secure Payment",
    icon: <WalletIcon />,
  },
  {
    id: 3,
    name: "24/7 Support",
    icon: <CustomerSupport />,
  },
];

export default function FreeDelivery() {
  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-8 xl:my-12">
        {features.map(({ id, name, icon }) => (
          <div
            key={id}
            className="px-7 py-9 space-y-2 duration-600 hover:shadow-md shadow bg-white rounded flex flex-col justify-center items-center text-center"
          >
            <span className="inline-block text-blue-500 ">{icon}</span>

            <h1 className="text-2xl font-medium text-gray-700 capitalize pt-2">
              {name}
            </h1>

            <p className="text-gray-500 ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
            </p>
          </div>
        ))}
      </div>
    </Container>
  );
}
