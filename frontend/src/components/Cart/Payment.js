import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CreditCard } from "../../assets/svg";
import { MetaData } from "../../helper";
import { clearCart, clearErrors, createOrder } from "../../redux/actions/orderAction";
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

      if(client_secret) {
        dispatch(clearCart())
      }

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
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
          navigate("/order/success");

          toast.success("Payment Successful");
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
      <MetaData title="Payment | Q-Sneakers" />
      <CheckoutSteps step={3} />

      <div className="min-w-screen flex items-center justify-center pb-24 pt-6 sm:pt-8">
        <form
          onSubmit={paymentSubmitHandler}
          className="mx-auto w-full rounded-lg bg-white py-6 px-6 text-gray-700 shadow-lg sm:py-10 sm:px-8"
          style={{ maxWidth: "600px" }}
        >
          <div className="relative bottom-3 w-full pb-8">
            <div className="mx-auto -mt-16 flex h-24 w-24 items-center justify-center rounded-full border bg-white p-2">
              <CreditCard />
            </div>
          </div>
          <div className="mb-10">
            <h1 className="text-center text-xl font-bold uppercase">
              Secure payment info
            </h1>
          </div>

          {/* Name on card  */}
          <div className="mb-5">
            <label className="ml-1 text-sm font-bold text-gray-500">
              Name on card
            </label>
            <div className="my-3">
              <input
                onChange={(e) => setName(e.target.value)}
                className="mb-1 w-full rounded-md border border-gray-300 px-3 py-2 transition-colors focus:border-gray-400 focus:outline-none"
                placeholder="John Smith"
                type="text"
              />
            </div>
          </div>

          {/* Card Number  */}
          <div className="mb-5">
            <label className="ml-1 text-sm font-bold text-gray-500">
              Card number
            </label>
            <div className="my-3">
              <CardElement
                className="mb-1 w-full rounded-md border border-gray-300 px-3 py-3.5 transition-colors focus:border-gray-400 focus:outline-none"
                placeholder="0000 0000 0000 0000"
                type="text"
              />
            </div>
          </div>

          <div className="mt-8 mb-5 sm:mt-12">
            <input
              type="submit"
              ref={payBtn}
              value={`Pay  -  $ ${orderInfo && orderInfo.totalPrice}`}
              className="flex w-full cursor-pointer items-center justify-center rounded-lg bg-gray-800 px-3 py-3.5 font-semibold text-white hover:bg-gray-700"
            />
          </div>
        </form>
      </div>
    </Container>
  );
}
