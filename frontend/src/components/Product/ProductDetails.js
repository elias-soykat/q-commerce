import { useState } from "react";
import toast from "react-hot-toast";
import Rating from "react-rating";
import { useDispatch } from "react-redux";
import {
  MinusIcon,
  PlusIcon,
  ProductCartIcon,
  Star,
  Unfilled,
} from "../../assets/svg";
import { Carousel } from "../../helper";
import { addItemsCart } from "../../redux/actions/cartAction";
import { Modal } from "../Utils";

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
    if (stock <= quantity) return alert("Order cannot exceed stock limit :(");
    setQuantity(quantity + 1);
  };

  const decreaseHandler = () => {
    if (1 >= quantity) return alert("Order at lest an item :(");
    setQuantity(quantity - 1);
  };

  const [toggle, setToggle] = useState("none");

  const displayModalHandler = (status) => setToggle(status);

  return (
    <section className="mt-24 sm:mt-32">
      <div className="mx-auto max-w-screen-xl px-4 md:px-12">
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-16">
          <Carousel images={images} />
          <div className="">
            <div className="flex justify-between">
              <div className="max-w-[35ch]">
                <h1 className="mb-1 text-2xl font-medium lg:text-3xl">
                  {name}
                </h1>
                <small>#{_id}</small>
              </div>

              <b className="text-lg font-bold md:text-2xl">$ {price}</b>
            </div>

            <p className="mt-4">
              {description} Lorem, ipsum dolor sit amet consectetur adipisicing
              elit. Ipsum, inventore. Fuga adipisci eligendi incidunt? Veniam
              perferendis facilis eos adipisci earum!
            </p>

            <Modal toggle={toggle} displayModalHandler={displayModalHandler} />

            <div className="mt-6">
              <div className="flex flex-wrap items-center justify-between">
                <div className="flex items-center">
                  <Rating
                    emptySymbol={<Unfilled />}
                    fullSymbol={<Star />}
                    initialRating={ratings}
                    fractions={2}
                    readonly={true}
                    className="text-sm"
                  />
                  <span className="ml-2 text-sm">({numOfReviews} Reviews)</span>
                </div>
                <button
                  onClick={() => displayModalHandler("block")}
                  type="button"
                  className="rounded bg-gray-700 px-4 py-2 text-xs text-white hover:bg-gray-600 sm:text-sm"
                >
                  Submit Review
                </button>
              </div>

              <div className="my-5 flex">
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
              <div className="mt-8 flex">
                <div className="mr-6 flex items-center">
                  <button onClick={decreaseHandler} type="button">
                    <MinusIcon />
                  </button>
                  <input
                    className="mx-2 w-8 border border-gray-400 text-center"
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
                  disabled={stock > 0 ? false : true}
                  type="button"
                  className="flex items-center justify-between rounded-md bg-gray-900 px-6 py-2.5 text-sm font-bold text-white duration-500 hover:bg-gray-600"
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
