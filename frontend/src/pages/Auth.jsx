import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login, Register } from "../components/Auth";

export default function Auth() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
