import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/axios/useAxiosSecure";
import PageLoader from "../../components/shared/pageLoader/PageLoader";
import NoDataFound from "../../components/shared/NoDataFound/NoDataFound";

const PriceTrends = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const axiosSecure = useAxiosSecure();

  // Load unique item names
  const { data: items = [], isLoading } = useQuery({
    queryKey: ["price trend"],
    queryFn: async () => {
      const res = await axiosSecure.get("/unique_itemName");
      return res.data;
    },
  });

  // Fetch product with all its prices
  const handleItemClick = async (itemName) => {
    try {
      const res = await axiosSecure.get(`/product_by_itemName/${itemName}`);
      setSelectedItem(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Filter prices for last 7 days
  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);

  const recentPrices = (selectedItem?.prices || []).filter((item) => {
    const itemDate = new Date(item.date);
    return itemDate >= sevenDaysAgo && itemDate <= today;
  });

  // Calculate trend
  const trend =
    recentPrices.length > 1
      ? (
          ((recentPrices.at(-1).price - recentPrices[0].price) /
            recentPrices[0].price) *
          100
        ).toFixed(1)
      : 0;

  const isPositive = trend >= 0;

  if (isLoading) return <PageLoader />;

  return (
    <div className="flex flex-col lg:flex-row bg-white shadow-md rounded-xl p-6">
      {/* Sidebar */}
      <div className="lg:w-1/4 border-r pr-4 mb-4 lg:mb-0">
        <h2 className="text-xl font-bold mb-4">🧺 Tracked Items</h2>
        <ul className="space-y-2">
          {items.map((itemName, idx) => (
            <li
              key={idx}
              onClick={() => handleItemClick(itemName.itemName)}
              className={`px-3 py-2 rounded-lg cursor-pointer transition-all flex items-center gap-2 ${
                selectedItem?.itemName === itemName.itemName
                  ? "bg-accent text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              <span className="capitalize">{itemName.itemName}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Chart section */}
      <div className="lg:w-3/4 pl-6 space-y-4">
        {selectedItem ? (
          <>
            <h2 className="text-2xl font-bold capitalize">{selectedItem.itemName}</h2>
            <p className="text-gray-600">{selectedItem.market}</p>
            <p className="text-gray-600 mb-2">Vendor: {selectedItem.vendor_name}</p>

            {/* Chart & Trend */}
            {recentPrices.length > 1 ? (
              <>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={recentPrices}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="price"
                        stroke="#10B981"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <p
                  className={`font-semibold ${
                    isPositive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  Trend: {isPositive ? "+" : ""}
                  {trend}% over the last {recentPrices.length} update(s)
                </p>
              </>
            ) : (
              <NoDataFound message="No price updates found in the past 7 days." />
            )}
          </>
        ) : (
          <NoDataFound message="Please select an item to view trends." />
        )}
      </div>
    </div>
  );
};

export default PriceTrends;
