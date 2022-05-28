import React from "react";
import { Link } from "react-router-dom";
import { VehicleTruck } from "../../assets/svg";
import { Container } from "../Common";

export default function Shipping() {
  return (
    <Container>
      <div className="my-10 sm:my-16">
        <h2 className="text-2xl sm:text-3xl font-medium sm:font-bold flex items-center">
          <Link to="/cart" className="border">
            Home > Pages > Shops{" "}
          </Link>
          <span className="ml-4">
            <VehicleTruck />
          </span>
        </h2>
      </div>
    </Container>
  );
}
