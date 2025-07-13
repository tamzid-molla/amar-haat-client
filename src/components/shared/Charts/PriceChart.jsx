
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const PriceChart = ({prices}) => {
    return (
        <section className="">
            <h3 className="text-xl font-bold mb-4">Price Comparison</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={prices}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="price" stroke="#60a5fa" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </section>
    );
};

export default PriceChart;