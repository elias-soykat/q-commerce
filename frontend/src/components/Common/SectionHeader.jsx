import React from "react";

export default function ProductHeader({ children, text = "" }) {
  return (
    <div className={text}>
      <h1 className="text-3xl font-medium text-gray-800 capitalize lg:text-4xl">
        {children}
      </h1>

      <div className="mt-1">
        <span className="inline-block w-44 h-1 rounded-full bg-blue-500"></span>
        <span className="inline-block w-3 h-1 ml-1 rounded-full bg-blue-500"></span>
        <span className="inline-block w-1 h-1 ml-1 rounded-full bg-blue-500"></span>
      </div>
    </div>
  );
}
