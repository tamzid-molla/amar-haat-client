import { useQuery } from "@tanstack/react-query";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { FaStore, FaCalendarAlt, FaUser, FaStar, FaCartPlus } from "react-icons/fa";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/axios/useAxiosSecure";
import PageLoader from "../../components/shared/pageLoader/PageLoader";

const ProductDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { data: product = [], isLoading } = useQuery({
    queryKey: ["product details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/product/${id}`);
      return res.data;
    },
  });
  const {
    market,
    marketDescription,
    vendor_email,
    vendor_name,
    itemName,
    itemDescription,
    pricePerUnit,
    product_image,
    prices,
    created_at,
  } = product;
  if (isLoading) return <PageLoader></PageLoader>;

   return (
    <div className="p-4 md:p-8 grid mt-10 w-11/12 mx-auto md:grid-cols-2 gap-6 rounded-xl bg-bgSecondary">
      {/* Left side - Product Image */}
      <div>
        <img
          src={product_image}
          alt={itemName}
          className="w-full h-auto rounded-xl shadow-md"
        />
      </div>

      {/* Right side - Details */}
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-accent">{itemName}</h2>
        <p className="text-gray-600">{itemDescription}</p>

        <div className="space-y-2 text-gray-800">
          <p className="flex items-center gap-2 text-lg">
            <FaStore className="text-accent" /> <strong>Market:</strong> {market}
          </p>
          <p className="text-sm text-gray-500 italic">{marketDescription}</p>

          <p className="flex items-center gap-2">
            <FaCalendarAlt className="text-accent" /> <strong>Date:</strong>{" "}
            {new Date(created_at).toLocaleDateString()}
          </p>

          <p className="text-lg">
            🥕 <strong>Current Price:</strong> ৳{pricePerUnit}/kg
          </p>

          <p className="flex items-center gap-2">
            <FaUser className="text-accent" /> <strong>Vendor:</strong> {vendor_name} ({vendor_email})
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-4">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow"
          >
            <FaStar /> Add to Watchlist
          </button>

          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow">
            <FaCartPlus /> Buy Product
          </button>
        </div>

        {/* User Reviews Placeholder */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">💬 User Reviews</h3>
          <p className="text-sm text-gray-500">No reviews yet.</p>
        </div>

        {/* Price Comparison Chart */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">📊 Price Comparison</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={prices}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[850, 880]} />
              <Tooltip />
              <Line type="monotone" dataKey="price" stroke="#82ca9d" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
