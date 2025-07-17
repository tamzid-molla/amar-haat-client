import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/axios/useAxiosSecure";
import { FaUsers, FaBox, FaBullhorn, FaShoppingCart, FaUserShield, FaCheck, FaClock } from "react-icons/fa";
import StatCard from "../../components/shared/StateCards/StatCard";
import PageLoader from "../../components/shared/pageLoader/PageLoader";

const AdminMainPage = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/stats");
      return res.data;
    },
  });

  if (isLoading) return <PageLoader></PageLoader>;

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-accent mb-4"> Admin Dashboard Overview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard icon={FaUsers} title="Total Users" value={stats.totalUsers} color="bg-blue-500" />
        <StatCard icon={FaUserShield} title="Total Vendors" value={stats.totalVendors} color="bg-green-500" />
        <StatCard icon={FaBox} title="Products (Approved / Pending)" value={`${stats.approvedProducts} / ${stats.pendingProducts}`} color="bg-purple-600" />
        <StatCard icon={FaShoppingCart} title="Total Orders" value={stats.totalOrders} color="bg-yellow-500" />
        <StatCard icon={FaBullhorn} title="Advertisements (Approved / Pending)" value={`${stats.approvedAds} / ${stats.pendingAds}`} color="bg-pink-500" />
        <StatCard icon={FaClock} title="Last Logged In" value={stats.lastLogin ? new Date(stats.lastLogin).toLocaleString() : "N/A"} color="bg-red-500" />
      </div>
    </div>
  );
};

export default AdminMainPage;
