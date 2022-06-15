import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Loading, MetaData, SkeletonLoad } from "../../helper";
import { clearErrors, getOrderDetails } from "../../redux/actions/orderAction";

export default function OrderDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { order, err, loading } = useSelector((state) => state.orderDetails);

  useEffect(() => {
    if (err) {
      toast.error(err.message || err);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, err, id]);

  return (
    <section className="container my-20 px-3 sm:px-0">
      {loading && <Loading />}
      <MetaData title="Order Details | Q Sneakers" />

      {loading ? (
        <SkeletonLoad />
      ) : (
        <div className="py-16">
          <h1 className="text-xl font-semibold text-gray-800 sm:text-4xl">
            Order #{order._id}
          </h1>

          <div className="mt-10">
            <h3 className="my-4 text-xl font-medium underline sm:text-2xl">
              Shipping Info
            </h3>
            <p className="py-1 text-lg">
              <span className="font-medium">Name</span> : &nbsp;{" "}
              {order.user.name}
            </p>
            <p className="py-1 text-lg">
              <span className="font-medium">Phone</span> : &nbsp;
              {order.shippingInfo.phone}
            </p>
            <p className="py-1 text-lg">
              <span className="font-medium">Address</span> : &nbsp;
              {order.shippingInfo.post}, {order.shippingInfo.address},
              {order.shippingInfo.city},
            </p>
          </div>
          <div className="mt-10">
            <h3 className="my-4 text-xl font-medium underline sm:text-2xl">
              Payment
            </h3>
            <p className="py-1 text-lg">
              <span className="font-medium">Payment Status</span> : &nbsp;
              {order.paymentInfo.status}
            </p>
            <p className="py-1 text-lg">
              <span className="font-medium">Amount</span> : &nbsp; $
              {order.itemsPrice}
            </p>
          </div>
          <div className="mt-10">
            <h3 className="my-4 text-xl font-medium underline sm:text-2xl">
              Order Status
            </h3>
            <p className="py-1 text-lg">
              <span className="font-medium">Order Status</span> : &nbsp;
              <span className="text-xl font-semibold">{order.orderStatus}</span>
            </p>
          </div>

          <div className="mt-10">
            <h3 className="my-4 text-xl font-medium underline sm:text-2xl">
              Order Items
            </h3>
            {order.orderItems.map(
              ({ product, image, name, price, quantity }) => (
                <div
                  key={product}
                  className="my-6 flex w-full flex-col items-center justify-center sm:mr-10 sm:w-7/12 sm:flex-row sm:justify-between"
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
      )}
    </section>
  );
}
