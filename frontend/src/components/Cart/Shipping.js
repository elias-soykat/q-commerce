import { useState } from "react";
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

  const shippingSubmit = (e) => {
    e.preventDefault();

    dispatch(saveShippingInfo(shippingDetails));
    navigate("/order/confirm");
  };

  return (
    <Container>
      <div className="my-10 sm:my-12">
        <MetaData title="Shipping Details | Q - Sneakers" />

        <CheckoutSteps step={1} />
        <form
          onSubmit={shippingSubmit}
          className="mx-auto w-full rounded-md bg-white p-6 shadow-lg sm:w-10/12 sm:p-10 md:w-9/12 md:px-16 md:py-10 lg:w-8/12 xl:w-7/12 2xl:w-6/12"
        >
          {/* phone  */}
          <h2 className="mb-2 py-3 text-center text-xl font-semibold sm:mb-5 sm:text-2xl">
            Shipping Details
          </h2>

          <div className="mb-6 flex flex-col">
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
          <div className="mb-6 flex flex-col ">
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
          <div className="mb-6 flex flex-col ">
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
          <div className="mb-6 flex flex-col">
            <Label f="city">City</Label>
            <div className="relative flex w-full rounded-md border pl-2 focus:border-gray-600">
              <PinCodeIcon />
              <select
                value={shippingDetails.city}
                onChange={handleInputChange}
                name="city"
                className="w-full rounded-md bg-white py-2.5 pl-2 text-sm focus:border-gray-600  focus:outline-none"
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
          <div className="mb-6 flex flex-col">
            <Label f="country">Country</Label>
            <div className="relative flex w-full rounded-md border pl-2 focus:border-gray-600">
              <CountryIcon />
              <select
                value={shippingDetails.country}
                onChange={handleInputChange}
                name="country"
                className="w-full rounded-md bg-white py-2.5 pl-2 text-sm focus:border-gray-600  focus:outline-none"
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
              className="flex w-full cursor-pointer items-center justify-center rounded-md bg-gray-900 py-4 text-center text-sm font-bold uppercase text-white duration-500 hover:bg-gray-600 sm:text-base"
            />
          </div>
        </form>
      </div>
    </Container>
  );
}
