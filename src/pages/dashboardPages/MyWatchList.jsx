import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../hooks/axios/useAxiosSecure";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import useAuth from "../../hooks/firebase/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import PageLoader from "../../components/shared/pageLoader/PageLoader";
import NoDataFound from "../../components/shared/NoDataFound/NoDataFound";
import Swal from "sweetalert2";

const MyWatchList = () => {
  const { user } = useAuth();
  const [deletingId, setDeletingId] = useState(null);
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { data: watchList = [], isLoading } = useQuery({
    queryKey: ["my watchList", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my_watchList/${user?.email}`);
      return res.data;
    },
  });

  // Remove from watchlist
  const mutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/watchList/${id}`);
    },
    onSuccess: () => {
      toast.success("Item removed from watchlist");
      queryClient.invalidateQueries(["my watchList", user?.email]);
    },
    onError: () => {
      toast.error("Failed to remove item");
    },
  });

  //Handle delete with confirmation
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This item will be removed from your watchlist.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setDeletingId(id);
        mutation.mutate(id);
      }
    });
  };

  if (isLoading) return <PageLoader />;
  if (watchList.length === 0) return <NoDataFound message="No items in your watchlist." />;

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4">📋 My Watchlist</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Market</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {watchList.map((item) => (
              <tr key={item._id} className="border-b">
                <td className="p-3">{item.productName}</td>
                <td className="p-3">{item.market}</td>
                <td className="p-3">{new Date(item.addedAt).toLocaleDateString()}</td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => navigate("/dashboard/addProducts")}
                    className="bg-accent text-white px-3 py-1 rounded">
                    <FaPlus className="inline"></FaPlus> Add More
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    disabled={mutation.isLoading && deletingId === item._id}>
                    <FaTrashAlt className="inline" /> Remove
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

export default MyWatchList;
