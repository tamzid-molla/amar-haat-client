import { FaStar } from "react-icons/fa";
import useAuth from "../../../hooks/firebase/useAuth";
import useAxiosSecure from "../../../hooks/axios/useAxiosSecure";
import { toast } from "react-toastify";

const WatchList = ({ product }) => {
  const { user, role } = useAuth();
  const axiosSecure = useAxiosSecure();

  const handleWatchList = async () => {
    const watchData = {
      userEmail: user.email,
      productId: product._id,
      productName: product.itemName,
      productImage: product.product_image,
      pricePerUnit: product.pricePerUnit,
      market: product.market,
      vendorEmail: product.vendor_email,
      addedAt: new Date(),
    };

    try {
      const res = await axiosSecure.post("/watchlist", watchData);
      if (res.data?.insertedId) {
        toast.success("Added to watchlist!");
      } else if (res.data?.message) {
        toast.warning(res?.data?.message);
      } else {
        toast.error("Failed to add to watchlist.");
      }
    } catch (err) {
      toast.error("Something went wrong!");
      console.error(err);
    }
  };

  const isDisabled = role === "admin" || role === "vendor";

  return (
    <button
      onClick={handleWatchList}
      disabled={isDisabled}
      className={`${
        isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-accent hover:bg-accent-dark cursor-pointer"
      } px-5 py-3 text-white font-semibold rounded-full shadow transition-all`}>
      <FaStar className="inline mr-2" /> Add to Watchlist
    </button>
  );
};

export default WatchList;
