import React from "react";
import { FaStore, FaCalendarAlt, FaUser, FaStar, FaCartPlus, FaUserCircle } from "react-icons/fa";
import useAuth from "../../../hooks/firebase/useAuth";

const ProductPayment = () => {
  const { user, role } = useAuth();
  return (
    <button
      disabled={role === "user" ? true : false}
      className={`${
        role === "user" ? " cursor-pointer " : "cursor-not-allowed"
      }px-5 py-3 bg-accent text-white font-semibold rounded-full shadow`}>
      <FaCartPlus className="inline mr-2" /> Buy Product
    </button>
  );
};

export default ProductPayment;
