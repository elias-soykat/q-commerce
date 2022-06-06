import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CountryIcon,
  HomeIcon,
  PhoneIcon,
  PinCodeIcon,
  PostCode,
} from "../../assets/svg";
import { MetaData } from "../../helper";
import { saveShippingInfo } from "../../redux/actions/cartAction";
import { Container, Input, Label } from "../Common";
import { CheckoutSteps } from "../Utils";

export default function Shipping() {
  const { shippingInfo } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { phone, address, post, city, country } = shippingInfo;

  const [shippingDetails, setShippingDetails] = useState({
    phone: phone || "",
    address: address || "",
    post: post || "",
    city: city || "Dhaka",
    country: country || "BD",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prevState) => ({ ...prevState, [name]: value }));
  };

  console.log(shippingDetails);

  const shippingSubmit = (e) => {
    e.preventDefault();

    dispatch(saveShippingInfo(shippingDetails));
    navigate("/order/confirm");
  };

  return (
    <Container>
      <div className="my-10 sm:my-12">
        <MetaData title="Shipping Details | Q - Commerce" />

        <CheckoutSteps step={1} />
        <form
          onSubmit={shippingSubmit}
          className="shadow-lg p-6 sm:p-8 md:p-12 rounded-md bg-white w-full sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12 mx-auto"
        >
          {/* phone  */}
          <h2 className="font-semibold text-center text-xl sm:text-2xl py-3 mb-2 sm:mb-5">
            Shipping Details
          </h2>

          <div className="flex flex-col mb-6">
            <Label f="phone">Phone</Label>
            <div className="relative">
              <Input
                type="text"
                name="phone"
                value={shippingDetails.phone}
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
                value={shippingDetails.address}
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
                value={shippingDetails.post}
                plc="Your Post Code"
                icon={<PostCode />}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* City  */}
          <div className="flex flex-col mb-6">
            <Label f="city">City</Label>
            <div className="relative w-full rounded-md flex border focus:border-gray-600 pl-2">
              <PinCodeIcon />
              <select
                value={shippingDetails.city}
                onChange={handleInputChange}
                name="city"
                className="text-sm w-full pl-2 focus:border-gray-600 py-2.5 rounded-md bg-white  focus:outline-none"
                id="city"
                required
              >
                <option value="Dhaka">Dhaka</option>
                <option value="Barishal">Barishal</option>
                <option value="Khulna">Khulna</option>
              </select>
            </div>
          </div>
          {/* Country  */}
          <div className="flex flex-col mb-6">
            <Label f="country">Country</Label>
            <div className="relative w-full rounded-md flex border focus:border-gray-600 pl-2">
              <CountryIcon />
              <select
                value={shippingDetails.country}
                onChange={handleInputChange}
                name="country"
                className="text-sm w-full pl-2 focus:border-gray-600 py-2.5 rounded-md bg-white  focus:outline-none"
                id="country"
                required
              >
                <option value="BD">Bangladesh</option>
                <option value="IN">India</option>
                <option value="US">United States</option>
              </select>
            </div>
          </div>

          <div className="mt-10 mb-2">
            <input
              type="submit"
              value="Continue Submit"
              className="cursor-pointer uppercase w-full py-4 flex items-center justify-center text-sm sm:text-base font-bold text-center duration-500 rounded-md text-white bg-gray-900 hover:bg-gray-600"
            />
          </div>
        </form>
      </div>
    </Container>
  );
}
