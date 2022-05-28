import React, { useState } from "react";
import Rating from "react-rating";
import {
  MinusIcon,
  PlusIcon,
  ProductCartIcon,
  Star,
  Unfilled,
} from "../../assets/svg";
import { useDispatch } from "react-redux";
import { addItemsCart } from "../../redux/actions/cartAction";
import toast from "react-hot-toast";

export default function ProductDetails({ pro, id }) {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);

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

  const addCartHandler = () => {
    dispatch(addItemsCart(id, quantity));
    toast.success("Item Added to Cart");
  };

  const increaseHandler = () => {
    if (stock <= quantity) return;
    setQuantity(quantity + 1);
  };

  const decreaseHandler = () => {
    if (1 >= quantity) return;
    setQuantity(quantity - 1);
  };

  return (
    <section className="pt-20 pb-16 md:py-40 bg-gray-200">
      <div className="max-w-screen-xl mx-auto px-4 md:px-12">
        <div className="grid items-start grid-cols-1 gap-8 md:gap-14 md:grid-cols-2">
          <div className="">
            <img
              alt="product"
              className="object-cover object-center rounded-lg"
              style={{ maxHeight: "450px", minHeight: "400px" }}
              src={images[0]?.url}
            />
          </div>

          <div className="">
            <div className="flex justify-between">
              <div className="max-w-[35ch]">
                <h1 className="text-2xl lg:text-3xl font-medium mb-1">
                  {name}
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
            {/* {isOpen && <Modal setIsOpen={setIsOpen} />} */}

            <div className="mt-6">
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
                <p>Available : {stock > 0 ? `${stock} pcs` : `${stock} pc`}</p>
              </div>
              <div className="flex mt-8">
                <div className="flex items-center mr-6">
                  <button onClick={decreaseHandler} type="button">
                    <MinusIcon />
                  </button>
                  <input
                    className="mx-2 text-center w-8 border border-gray-400"
                    type="text"
                    disabled
                    value={quantity}
                  />
                  <button onClick={increaseHandler} type="button">
                    <PlusIcon />
                  </button>
                </div>
                <button
                  onClick={addCartHandler}
                  type="button"
                  className="flex items-center justify-between px-6 py-2.5 text-sm font-bold duration-500 rounded-md text-white bg-gray-900 hover:bg-gray-600"
                >
                  <ProductCartIcon />
                  <span className="ml-2">Add to cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
