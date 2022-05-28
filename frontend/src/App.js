import React from "react";
import { Route, Routes } from "react-router-dom";
import { Footer } from "./components/Common";
import { NavBar } from "./components/Header";
import {
  ForgetPassword,
  Login,
  PrivateRoute,
  Register,
  ResetPassword,
  UpdatePassword,
  UpdateProfile,
} from "./components/Auth";
import { ScrollTop } from "./helper";
import { ProductSingle, Home, AllProducts, Auth, Account, Cart } from "./pages";
import { Shipping } from "./components/Cart";

export default function App() {
  return (
    <ScrollTop>
      <NavBar />
      <Routes>
        {/* Dashboard  */}
        {/* <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} adminRoute={true}>
              <h2 className="text-2xl">Dashboard Page</h2>
            </PrivateRoute>
          }
        /> */}

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
          <Route path="/blogs" element={<MyBlog />} />
        </Route>

        {/* Authentication Route  */}
        <Route path="auth/*" element={<Auth />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
      <Footer />
    </ScrollTop>
  );
}

const MyBlog = () => <div className="text-4xl p-24">My MyBlog...</div>;
