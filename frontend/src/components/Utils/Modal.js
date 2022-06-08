import React, { useEffect } from "react";

const Modal = ({ openModal, closeModal, children }) => {
  useEffect(() => {
    const parentElement = document.getElementById("parent");

    if (parentElement) {
      parentElement.addEventListener("click", (e) => {
        const topChild = document.getElementById("child");
        if (topChild && !topChild.contains(e.target)) {
          closeModal("none");
        }
      });
    }
  }, [closeModal]);

  return openModal === "none" ? (
    <> </>
  ) : (
    <div
      id="parent"
      className="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-[#7d7799] bg-opacity-60"
    >
      <div id="child" className="transition-opacity">
        {children}
      </div>
    </div>
  );
};

export default Modal;
