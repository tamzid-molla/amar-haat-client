import { Link, useNavigate } from "react-router";
import { FaStore, FaCalendarAlt, FaUser, FaMoneyBillWave } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import useAuth from "../../hooks/firebase/useAuth";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import PageLoader from "../../components/shared/pageLoader/PageLoader";
import { useEffect, useState } from "react";
import NoDataFound from "../../components/shared/NoDataFound/NoDataFound";

const AllProducts = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [sortOrder, setSortOrder] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const formattedStart = startDate ? startDate.toISOString() : "";
  const formattedEnd = endDate ? endDate.toISOString() : "";

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["all products", formattedStart, formattedEnd, sortOrder],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_baseURL}/products/all`, {
        params: {
          start: formattedStart,
          end: formattedEnd,
          sort: sortOrder,
        },
      });
      return res.data;
    },
  });

  useEffect(() => {
    document.title = "AmarHaat || All Products";
  }, []);

  return (
    <div className="p-4 md:p-8 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-accent">All Market Products</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-end mb-8 p-4 rounded-xl">
        {/* Start Date */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-600 mb-1">📅 Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-accent text-sm"
            placeholderText="Select start date"
          />
        </div>

        {/* End Date */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-600 mb-1">📅 End Date</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-accent text-sm"
            placeholderText="Select end date"
          />
        </div>

        {/* Sort by Price */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-600 mb-1">💵 Sort By Price</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent">
            <option value="">Default</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
      </div>

      {/* Loader */}
      {isLoading && (
        <div className="flex justify-center items-center h-[300px]">
          <PageLoader />
        </div>
      )}

      {/* No Data Found */}
      {!isLoading && products?.length === 0 && (
        <div className="flex justify-center items-center h-[300px]">
          <NoDataFound />
        </div>
      )}

      {/* Product Grid */}
      {!isLoading && products?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="border rounded-xl shadow-md p-4 space-y-2 hover:shadow-lg transition bg-white">
              <img src={product.product_image} alt={product.itemName} className="w-full h-48 object-cover rounded-md" />
              <h3 className="text-xl font-semibold text-accent">{product.itemName}</h3>
              <p className="flex items-center gap-2">
                <FaMoneyBillWave className="text-green-500" /> ৳{product.pricePerUnit}/kg
              </p>
              <p className="flex items-center gap-2">
                <FaCalendarAlt className="text-blue-500" /> {new Date(product.created_at).toLocaleDateString()}
              </p>
              <p className="flex items-center gap-2">
                <FaStore className="text-orange-500" /> {product.market}
              </p>
              <p className="flex items-center gap-2">
                <FaUser className="text-indigo-500" /> {product.vendor_name}
              </p>

              <button
                className="w-full mt-2 cursor-pointer px-4 py-2 bg-accent text-white rounded-lg font-medium hover:bg-opacity-90"
                onClick={() => {
                  if (!user) navigate("/login");
                  else navigate(`/product/${product._id}`);
                }}>
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
