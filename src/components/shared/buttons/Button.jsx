import React from "react";

const Button = ({ name, type, widthFull = false }) => {
  return (
    <button
      type={type}
      className={`text-white bg-accent px-2 py-1 rounded-xl cursor-pointer ${
          widthFull && "w-full py-2 font-medium"
      }`}>
      {name}
      </button>
      
  );
};

export default Button;
