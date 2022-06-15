import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { EditIcon, TrashIcon } from "../../assets/svg";
import { Loading, MetaData } from "../../helper";
import {
  deleteSingleProduct,
  getAdminProducts,
} from "../../redux/actions/productAction";
import { clearErrors } from "../../redux/actions/userAction";
import Sidebar from "./Sidebar";

export default function ProductList() {
  const dispatch = useDispatch();
  const { products, loading, err } = useSelector((state) => state.productsList);

  const {
    isDelete,
    err: errDelete,
    loading: isLoading,
  } = useSelector((state) => state.product);

  useEffect(() => {
    if (err) {
      toast.error(err);
      dispatch(clearErrors());
    }

    if (errDelete) {
      toast.error(errDelete);
      dispatch(clearErrors());
    }

    if (isDelete) {
      toast.success(isDelete);
      dispatch({ type: "DELETE_PRODUCT_RESET" });
    }

    dispatch(getAdminProducts());
  }, [dispatch, err, errDelete, isDelete]);

  const checkProduct = products.length > 0;

  return (
    <section className="container my-20">
      <MetaData title="All Products | Q Sneakers " />
      {(loading || isLoading) && <Loading />}
      <div className={`${checkProduct && "overflow-auto"}`}>
        <Sidebar />
        <div className="my-4 flex flex-col sm:my-0 md:ml-[300px]">
          <h3 className="my-10 text-center text-2xl font-medium sm:text-3xl">
            All Products
          </h3>
          <table className="w-full text-left">
            <thead className="animate pulse h-12 rounded-lg bg-gray-800 text-white duration-200 hover:bg-gray-600">
              <tr className="text-lg font-semibold">
                <th className="pl-10">Product ID</th>
                <th>Name</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {!checkProduct && (
                <tr className="relative top-2 bottom-0 my-8 text-right text-lg font-medium">
                  <td>No Product is available</td>
                </tr>
              )}
              {checkProduct &&
                products.map((order) => (
                  <tr
                    key={order._id}
                    className="h-14 border-b border-gray-400 duration-200 hover:bg-gray-500 hover:text-white"
                  >
                    <td className="pl-10">{order._id}</td>
                    <td>{order.name}</td>
                    <td>{order.stock}</td>
                    <td>$ {order.price}</td>
                    <td className="flex items-center justify-center pt-3">
                      <Link
                        to={`/admin/product/update/${order._id}`}
                        className="mr-2"
                      >
                        <EditIcon />
                      </Link>
                      <button
                        onClick={() => dispatch(deleteSingleProduct(order._id))}
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
