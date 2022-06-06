import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./Payment";

export default function PaymentContainer({ stripeKey }) {
  return (
    <Elements stripe={loadStripe(stripeKey)}>
      <Payment />
    </Elements>
  );
}
