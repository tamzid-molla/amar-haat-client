import { useQuery } from "@tanstack/react-query";
import { FaUser, FaEnvelope, FaUserShield, FaCalendarAlt, FaClock } from "react-icons/fa";
import useAuth from "../../hooks/firebase/useAuth";
import useAxiosSecure from "../../hooks/axios/useAxiosSecure";
import PageLoader from "../../components/shared/pageLoader/PageLoader";


const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userInfo, isLoading } = useQuery({
    queryKey: ["user-profile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <PageLoader />;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-xl">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src={userInfo?.image || "/default-avatar.png"}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border"
        />
        <div className="space-y-2 w-full">
          <h2 className="text-2xl font-bold text-accent flex items-center gap-2">
            <FaUser /> {userInfo?.name}
          </h2>
          <p className="text-gray-700 flex items-center gap-2">
            <FaEnvelope /> {userInfo?.email}
          </p>
          <p className="text-gray-700 flex items-center gap-2 capitalize">
            <FaUserShield /> Role: {userInfo?.role}
          </p>
          <p className="text-gray-700 flex items-center gap-2">
            <FaCalendarAlt />
            Joined: {new Date(userInfo?.created_at).toLocaleDateString()}
          </p>
          <p className="text-gray-700 flex items-center gap-2">
            <FaClock />
            Last Login: {new Date(userInfo?.last_loggedIn).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
