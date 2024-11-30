import React from "react";

export default function Loading() {
  return (
    <div
      aria-label="Loading..."
      role="status"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
      className="fixed inset-0 w-full z-40 h-screen flex items-center justify-center"
    >
      <div
        style={{ borderWidth: "6.5px" }}
        className="border-t-transparent w-20 h-20 border-white border-solid rounded-full animate-spin"
      ></div>
    </div>
  );
}
