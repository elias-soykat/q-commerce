import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./components/Admin";
import {
  ForgetPassword,
  Login,
  PrivateRoute,
  Register,
  ResetPassword,
  UpdatePassword,
  UpdateProfile,
} from "./components/Auth";
import {
  ConfirmOrder,
  OrderSuccess,
  Payment,
  Shipping,
} from "./components/Cart";
import { Footer } from "./components/Common";
import { NavBar } from "./components/Header";
import { MyOrders, OrderDetails } from "./components/Order";
import { ScrollTop } from "./helper";
import { Account, AllProducts, Auth, Cart, Home, ProductSingle } from "./pages";

export default function App() {
  const [stripeKey, setStripeKey] = useState();

  const getStripeApiKey = async () => {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeKey(data.stripeApiKey);
  };

  useEffect(() => {
    getStripeApiKey();
  }, []);

  return (
    <ScrollTop>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<AllProducts />}>
          <Route path=":keyword" element={<AllProducts />} />
          <Route path="/products" element={<AllProducts />} />
        </Route>

        {/* Normal Route  */}
        <Route path="/product/:id" element={<ProductSingle />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/password/forget" element={<ForgetPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />

        {/* Private Route  */}
        <Route element={<PrivateRoute />}>
          <Route path="/account" element={<Account />} />
          <Route path="/user/update" index element={<UpdateProfile />} />
          <Route path="/password/update" element={<UpdatePassword />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/order/confirm" element={<ConfirmOrder />} />
          <Route path="/order/success" element={<OrderSuccess />} />
          <Route
            path="/process/payment"
            element={
              <Elements stripe={loadStripe(stripeKey)}>
                <Payment />
              </Elements>
            }
          />

          <Route path="/orders" element={<MyOrders />} />
          <Route path="/order/:id" element={<OrderDetails />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Route>

        {/* auth route  */}
        <Route path="auth/*" element={<Auth />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
      <Footer />
    </ScrollTop>
  );
}
