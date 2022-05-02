import React, { useEffect } from "react";
import { Banner } from "../components/Header";
import { Products, TopProducts } from "../components/Product";
import { BrandLogo, FreeDelivery, Reviews } from "../components/Utils";
import { useDispatch } from "react-redux";
import { getProducts } from ".././redux/actions/productAction";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <>
      <Banner />
      <FreeDelivery />
      <Products />
      <BrandLogo />
      <TopProducts />
      <Reviews />
    </>
  );
}
