import React, { useEffect } from "react";
import { ProductDetails, ProductReview } from "../components/Product";
import { getProductDetails } from ".././redux/actions/productAction";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Loading, ProductSkeleton } from "../helper";

export default function ProductSingle() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading } = useSelector((state) => state.productDetails);

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);
  return (
    <div>
      {loading && <Loading />}
      {Object.keys(product).length === 0 ? (
        <ProductSkeleton />
      ) : (
        <>
          <ProductDetails pro={product} />
          <ProductReview pro={product} />
        </>
      )}
    </div>
  );
}
