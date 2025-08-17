import { useState } from "react";
import { FaLeaf, FaTruck, FaWallet, FaHandsHelping, FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import useAuth from "../../hooks/firebase/useAuth";
import useAxiosSecure from "../../hooks/axios/useAxiosSecure";
import LoaderSVG from "../../components/shared/loaderSVG/LoaderSVG";

const Services = () => {
  const { user, role } = useAuth();
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");
  const axiosSecure = useAxiosSecure();

  const handleReview = async (e) => {
    e.preventDefault();
    if (!rating || !review.trim()) {
      return toast.error("Please provide both a rating and a comment.");
    }
    const reviewData = {
      userName: user?.displayName || "Anonymous",
      userEmail: user?.email,
      userPhot: user?.photoURL,
      rating,
      review,
      date: new Date(),
    };

    console.log(reviewData);

    try {
      setLoading(true);
      const res = await axiosSecure.post("/reviewData", reviewData);
      if (res.data.message) {
        toast.error(res.data.message);
        return;
      }
      toast.success("Review submitted successfully!");
      setRating(0);
      setHover(0);
      setReview("");
    } catch (error) {
      toast.error("Failed to submit review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-gray-800 min-h-screen pt-28 w-11/12 mx-auto">
      {/* Hero Section */}
      <section className="bg-accent text-white py-20 px-6 text-center rounded-lg">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
        <p className="max-w-2xl mx-auto text-lg opacity-90">
          Quality, fresh, and affordable products delivered directly from local vendors.
        </p>
      </section>

      {/* Services Cards */}
      <section className="mx-auto py-16 px-6 md:px-12 mt-20 bg-bgSecondary rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-12">What We Offer</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
            <FaLeaf className="text-green-600 text-5xl mb-4" />
            <h3 className="font-semibold text-xl mb-2">Fresh Products</h3>
            <p className="text-gray-600">Fresh vegetables, fruits, and groceries from local vendors.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
            <FaTruck className="text-green-600 text-5xl mb-4" />
            <h3 className="font-semibold text-xl mb-2">Fast Delivery</h3>
            <p className="text-gray-600">Quick and reliable delivery ensuring your products remain fresh.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
            <FaWallet className="text-green-600 text-5xl mb-4" />
            <h3 className="font-semibold text-xl mb-2">Fair Pricing</h3>
            <p className="text-gray-600">Vendors set their own prices, so you always get real market rates.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
            <FaHandsHelping className="text-green-600 text-5xl mb-4" />
            <h3 className="font-semibold text-xl mb-2">Support Local Vendors</h3>
            <p className="text-gray-600">
              Connecting local farmers & sellers directly with buyers for sustainable growth.
            </p>
          </div>
        </div>
      </section>

      {/* Review Section */}
      <section className="bg-accent/5 py-16 px-6 mt-20 rounded-lg">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Leave Your Review</h2>
          <form onSubmit={handleReview} className="bg-white p-8 rounded-3xl shadow-xl">
            {/* Review */}
            <textarea
              placeholder="Write your review"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 resize-none focus:ring-2 focus:ring-green-500 focus:outline-none transition"
              rows="4"
              onChange={(e) => {
                setReview(e.target.value);
              }}
              disabled={role === "admin"}
              value={review}></textarea>

            {/* Star Rating */}
            <div className="flex gap-1 justify-center items-center mb-3">
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
                        starValue <= (hover || rating) ? "text-yellow-400" : "text-gray-300"
                      }`}
                      onMouseEnter={() => setHover(starValue)}
                      onMouseLeave={() => setHover(0)}
                    />
                  </label>
                );
              })}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={role === "admin" || loading}
              className={`px-6 py-3 w-full rounded-full text-white font-semibold shadow ${
                role !== "admin" ? "bg-accent hover:bg-accent/90 cursor-pointer" : "bg-gray-400 cursor-not-allowed"
              }`}>
              {loading ? <LoaderSVG message={"Posting Review..."}></LoaderSVG> : "Submit Review"}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <section className="bg-accent text-white py-12 mt-20 text-center">
        <h2 className="text-2xl font-bold mb-2">Amar Haat – Your Market, Your Way</h2>
        <p className="opacity-90">Freshness you can trust, straight to your home.</p>
      </section>
    </div>
  );
};

export default Services;
