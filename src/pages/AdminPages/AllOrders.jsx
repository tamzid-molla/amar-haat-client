import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/axios/useAxiosSecure";
import PageLoader from "../../components/shared/pageLoader/PageLoader";
import NoDataFound from "../../components/shared/NoDataFound/NoDataFound";


const AllOrders = () => {
  const axiosSecure = useAxiosSecure();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["all-orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/orders");
      return res.data;
    },
  });

  if (isLoading) return <PageLoader />;
  if (orders.length === 0) return <NoDataFound message="No orders found." />;

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4">🛒 All Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Buyer Email</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b">
                <td className="p-3">{order.productName}</td>
                <td className="p-3">{order.buyerEmail}</td>
                <td className="p-3">৳{order.price}</td>
                <td className="p-3">{new Date(order.date).toLocaleDateString()}</td>
                <td className="p-3">{order.transactionId || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllOrders;
