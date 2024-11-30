import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { EditIcon, TrashIcon } from "../../assets/svg";
import { Loading, MetaData } from "../../helper";
import { deleteOrder, getAllOrders } from "../../redux/actions/orderAction";
import { clearErrors } from "../../redux/actions/userAction";
import Sidebar from "./Sidebar";

export default function OrderList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [removeItem, setRemoveItem] = useState("");

  const {
    err,
    orders,
    loading: isLoading,
  } = useSelector((state) => state.allOrders);

  const {
    err: deleteError,
    isDeleted,
    loading,
  } = useSelector((state) => state.order);

  useEffect(() => {
    if (err) {
      toast.error(err.message || err);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Order Deleted Successfully");
      navigate("/admin/orders");
      dispatch({ type: "DELETE_ORDER_RESET" });
    }

    dispatch(getAllOrders());
  }, [deleteError, dispatch, err, isDeleted, navigate]);

  const checkOrder = orders.length > 0;

  const orderRemoveHandler = (id) => {
    dispatch(deleteOrder(id));
    setRemoveItem(id);
  };

  return (
    <section className="container my-20">
      <MetaData title="All Orders | Q Sneakers " />
      {(loading || isLoading) && <Loading />}
      <div className={`${checkOrder && "overflow-auto"}`}>
        <Sidebar />
        <div className="my-4 flex flex-col sm:my-0 md:ml-[300px]">
          <h3 className="my-10 text-center text-2xl font-medium sm:text-3xl">
            All Orders
          </h3>
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
              {!checkOrder && (
                <tr className="relative top-2 bottom-0 my-8 text-right text-lg font-medium">
                  <td>No Order is available</td>
                </tr>
              )}
              {checkOrder &&
                orders
                  .filter((id) => id._id !== removeItem)
                  .map((order) => (
                    <tr
                      key={order._id}
                      className="h-14 border-b border-gray-400 duration-200 hover:bg-gray-500 hover:text-white"
                    >
                      <td className="pl-10">{order._id}</td>
                      <td>{order.orderStatus}</td>
                      <td>{order.orderItems.length}</td>
                      <td>$ {order.totalPrice}</td>
                      <td className="flex items-center justify-center pt-3">
                        <Link to={`/admin/order/${order._id}`} className="mr-2">
                          <EditIcon />
                        </Link>
                        <button
                          type="button"
                          onClick={() => orderRemoveHandler(order._id)}
                        >
                          <TrashIcon />
                        </button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
