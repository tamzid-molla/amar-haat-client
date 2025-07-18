import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import useAxiosSecure from "../../hooks/axios/useAxiosSecure";
import PageLoader from "../../components/shared/pageLoader/PageLoader";
import NoDataFound from "../../components/shared/NoDataFound/NoDataFound";

const roles = ["user", "vendor", "admin"];

const AllUser = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [searchText, setSearchText] = useState("");

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleSearch = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const filteredUsers = users.filter((user) =>
    user?.name?.toLowerCase().includes(searchText) ||
    user?.email?.toLowerCase().includes(searchText)
  );

  const roleMutation = useMutation({
    mutationFn: async ({ userId, newRole }) => {
      return await axiosSecure.patch(`/users/${userId}`, { newRole });
    },
    onSuccess: () => {
      toast.success("User role updated!");
      queryClient.invalidateQueries(["all-users"]);
    },
    onError: () => {
      toast.error("Failed to update user role");
    },
  });

  const handleRoleChange = (userId, newRole) => {
    roleMutation.mutate({ userId, newRole });
  };

  if (isLoading) return <PageLoader />;
  if (users.length === 0) return <NoDataFound message="No users found" />;

  return (
    <div className="bg-bgSecondary shadow-md rounded-xl p-6">
      <div className="lg:flex gap-5 justify-between mb-4">
        <h2 className="text-2xl font-bold mb-4">👥 All Users</h2>
        <div className="flex items-center lg:w-2/3">
          <input
            onChange={handleSearch}
            type="text"
            placeholder="Search by name or email"
            className="border-2 p-4 focus:outline-none focus:border-accent 2xl:w-7/12 lg:w-10/12 w-full h-9 rounded-2xl"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[550px] table-auto text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Update</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user?._id} className="border-b">
                <td className="p-3 font-medium">{user?.name || "N/A"}</td>
                <td className="p-3">{user?.email}</td>
                <td className="p-3 capitalize">{user?.role}</td>
                <td className="p-3">
                  <select
                    className="border rounded px-2 py-1"
                    defaultValue={user?.role}
                    onChange={(e) => handleRoleChange(user?._id, e.target.value)}
                  >
                    {roles.map((role, idx) => (
                      <option key={idx} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredUsers.length === 0 && (
          <p className="text-center text-gray-500 py-4">No matching users found.</p>
        )}
      </div>
    </div>
  );
};

export default AllUser;
