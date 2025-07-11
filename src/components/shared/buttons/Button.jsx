import React from "react";
import { ClipLoader } from "react-spinners";

const Button = ({ name, type,onClick, widthFull = false,loading = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={loading? true: false}
      type={type}
      className={`text-white bg-accent px-2 py-1 rounded-xl ${loading? "cursor-not-allowed":"cursor-pointer"} ${
          widthFull && "w-full py-2 font-medium"
        }`}>
      {loading ? <ClipLoader size={19}/>: name}
      </button>
  );
};

export default Button;
