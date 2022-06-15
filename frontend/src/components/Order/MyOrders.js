import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RightArrow } from "../../assets/svg";
import { Loading, MetaData } from "../../helper";
import { myOrdersAction } from "../../redux/actions/orderAction";
import { clearErrors } from "../../redux/actions/userAction";

export default function MyOrders() {
  const dispatch = useDispatch();

  const { orders, loading, err } = useSelector((state) => state.myOrders);

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (err) {
      toast.error(err.message || err);
      dispatch(clearErrors());
    }

    dispatch(myOrdersAction());
  }, [dispatch, err]);

  return (
    <section className="container">
      <MetaData title={` ${user.name}'s Orders | Q Sneakers`} />
      {loading && <Loading />}

      <div className={`my-24 overflow-x-auto py-24 ${loading && "my-32"}`}>
        <table className="w-full text-left">
          <thead className="animate pulse h-12 rounded-lg bg-gray-800 text-white duration-200 hover:bg-gray-600">
            <tr className="text-lg font-semibold">
              <th className="pl-10">Order ID</th>
              <th>Status</th>
              <th>Item Qty</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders?.length === 0 ? (
              <h2 className="my-8 text-right text-lg font-medium">
                No Order is available
              </h2>
            ) : (
              orders?.map((order) => (
                <tr
                  key={order._id}
                  className="h-14 border-b border-gray-400 duration-200 hover:bg-gray-500 hover:text-white"
                >
                  <td className="pl-10">{order._id}</td>
                  <td
                    className={`${
                      order.orderStatus === "Processing"
                        ? "text-red-500"
                        : "text-green-500"
                    } font-medium`}
                  >
                    {order.orderStatus}
                  </td>
                  <td>{order.orderItems.length}</td>
                  <td>$ {order.totalPrice}</td>
                  <td>
                    <Link to={`/order/${order._id}`}>
                      <RightArrow border="border border-gray-400 p-1 rounded-full bg-gra-700 cursor-pointer h-[32px] w-8" />
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
