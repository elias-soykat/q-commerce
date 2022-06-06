import React from "react";

export default function Input({ type, name, value, plc, icon, onChange }) {
  return (
    <>
      <div className="absolute inline-flex items-center justify-center left-0.5 top-0 h-full w-10 text-gray-400">
        {icon || <></>}
      </div>
      <input
        type={type}
        onChange={onChange}
        name={name}
        value={value}
        required
        className="text-sm placeholder:italic placeholder-gray-500 pl-11 rounded-lg border border-gray-300 w-full py-2 focus:outline-none focus:border-gray-600 transition-colors"
        placeholder={plc}
        id={name}
      />
    </>
  );
}
