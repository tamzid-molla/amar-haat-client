import { useQuery } from "@tanstack/react-query";

import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/firebase/useAuth";
import useAxiosSecure from "../../hooks/axios/useAxiosSecure";
import PageLoader from "../../components/shared/pageLoader/PageLoader";
import NoDataFound from "../../components/shared/NoDataFound/NoDataFound";

const MyOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["myOrders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myOrders/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <PageLoader />;
  if (orders.length === 0) return <NoDataFound message="No orders found." />;

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4">🛒 My Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Transaction</th>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Market</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b">
                <td className="p-3">{order.transactionId}</td>
                <td className="p-3">{order.productName}</td>
                <td className="p-3">{order.marketName}</td>
                <td className="p-3">৳{order.price}</td>
                <td className="p-3">
                  {new Date(order.date).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => navigate(`/product/${order.productId}`)}
                    className="bg-accent text-white px-3 py-1 rounded">
                    <FaSearch className="inline mr-1" /> View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
