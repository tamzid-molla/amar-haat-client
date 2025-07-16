import { useState } from "react";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";
import useAuth from "../../hooks/firebase/useAuth";
import useAxiosSecure from "../../hooks/axios/useAxiosSecure";
import LoaderSVG from "../shared/loaderSVG/LoaderSVG";

const WriteReview = ({ product }) => {
  const { user, role } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !comment.trim()) {
      return toast.error("Please provide both a rating and a comment.");
    }

    const reviewData = {
      productId: product?._id,
      product_Name:product?.itemName,
      product_image:product?.product_image,
      userName: user?.displayName || "Anonymous",
      userEmail: user?.email,
      userPhot: user?.photoURL,
      rating,
      comment,
      date: new Date(),
    };

    try {
      setLoading(true)
      const res = await axiosSecure.post("/reviews", reviewData);
      if (res.data.message) {
        toast.error(res.data.message)
        return
      }
      toast.success("Review submitted successfully!");
      setRating(0);
      setHover(0);
      setComment("");
    } catch (error) {
      toast.error("Failed to submit review.");
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Star Rating */}
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => {
            const starValue = i + 1;
            return (
              <label key={i}>
                <input
                  type="radio"
                  name="rating"
                  value={starValue}
                  className="hidden"
                  onClick={() => setRating(starValue)}
                />
                <FaStar
                  size={30}
                  className={`cursor-pointer transition-colors duration-150 ${
                    starValue <= (hover || rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  onMouseEnter={() => setHover(starValue)}
                  onMouseLeave={() => setHover(0)}
                />
              </label>
            );
          })}
        </div>

        {/* Comment Box */}
        <textarea
          rows="4"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your feedback about the price, freshness, or quality..."
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          disabled={role !== "user"}
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={role !== "user" || loading}
          className={`px-6 py-3 rounded-full text-white font-semibold shadow ${
            role === "user"
              ? "bg-accent hover:bg-accent/90 cursor-pointer"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {loading ? (
           <LoaderSVG message={"Posting Review..."}></LoaderSVG> 
          ) : (
            "Submit Review"
          )}
        </button>
      </form>
    </div>
  );
};

export default WriteReview;
