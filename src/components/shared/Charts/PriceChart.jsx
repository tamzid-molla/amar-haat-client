import { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const PriceChart = ({ prices }) => {
  const [startDate, setStartDate] = useState("");

  // Format and filter prices between selected date and today
  const filteredPrices = useMemo(() => {
    if (!startDate) return prices;

    const start = new Date(startDate);
    const today = new Date();

    return prices.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= start && itemDate <= today;
    });
  }, [prices, startDate]);

  return (
    <section className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h3 className="text-xl font-bold">Price Comparison</h3>
        <input
          type="date"
          className="border border-gray-300 rounded px-3 py-1"
          value={startDate}
          max={new Date().toISOString().split("T")[0]} // disable future
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={filteredPrices}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#60a5fa"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
};

export default PriceChart;
