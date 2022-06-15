import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RightArrow } from "../../assets/svg";
import { MetaData } from "../../helper";
import { Container } from "../Common";
import { CheckoutSteps } from "../Utils";

export default function ConfirmOrder() {
  const navigate = useNavigate();

  const { shippingInfo } = useSelector((state) => state.cart);
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const subTotal = cartItems.reduce((prev, curr) => {
    return prev + curr.price * curr.quantity;
  }, 0);

  const shippingCharge = subTotal > 1000 ? 0 : 50;

  const totalPrice = subTotal + shippingCharge;

  const { address, post, city, country, phone } = shippingInfo;

  const proceedToPayment = () => {
    const orderInfo = {
      subTotal,
      shippingCharge,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(orderInfo));

    navigate("/process/payment");
  };
  return (
    <Container>
      <MetaData title="Confirm Order | Q - Sneakers" />
      {/* className="container mt-28 sm:mt-40" */}
      <CheckoutSteps step={2} />

      <div className="my-10 sm:my-14 lg:flex">
        <div className="my-4 lg:w-3/4">
          <div className="mx-4 mb-10 text-center sm:mb-16 sm:text-left">
            <h2 className="mb-8 text-3xl font-medium">Shipping Info</h2>
            <p className="my-4">
              <span className="font-semibold">Name :</span> &nbsp; {user.name}
            </p>
            <p className="my-4">
              <span className="font-semibold">Phone :</span> &nbsp;
              {phone}
            </p>
            <p className="my-4">
              <span className="font-semibold">Address :</span> &nbsp;
              {post}, {address}, {city}, {country}
            </p>
          </div>
          <h2 className="mx-4 mb-10 text-center text-3xl font-medium sm:text-left">
            Your Carts
          </h2>
          {cartItems.map(({ product, image, name, price, quantity }) => (
            <div
              key={product}
              className="mx-4 my-6 flex flex-col items-center justify-center sm:mr-10 sm:flex-row sm:justify-between"
            >
              <img
                className="h-24 rounded-md border border-gray-300"
                src={image}
                alt="product"
              />

              <h4 className="my-2 font-medium sm:my-0">{name}</h4>
              <h5 className="mb-2 italic sm:mb-0">
                {quantity} X ${price} = ${quantity * price}
              </h5>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-end border-gray-600 px-6 py-2 md:px-8 md:py-6 lg:w-1/4 lg:border-l">
          <h2 className="mb-10 text-center text-2xl font-bold underline sm:mb-20">
            Order Summary
          </h2>
          <div className="my-3 flex justify-between font-medium">
            <span>Sub Total</span>
            <span>${subTotal}</span>
          </div>
          <div className="my-3  flex justify-between">
            <div className="flex flex-col">
              <span className="font-medium">Shipping Charge</span>
              <small className="text-xs italic">
                (Over $1000 shipping is free)
              </small>
            </div>
            <span>${shippingCharge}</span>
          </div>
          <div className="mt-6 border-t border-gray-400">
            <div className="my-8 flex justify-between text-lg font-semibold">
              <span>Total Price</span>
              <span>${totalPrice}</span>
            </div>
            <button
              onClick={proceedToPayment}
              className="mt-3 flex w-full items-center justify-center rounded-md bg-gray-900 py-3.5 font-bold text-white duration-500 hover:bg-gray-600"
              type="button"
            >
              PAYMENT
              <RightArrow />
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}
