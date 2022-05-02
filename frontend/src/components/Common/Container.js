import React from "react";

export default function Container({ children, bg = "bg-gray-100" }) {
  return (
    <section className={bg}>
      <div className="container px-4 py-8 md:py-16">{children}</div>
    </section>
  );
}
