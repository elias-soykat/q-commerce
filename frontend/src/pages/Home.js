import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from ".././redux/actions/productAction";
import { Banner } from "../components/Header";
import { Products, TopProducts } from "../components/Product";
import { BrandLogo, FreeDelivery, Reviews } from "../components/Utils";
import { MetaData } from "../helper";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <>
      <MetaData title="Home | Q - Sneakers" />
      <Banner />
      <FreeDelivery />
      <Products />
      <BrandLogo />
      <TopProducts />
      <Reviews />
    </>
  );
}
