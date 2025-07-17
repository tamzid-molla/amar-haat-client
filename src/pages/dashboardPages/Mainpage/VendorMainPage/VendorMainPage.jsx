import { useQuery } from "@tanstack/react-query";
import { FaBoxOpen, FaCheckCircle, FaClock, FaClipboardList, FaBullhorn, FaSpinner } from "react-icons/fa";
import useAxiosSecure from "../../../../hooks/axios/useAxiosSecure";
import PageLoader from "../../../../components/shared/pageLoader/PageLoader";
import StatCard from "../../../../components/shared/StateCards/StatCard";
import useAuth from "../../../../hooks/firebase/useAuth";

const VendorMainPage = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["vendor-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/vendor/stats");
      return res.data;
    },
  });

  if (isLoading) return <PageLoader />;

  return (
    <div className="p-6 space-y-6">
          <h2 className="text-2xl font-bold text-accent mb-4">  Hello {user?.displayName}, here's your dashboard overview.</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard icon={FaBoxOpen} title="My Products" value={stats.myProducts} color="bg-blue-500" />
        <StatCard icon={FaCheckCircle} title="Approved Products" value={stats.approvedProducts} color="bg-green-600" />
        <StatCard icon={FaSpinner} title="Pending Products" value={stats.pendingProducts} color="bg-yellow-500" />
        <StatCard icon={FaClipboardList} title="My Orders" value={stats.myOrders} color="bg-purple-600" />
        <StatCard icon={FaBullhorn} title="My Ads" value={stats.myAds} color="bg-pink-500" />
        <StatCard icon={FaClock} title="Last Logged In" value={stats.lastLogin ? new Date(stats.lastLogin).toLocaleString() : "N/A"} color="bg-red-500" />
      </div>
    </div>
  );
};

export default VendorMainPage;
