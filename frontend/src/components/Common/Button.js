import React from "react";
import { Link } from "react-router-dom";

export default function Button({ children, size, to = "" }) {
  return (
    <Link
      to={to}
      type="button"
      className={`block text-sm font-medium text-center duration-500 rounded-md text-white bg-gray-900 hover:bg-gray-600 ${size}`}
    >
      {children}
    </Link>
  );
}
