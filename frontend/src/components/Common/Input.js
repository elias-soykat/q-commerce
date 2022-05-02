import React from "react";

export default function Input({ icon = <></>, name, plc, onChange }) {
  return (
    <>
      <div className="absolute inline-flex items-center justify-center left-0.5 top-0 h-full w-10 text-gray-400">
        {icon}
      </div>
      <input
        type={name}
        onChange={onChange}
        name={name === "file" ? "avatar" : name}
        accept="image/*"
        required
        className={`text-sm placeholder:italic placeholder-gray-500 pl-11 rounded-lg border border-gray-300 w-full py-2 focus:outline-none focus:border-gray-600`}
        placeholder={plc}
      />
    </>
  );
}
