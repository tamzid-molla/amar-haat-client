import { FaCartPlus } from "react-icons/fa";
import useAuth from "../../../hooks/firebase/useAuth";
import { Link } from "react-router";

const ProductPayment = ({ product }) => {
  const { role } = useAuth();

  const isDisabled = role === "admin" || role === "vendor";
  return (
    <Link to={`/payment/${product._id}`}>
      <button
        disabled={isDisabled}
        className={`${
        isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-accent hover:bg-accent-dark cursor-pointer"
      } px-5 py-3 text-white font-semibold rounded-full shadow transition-all`}>
        <FaCartPlus className="inline mr-2" /> Buy Product
      </button>
    </Link>
  );
};

export default ProductPayment;
