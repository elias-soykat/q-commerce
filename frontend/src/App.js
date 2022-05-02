import React from "react";
import { Route, Routes } from "react-router-dom";
import { Footer } from "./components/Common";
import { NavBar } from "./components/Header";
import { ScrollTop } from "./helper";
import {
  ProductSingle,
  Home,
  Products,
  Cart,
  Auth,
  Register,
  Login,
  // Account,
} from "./pages";

export default function App() {
  return (
    <ScrollTop>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />}>
          <Route path=":keyword" element={<Products />} />
          <Route path="/products" element={<Products />} />
        </Route>
        <Route path="/product/:id" element={<ProductSingle />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="auth/*" element={<Auth />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        {/* <Route path="/account" element={<Account />} /> */}
      </Routes>
      <Footer />
    </ScrollTop>
  );
}
