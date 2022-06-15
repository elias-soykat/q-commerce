import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RightArrow } from "../../assets/svg";
import { Loading, MetaData } from "../../helper";
import { getOrderDetails, updateOrder } from "../../redux/actions/orderAction";
import { clearErrors } from "../../redux/actions/userAction";
import { Sidebar } from "../Admin";

export default function ProcessOrder() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { order, err, loading } = useSelector((state) => state.orderDetails);
  const { err: updateError, isUpdated } = useSelector((state) => state.order);
  const [status, setStatus] = useState("");

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(id, myForm));
  };

  useEffect(() => {
    if (err) {
      toast.error(err.message || err);
      dispatch(clearErrors());
    }

    if (updateError) {
      toast.error(updateError.message || updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Order Updated Successfully");
      dispatch({ type: "UPDATE_ORDER_RESET" });
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, err, id, isUpdated, updateError]);

  return (
    <section className="container my-20">
      <MetaData title="Process Orders | Q Sneakers " />
      {loading && <Loading />}
      <div className="overflow-hidden">
        <Sidebar />
        <div className="my-14 flex flex-wrap md:ml-[300px]">
          {loading ? (
            <h2 className="my-4 ml-4 flex items-center justify-center px-4 text-center text-2xl font-semibold">
              No Order Details Found
            </h2>
          ) : (
            <>
              <div className="my-4 flex-grow lg:w-3/4">
                <div className="mx-4 text-center sm:mb-8 sm:text-left">
                  <h2 className="mb-8 text-3xl font-medium">Shipping Info</h2>
                  <p className="my-4">
                    <span className="font-semibold">Name :</span> &nbsp;{" "}
                    {order.user.name}
                  </p>
                  <p className="my-4">
                    <span className="font-semibold">Phone :</span> &nbsp;
                    {order.shippingInfo.phone}
                  </p>
                  <p className="my-4">
                    <span className="font-semibold">Address :</span> &nbsp;
                    {order.shippingInfo.post}, {order.shippingInfo.address},{" "}
                    {order.shippingInfo.city}, {order.shippingInfo.country}
                  </p>
                </div>
                <div className="my-6">
                  <h2 className="mx-4 mb-4 text-center text-3xl font-medium sm:text-left">
                    Payment
                  </h2>
                  <div className="mx-4 my-4 text-center sm:text-left">
                    <h3 className="my-2">
                      Status :{" "}
                      <span className="text-lg font-semibold text-green-500">
                        {order.paymentInfo.status}
                      </span>{" "}
                    </h3>
                    <h3 className="my-2">
                      Amount : ${order.shippingCharge + order.totalPrice}
                    </h3>
                  </div>
                </div>
                <div className="my-8 text-center sm:text-left">
                  <h2 className="mx-4  text-center text-3xl font-medium sm:text-left">
                    Order Status
                  </h2>
                  <div className="mx-4 my-2">
                    <h3 className="border-b font-semibold underline">
                      {order.orderStatus}
                    </h3>
                  </div>
                </div>
                <div className="my-6">
                  <h2 className="mx-4 mb-2 text-center text-3xl font-medium sm:text-left">
                    Your Carts
                  </h2>
                  {order.orderItems.map(
                    ({ product, image, name, price, quantity }) => (
                      <div
                        key={product}
                        className="mx-4 my-6 flex flex-col items-center justify-center pr-6 sm:mr-10 sm:flex-row sm:justify-between"
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
                    )
                  )}
                </div>
              </div>
              <div
                className={`${
                  order.orderStatus === "Delivered" && "hidden"
                } mt-6 flex min-w-[200px] flex-grow flex-col justify-end border-gray-600 px-6 py-2 md:px-8 md:py-6 lg:w-1/4 lg:border-l`}
              >
                <h2 className="mb-10 text-center text-2xl font-bold underline">
                  Process Order
                </h2>

                <form onSubmit={updateOrderSubmitHandler}>
                  <select
                    onChange={(e) => setStatus(e.target.value)}
                    name="orderProcess"
                    id=""
                    className="my-8 w-full px-3 py-2 "
                  >
                    <option value="">Choose Category</option>
                    {order.orderStatus === "Processing" && (
                      <option value="Shipped">Shipped</option>
                    )}

                    {order.orderStatus === "Shipped" && (
                      <option value="Delivered">Delivered</option>
                    )}
                  </select>

                  <button
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                    className="mt-3 flex items-center justify-center rounded-md bg-gray-900 py-3.5 font-bold text-white duration-500 hover:bg-gray-600 sm:w-full"
                    type="submit"
                  >
                    Process
                    <RightArrow />
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
