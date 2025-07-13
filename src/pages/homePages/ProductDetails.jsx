// 👇 import at top
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { FaStore, FaCalendarAlt, FaUser, FaStar, FaCartPlus, FaUserCircle } from "react-icons/fa";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/axios/useAxiosSecure";
import PageLoader from "../../components/shared/pageLoader/PageLoader";
import Reviews from "../../components/home/Review/Reviews";
import WriteReview from "../../components/forms/WriteReview";
import PriceChart from "../../components/shared/Charts/PriceChart";

const ProductDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { data: product = {}, isLoading } = useQuery({
    queryKey: ["product details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/product/${id}`);
      return res.data;
    },
  });

  const [activeTab, setActiveTab] = useState("view");

  const {
    market,
    marketDescription,
    vendor_email,
    vendor_name,
    itemName,
    itemDescription,
    pricePerUnit,
    product_image,
    prices = [],
    created_at,
  } = product;

  console.log(product);

  if (isLoading) return <PageLoader />;

  return (
    <div className="w-11/12 mx-auto p-8 space-y-12">
      {/* ----------- Top Section (Image + Details) ------------ */}
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Left: Image */}
        <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
          <img
            src={product_image}
            alt={itemName}
            className="w-full h-[500px] object-cover object-center"
            loading="lazy"
          />
        </div>

        {/* Right: Details */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">{itemName}</h1>
          <p className="text-gray-700">{itemDescription}</p>
          <p className="italic text-gray-500"> {marketDescription}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800 text-lg font-medium">
            <p>
              <FaStore className="inline text-indigo-600 mr-2" />
              Market: {market}
            </p>
            <p>
              <FaCalendarAlt className="inline text-indigo-600 mr-2" />
              Date: {new Date(created_at).toLocaleDateString()}
            </p>
            <p>
              {" "}
              Price: <span className="text-green-600 font-bold">৳{pricePerUnit}/kg</span>
            </p>
            <p>
              <FaUser className="inline text-indigo-600 mr-2" />
              Vendor: {vendor_name}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              className="px-5 py-3 rounded-full text-white font-semibold shadow
                 bg-gray-400 cursor-pointer ">
              <FaStar className="inline mr-2" /> Add to Watchlist
            </button>
            <button className="px-5 py-3 bg-accent cursor-pointer text-white font-semibold rounded-full shadow">
              <FaCartPlus className="inline mr-2" /> Buy Product
            </button>
          </div>
        </div>
      </div>

      {/* ----------- Tabs: Write & View Reviews ------------ */}
      <div className="bg-white p-6 rounded-xl border shadow-md">
        <div className="flex gap-6 text-lg font-semibold border-b mb-6">
          <button
            onClick={() => setActiveTab("view")}
            className={`pb-2 ${activeTab === "view" ? "text-accent border-b-2 border-accent" : "text-gray-500"}`}>
            👁️ View Reviews
          </button>
          <button
            onClick={() => setActiveTab("write")}
            className={`pb-2 ${activeTab === "write" ? "text-accent border-b-2 border-accent" : "text-gray-500"}`}>
            ✍️ Write a Review
          </button>
          <button
            onClick={() => setActiveTab("price")}
            className={`pb-2 ${activeTab === "price" ? "text-accent border-b-2 border-accent" : "text-gray-500"}`}>
            ✍️ Compare Price
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "view" && <Reviews />}
        {activeTab === "write" && <WriteReview />}
        {activeTab === "price" && <PriceChart prices={prices} />}
      </div>
    </div>
  );
};

export default ProductDetails;
