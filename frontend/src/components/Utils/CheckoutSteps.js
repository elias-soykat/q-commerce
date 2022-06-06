import React from "react";
import { AddressIcon, DetailsIcon, PaymentIcon } from "../../assets/svg";

export default function CheckoutSteps({ step }) {
  const stepBg = step > 1 ? (step > 2 ? "w-6/6" : "w-3/6") : "w-1/6";

  const text = "text-slate-800";
  return (
    <div className="w-8/12 mx-auto my-20 sm:my-24">
      <h2 className="sr-only">Steps</h2>

      <div>
        <div className="overflow-hidden bg-gray-300 rounded-full">
          <div className={`${stepBg} h-2 bg-gray-800 rounded-full`}></div>
        </div>

        <ol className="grid grid-cols-3 mt-4 text-sm font-medium text-gray-500">
          <li className={`flex items-center justify-start ${step > 0 && text}`}>
            <span className="hidden sm:inline"> Details </span>
            <DetailsIcon />
          </li>

          <li
            className={`flex items-center justify-center ${step > 1 && text}`}
          >
            <span className="hidden sm:inline"> Address </span>

            <AddressIcon />
          </li>

          <li className={`flex items-center justify-end ${step > 2 && text}`}>
            <span className="hidden sm:inline"> Payment </span>

            <PaymentIcon />
          </li>
        </ol>
      </div>
    </div>
  );
}
