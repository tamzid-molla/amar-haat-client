
import { FaCartPlus, } from "react-icons/fa";
import useAuth from "../../../hooks/firebase/useAuth";
import { Link } from "react-router";

const ProductPayment = ({product}) => {
  const { user, role } = useAuth();
  return (
      <Link to={`/payment/${product._id}`}>
      <button
      disabled={role !== "user" ? true : false}
      className={`${
        role === "user" ? " cursor-pointer " : "cursor-not-allowed"
      }px-5 py-3 bg-accent text-white font-semibold rounded-full shadow`}>
      <FaCartPlus className="inline mr-2" /> Buy Product
    </button>
      </Link>
  );
};

export default ProductPayment;
