import React from "react";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";

const Input = ({
  type,
  name,
  placeholder,
  icon: Icon,
  isPassword = false,
  showPass,
  toggleShowPass,
}) => {
  return (
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-IconText" />
      )}

      {isPassword && (
        <button type="button" onClick={toggleShowPass}>
          {showPass ? (
            <FaRegEye className="absolute right-3 top-1/2 transform -translate-y-1/2 text-IconText cursor-pointer" />
          ) : (
            <FaEyeSlash className="absolute right-3 top-1/2 transform -translate-y-1/2 text-IconText cursor-pointer" />
          )}
        </button>
      )}

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
        required
      />
    </div>
  );
};

export default Input;
