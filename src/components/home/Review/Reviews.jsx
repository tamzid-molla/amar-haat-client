import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/axios/useAxiosSecure";
import LoaderSVG from "../../shared/loaderSVG/LoaderSVG";
import NoDataFound from "../../shared/NoDataFound/NoDataFound";

const Reviews = ({ productId }) => {
  const axiosSecure = useAxiosSecure();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["product reviews", productId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${productId}`);
      return res.data;
    },
  });
  if (isLoading) return <LoaderSVG></LoaderSVG>;
  if (!reviews.length) return <NoDataFound message="No reviews yet for this product." />;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">💬 User Reviews</h2>

      <ul className="space-y-6">
        {reviews.map((r) => (
          <li key={r._id} className="border-b pb-4 last:border-none flex gap-4">
            <img
              src={r.userPhoto || "https://i.ibb.co/sdN75HdP/vector-flat-illustration-grayscale-avatar-600nw-2264922221.webp"}
              alt={r.userName}
              className="w-14 h-14 rounded-full object-cover border"
            />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{r.userName}</h3>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < r.rating ? "text-yellow-400" : "text-gray-300"} size={18} />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mt-1 whitespace-pre-line">{r.comment}</p>
              <p className="text-sm text-gray-400 italic mt-1">
                {new Date(r.date).toLocaleDateString("en-BD", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}{" "}
                — {r.userEmail}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reviews;
