import React from "react";

export default function Label({ f, children }) {
  return (
    <label
      htmlFor={f}
      className="mb-2 text-xs sm:text-sm tracking-wide text-gray-700 font-medium"
    >
      {children}
    </label>
  );
}
