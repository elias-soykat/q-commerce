import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const Modal = ({ onClose }) => {
  const ref = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal-content" ref={ref}>
        <div className="modal-title">Modal Title</div>
        <div className="modal-body">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat,
          sint ab ex odio pariatur et eius? Nam, quod eum adipisci earum nisi
          tempora, nesciunt esse voluptate illo, maxime consectetur harum!
        </div>
        <div className="modal-footer">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
