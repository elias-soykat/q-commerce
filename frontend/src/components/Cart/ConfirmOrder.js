import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RightArrow } from "../../assets/svg";
import { MetaData } from "../../helper";
import { Container } from "../Common";
import { CheckoutSteps } from "../Utils";

export default function ConfirmOrder() {
  const navigate = useNavigate();

  const { shippingInfo } = useSelector((state) => state.cart);
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const subTotal = cartItems.reduce((prev, curr) => {
    return prev + curr.price * curr.quantity;
  }, 0);

  const shippingCharge = subTotal > 1000 ? 0 : 50;

  const totalPrice = subTotal + shippingCharge;

  const { address, post, city, country, phone } = shippingInfo;

  const proceedToPayment = () => {
    const orderInfo = {
      subTotal,
      shippingCharge,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(orderInfo));

    navigate("/process/payment");
  };
  return (
    <Container>
      <MetaData title="Confirm Order | Q - Commerce" />
      {/* className="container mt-28 sm:mt-40" */}
      <CheckoutSteps step={2} />

      <div className="lg:flex my-10 sm:my-14">
        <div className="lg:w-3/4 my-4">
          <div className="mx-4 mb-10 sm:mb-16 text-center sm:text-left">
            <h2 className="text-3xl font-medium mb-8">Shipping Info</h2>
            <p className="my-4">
              <span className="font-semibold">Name :</span> &nbsp; {user.name}
            </p>
            <p className="my-4">
              <span className="font-semibold">Phone :</span> &nbsp;
              {phone}
            </p>
            <p className="my-4">
              <span className="font-semibold">Address :</span> &nbsp;
              {post}, {address}, {city}, {country}
            </p>
          </div>
          <h2 className="mx-4 text-3xl font-medium mb-10 text-center sm:text-left">
            Your Carts
          </h2>
          {cartItems.map(({ product, image, name, price, quantity }) => (
            <div
              key={product}
              className="flex flex-col sm:flex-row justify-center sm:justify-between items-center mx-4 sm:mr-10 my-6"
            >
              <img
                className="border border-gray-300 h-24 rounded-md"
                src={image}
                alt="product"
              />

              <h4 className="font-medium my-2 sm:my-0">{name}</h4>
              <h5 className="italic mb-2 sm:mb-0">
                {quantity} X ${price} = ${quantity * price}
              </h5>
            </div>
          ))}
        </div>
        <div className="lg:w-1/4 px-6 md:px-8 py-2 md:py-6 flex flex-col justify-end lg:border-l border-gray-600">
          <h2 className="text-2xl text-center font-bold mb-10 sm:mb-20 underline">
            Order Summary
          </h2>
          <div className="flex font-medium justify-between my-3">
            <span>Sub Total</span>
            <span>${subTotal}</span>
          </div>
          <div className="flex  justify-between my-3">
            <div className="flex flex-col">
              <span className="font-medium">Shipping Charge</span>
              <small className="text-xs italic">
                (Over $1000 shipping is free)
              </small>
            </div>
            <span>${shippingCharge}</span>
          </div>
          <div className="border-t mt-6 border-gray-400">
            <div className="flex font-semibold justify-between text-lg my-8">
              <span>Total Price</span>
              <span>${totalPrice}</span>
            </div>
            <button
              onClick={proceedToPayment}
              className="flex items-center justify-center w-full py-3.5 mt-3 font-bold duration-500 rounded-md text-white bg-gray-900 hover:bg-gray-600"
              type="button"
            >
              PAYMENT
              <RightArrow />
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}
