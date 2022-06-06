import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CreditCard } from "../../assets/svg";
import { MetaData } from "../../helper";
import { clearErrors, createOrder } from "../../redux/actions/orderAction";
import { Container } from "../Common";
import { CheckoutSteps } from "../Utils";

export default function Payment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const payBtn = useRef(null);

  const [name, setName] = useState("");

  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { err } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subTotal,
    shippingCharge: orderInfo.shippingCharge,
    totalPrice: orderInfo.totalPrice,
  };

  const paymentSubmitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;

    try {
      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: name.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              postal_code: shippingInfo.post,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));
          navigate("/success");
        } else {
          toast.error("There's some issue while processing payment");
        }
      }
    } catch (err) {
      payBtn.current.disabled = false;
      toast.error(err.message || err);
    }
  };

  useEffect(() => {
    if (err) {
      toast.error(err.message || err);
      dispatch(clearErrors());
    }
  }, [dispatch, err]);

  return (
    <Container>
      <MetaData title="Payment | Q-Commerce" />
      <CheckoutSteps step={3} />

      <div className="min-w-screen flex items-center justify-center pb-24 pt-6 sm:pt-8">
        <form
          onSubmit={paymentSubmitHandler}
          className="w-full mx-auto rounded-lg bg-white shadow-lg py-6 sm:py-10 px-6 sm:px-8 text-gray-700"
          style={{ maxWidth: "600px" }}
        >
          <div className="w-full relative bottom-3 pb-8">
            <div className="border bg-white p-2 rounded-full w-24 h-24 -mt-16 mx-auto flex justify-center items-center">
              <CreditCard />
            </div>
          </div>
          <div className="mb-10">
            <h1 className="text-center font-bold text-xl uppercase">
              Secure payment info
            </h1>
          </div>

          {/* Name on card  */}
          <div className="mb-4">
            <label className="font-bold text-gray-500 text-sm ml-1">
              Name on card
            </label>
            <div className="my-1">
              <input
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 mb-1 border border-gray-300 focus:border-gray-400 rounded-md focus:outline-none transition-colors"
                placeholder="John Smith"
                type="text"
              />
            </div>
          </div>

          {/* Card Number  */}
          <div className="mb-4">
            <label className="font-bold text-gray-500 text-sm ml-1">
              Card number
            </label>
            <div className="my-1">
              <CardNumberElement
                className="w-full px-3 py-3 mb-1 rounded-md focus:outline-none border border-gray-300 focus:border-gray-400 transition-colors"
                placeholder="0000 0000 0000 0000"
                type="text"
              />
            </div>
          </div>

          {/* Expire date */}
          <div className="mb-4 -mx-2 flex items-end">
            <div className="px-2 w-1/2">
              <label className="font-bold text-gray-500 text-sm ml-1 ">
                Expiration date
              </label>
              <div className="my-1">
                <CardExpiryElement
                  className="w-full px-3 py-3 mb-1 rounded-md focus:outline-none border border-gray-300 focus:border-gray-400 transition-colors"
                  placeholder="John Smith"
                  type="date"
                />
              </div>
            </div>

            {/* CVV  */}
            <div className="px-2 w-1/2">
              <label className="font-bold text-gray-500 text-sm mb-2 ml-1">
                CVV
              </label>
              <div className="my-1">
                <CardCvcElement
                  min="0"
                  className="w-full px-3 py-3 mb-1 rounded-md focus:outline-none border border-gray-300 focus:border-gray-400 transition-colors"
                  placeholder="CVV"
                  type="number"
                />
              </div>
            </div>
          </div>

          <div className="mt-10 mb-5">
            <input
              type="submit"
              ref={payBtn}
              value={`Pay  -  $ ${orderInfo && orderInfo.totalPrice}`}
              className="cursor-pointer w-full text-white bg-gray-800 hover:bg-gray-700 rounded-lg px-3 py-3.5 font-semibold flex items-center justify-center"
            />
          </div>
        </form>
      </div>
    </Container>
  );
}
