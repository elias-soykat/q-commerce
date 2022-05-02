import React from "react";
import Rating from "react-rating";
import { Star, Unfilled } from "../../assets/svg";

export default function Modal({ setIsOpen, ratings = 3 }) {
  return (
    <div
      onClick={() => setIsOpen(false)}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
      className={`fixed modal inset-0 z-40 flex items-center justify-center`}
    >
      <div className="bg-white py-8 px-4 sm:px-8 rounded">
        <textarea
          cols="30"
          rows="2"
          placeholder="Enter Your Review"
          className="block border-2 border-gray-400 text-sm p-2"
        ></textarea>

        <div className="flex items-center">
          <Rating
            emptySymbol={<Unfilled />}
            fullSymbol={<Star />}
            initialRating={ratings}
            fractions={2}
            className="my-6"
          />
          <span className="pl-4">{1}</span>
        </div>
        <button className="block bg-gray-600 px-6 py-1 text-white text-sm rounded">
          Submit
        </button>
      </div>
    </div>
  );
}
