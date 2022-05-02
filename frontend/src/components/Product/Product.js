import React from "react";
import { LoveIcon, ProductCartIcon, Star, Unfilled } from "../../assets/svg";
import { Button } from "../Common";
import Rating from "react-rating";
import { Link } from "react-router-dom";

export default function Product({ pro }) {
  const { name, price, ratings, numOfReviews, images, _id } = pro;
  return (
    <div className="my-3.5 border border-gray-400 shadow rounded p-[1px]">
      <Link to={`/product/${_id}`}>
        <button
          type="button"
          className="p-2 relative text-white bg-black hover:bg-gray-500 rounded-full left-6 top-4"
        >
          <LoveIcon />
        </button>
        <img
          alt="Build Your Own Drone"
          className="duration-300 hover:scale-90 pt-4 object-cover object-top w-full h-56 lg:h-64 xl:h-72"
          src={images[0].url}
        />
      </Link>
      <div className="px-4 py-2.5">
        <h5 className="text-xl font-medium text-right">{name}</h5>
        <div className="pt-2 flex justify-between items-center">
          <div className="flex items-center justify-center">
            <Rating
              emptySymbol={<Unfilled />}
              fullSymbol={<Star />}
              initialRating={ratings}
              fractions={2}
              readonly={true}
              className="text-sm"
            />
            <span className="text-xs ml-1">({numOfReviews} Reviews)</span>
          </div>
          <div className="flex items-center">
            <p className="mr-2">${price}</p>
            <del className="text-sm font-medium text-gray-600 ">$33</del>
          </div>
        </div>

        <Button size="flex items-center justify-center w-full px-2 py-3 text-base mt-3.5 font-medium">
          <ProductCartIcon />
          <span className="ml-2 text-sm">Add to cart</span>
        </Button>
      </div>
    </div>
  );
}
