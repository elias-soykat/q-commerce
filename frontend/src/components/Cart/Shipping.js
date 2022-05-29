import React from "react";
import { Link } from "react-router-dom";
import {
  CountryIcon,
  HomeIcon,
  PhoneIcon,
  PinCodeIcon,
  PostCode,
  VehicleTruck,
} from "../../assets/svg";
import { Container, Input, Label } from "../Common";

export default function Shipping() {
  const handleInputChange = () => {};
  return (
    <Container>
      <div className="my-10 sm:my-16">
        <h2 className="text-2xl sm:text-3xl font-medium sm:font-bold flex items-center">
          <Link to="/cart" className="border">
            Shipping Details
          </Link>
          <span className="ml-4">
            <VehicleTruck />
          </span>
        </h2>
        <form className="shadow-md p-6 sm:p-8 md:p-12 rounded-md bg-white w-full sm:w-8/12 lg:w-5/12 mx-auto my-10 sm:my-20">
          {/* phone  */}
          <div className="flex flex-col mb-6">
            <Label f="phone">Phone</Label>
            <div className="relative">
              <Input
                type="text"
                name="phone"
                plc="Enter Your phone"
                icon={<PhoneIcon />}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Address  */}
          <div className="flex flex-col mb-6 ">
            <Label f="address">Full Address</Label>
            <div className="relative">
              <Input
                type="text"
                name="address"
                plc="Your Address"
                icon={<HomeIcon />}
                onChange={handleInputChange}
              />
            </div>
          </div>
          {/* Post Code  */}
          <div className="flex flex-col mb-6 ">
            <Label f="post">Post Code</Label>
            <div className="relative">
              <Input
                type="text"
                name="post"
                plc="Your Post Code"
                icon={<PostCode />}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* City  */}
          <div className="flex flex-col mb-6">
            <Label f="city">City</Label>
            <div className="relative">
              <Input
                type="text"
                name="city"
                plc="Enter Your city"
                icon={<PinCodeIcon />}
                onChange={handleInputChange}
              />
            </div>
          </div>
          {/* Country  */}
          <div className="flex flex-col mb-6">
            <Label f="country">Country</Label>
            <div className="relative">
              <Input
                type="text"
                name="country"
                plc="Enter Your country"
                icon={<CountryIcon />}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="mt-10 mb-2">
            <input
              type="submit"
              value="Continue Submit"
              className="cursor-pointer uppercase w-full py-3.5 flex items-center justify-center text-sm sm:text-base font-medium text-center duration-500 rounded-md text-white bg-gray-900 hover:bg-gray-600"
            />
          </div>
        </form>
      </div>
    </Container>
  );
}
