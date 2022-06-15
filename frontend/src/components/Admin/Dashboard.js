import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MetaData } from "../../helper";
import { getAllOrders } from "../../redux/actions/orderAction";
import { getAdminProducts } from "../../redux/actions/productAction";
import { getAllUsers } from "../../redux/actions/userAction";
import Sidebar from "./Sidebar";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productsList);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  const totalAmount = orders.reduce((acc, curr) => acc + curr.totalPrice, 0);

  return (
    <section className="container my-20">
      <MetaData title="Dashboard | Q Sneakers " />
      <div className="overflow-hidden">
        <Sidebar />
        <div className="my-4 flex flex-col sm:my-0 md:ml-[300px]">
          <h3 className="my-10 text-center text-2xl font-medium sm:text-4xl">
            Dashboard
          </h3>
          <h3 className="my-3 bg-slate-500 py-6 text-center text-lg font-medium leading-8 text-white sm:text-xl">
            Total Amount <br /> $ {totalAmount || "00"}
          </h3>

          <div className="my-8 flex flex-wrap items-center justify-evenly">
            <Link
              to="/admin/products"
              className="m-2 flex h-32 w-32 items-center justify-center rounded-full border bg-teal-600 p-6 text-center font-medium text-white"
            >
              Products {products.length || "00"}
            </Link>
            <Link
              to="/admin/orders"
              className="m-2 flex h-32 w-32 items-center justify-center rounded-full border bg-orange-600 p-6  text-center font-medium text-white"
            >
              Orders {orders.length || "00"}
            </Link>
            <Link
              to="/admin/users"
              className="m-2 flex h-32 w-32 items-center justify-center rounded-full border bg-violet-500 p-6 text-center  font-medium text-white"
            >
              Users {users.length || "00"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
