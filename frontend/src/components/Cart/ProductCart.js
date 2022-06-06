import React from "react";
import { useDispatch } from "react-redux";
import { MinusIcon, PlusIcon } from "../../assets/svg";
import { addItemsCart, removeFromCart } from "../../redux/actions/cartAction";

export default function ProductCart(prop) {
  const { name, price, image, quantity, stock, product } = prop;
  const dispatch = useDispatch();

  const increaseHandler = (id, qty, prodStock) => {
    if (prodStock <= qty) return alert("Order cannot exceed stock limit :(");
    dispatch(addItemsCart(id, qty + 1));
  };

  const decreaseHandler = (id, qty) => {
    if (1 >= qty) return alert("Order at lest an item :(");
    dispatch(addItemsCart(id, qty - 1));
  };

  return (
    <div className="flex items-center justify-between border-b border-gray-300 mx-4 pt-8 pb-6">
      {/* single product cart  */}
      <div className="flex flex-wrap w-2/5">
        <div className="w-24 py-1.5 rounded-sm border border-gray-300">
          <img className="h-24 rounded-md" src={image} alt="product" />
        </div>
        <div className="flex flex-col items-start pt-2 sm:pt-0 sm:ml-3 justify-end">
          <div className="font-bold">{name}</div>
          <div className="text-sm font-medium py-2">${price}</div>
          <div
            onClick={() => dispatch(removeFromCart(product))}
            className="text-sm text-red-500 underline font-bold cursor-pointer"
          >
            Remove
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center w-1/5">
        <div className="flex items-center mr-6 border-gray-800">
          <button onClick={() => decreaseHandler(product, quantity)}>
            <MinusIcon />
          </button>
          <input
            className="mx-2 text-center w-8 border border-gray-400"
            type="text"
            disabled
            value={quantity}
          />
          <button onClick={() => increaseHandler(product, quantity, stock)}>
            <PlusIcon />
          </button>
        </div>
      </div>
      <span className="text-center w-1/5 font-semibold">
        ${price * quantity}
      </span>
    </div>
  );
}
