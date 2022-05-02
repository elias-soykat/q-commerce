import React, { useState } from "react";
import Rating from "react-rating";

import {
  MinusIcon,
  PlusIcon,
  ProductCartIcon,
  Star,
  Unfilled,
} from "../../assets/svg";
import { Button } from "../Common";
import Modal from "../Utils/Modal";

export default function ProductDetails({ pro }) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    name,
    images,
    description,
    price,
    ratings,
    numOfReviews,
    stock,
    _id,
  } = pro;

  return (
    <section className="py-20 md:py-40 bg-gray-200">
      <div className="max-w-screen-xl mx-auto px-4 md:px-12">
        <div className="grid items-start grid-cols-1 gap-8 md:gap-14 md:grid-cols-2">
          <div className="">
            <img
              alt="product"
              className="object-cover object-center rounded-lg"
              style={{ maxHeight: "450px", minHeight: "400px" }}
              src={images[0].url}
            />
          </div>

          <div className="">
            <div className="flex justify-between">
              <div className="max-w-[35ch]">
                <h1 className="text-2xl lg:text-3xl font-medium mb-1">
                  Product{name}
                </h1>
                <small>#{_id}</small>
              </div>

              <b className="text-lg md:text-2xl font-bold">$ {price}</b>
            </div>

            <p className="mt-4">
              {description} Lorem, ipsum dolor sit amet consectetur adipisicing
              elit. Ipsum, inventore. Fuga adipisci eligendi incidunt? Veniam
              perferendis facilis eos adipisci earum!
            </p>

            {/* Submit review  */}
            {isOpen && <Modal setIsOpen={setIsOpen} />}

            <form className="mt-6">
              <div className="flex items-center justify-between flex-wrap">
                <div className="flex items-center">
                  <Rating
                    emptySymbol={<Unfilled />}
                    fullSymbol={<Star />}
                    initialRating={ratings}
                    fractions={2}
                    readonly={true}
                    className="text-sm"
                  />
                  <span className="text-sm ml-2">({numOfReviews} Reviews)</span>
                </div>
                <button
                  onClick={() => setIsOpen(true)}
                  type="button"
                  className="bg-gray-600 text-white text-xs sm:text-sm px-4 py-2 rounded"
                >
                  Submit Review
                </button>
              </div>

              <div className="flex my-5">
                <p>Status : </p>
                <div className="ml-3">
                  {stock > 0 ? (
                    <b className="text-green-700 underline">In Stock</b>
                  ) : (
                    <b className="text-red-500 underline">Out of Stock</b>
                  )}
                </div>
              </div>

              <div>
                <p>Available : {stock > 0 ? `${stock} pc` : `${stock} pcs`}</p>
              </div>

              <div className="flex mt-10">
                <div className="flex items-center mr-6">
                  <span className="cursor-pointer">
                    <MinusIcon />
                  </span>
                  <input
                    className="mx-2 text-center w-8 border border-gray-400"
                    type="text"
                    disabled
                    value="1"
                  />
                  <span className="cursor-pointer">
                    <PlusIcon />
                  </span>
                </div>

                <Button to="/cart" size="flex px-8 sm:px-10 py-3 ml-2 sm:ml-3">
                  <ProductCartIcon />
                  <span className="ml-2">Add to cart</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
