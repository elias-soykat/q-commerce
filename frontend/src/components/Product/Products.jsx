import React from "react";
import { useSelector } from "react-redux";
import { SkeletonLoad } from "../../helper";
import { Container, SectionHeader } from "../Common";
import Product from "./Product";

let skeleton = [0, 1, 2, 3, 4, 5, 6, 7];
export default function Products() {
  const { loading } = useSelector((state) => state.productsList);
  const { products } = useSelector((state) => state.productsList);

  return (
    <Container bg="bg-white my-4">
      {products.length === 0 ? (
        <h1 className="text-center text-2xl font-bold">No products found</h1>
      ) : (
        <SectionHeader text="text-center">Featured Products</SectionHeader>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 my-8 md:my-14 gap-6 md:gap-8">
        {loading && skeleton.map((product) => <SkeletonLoad key={product} />)}
        {products &&
          products.map((p) => <Product key={p._id} pro={{ ...p }} />)}
      </div>
    </Container>
  );
}
