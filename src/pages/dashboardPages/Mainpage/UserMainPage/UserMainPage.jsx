import { useQuery } from "@tanstack/react-query";
import { FaShoppingCart, FaHeart, FaStar, FaClock } from "react-icons/fa";
import useAxiosSecure from "../../../../hooks/axios/useAxiosSecure";
import useAuth from "../../../../hooks/firebase/useAuth";
import PageLoader from "../../../../components/shared/pageLoader/PageLoader";
import StatCard from "../../../../components/shared/StateCards/StatCard";

const UserMainPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["user-stats", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/stats?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <PageLoader />;

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-accent mb-4">User Dashboard Overview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard icon={FaShoppingCart} title="My Orders" value={stats.myOrders} color="bg-blue-600" />
        <StatCard icon={FaHeart} title="Watchlist Items" value={stats.watchList} color="bg-pink-500" />
        <StatCard icon={FaStar} title="Total Reviews" value={stats.myReviews} color="bg-yellow-500" />
        <StatCard icon={FaClock} title="Last Logged In" value={stats.lastLogin ? new Date(stats.lastLogin).toLocaleString() : "N/A"} color="bg-gray-700" />
      </div>
    </div>
  );
};

export default UserMainPage;
