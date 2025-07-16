import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/axios/useAxiosSecure";
import useAuth from "../../hooks/firebase/useAuth";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
import PageLoader from "../../components/shared/pageLoader/PageLoader";
import NoDataFound from "../../components/shared/NoDataFound/NoDataFound";
import Swal from "sweetalert2";
import UpdateAdvertisementModal from "../../components/modal/UpdateAdvertisementModal";

const MyAdvertise = () => {
  const { user } = useAuth();
  const [selectedAd, setSelectedAd] = useState(null);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState(null);

  const { data: ads = [], isLoading } = useQuery({
    queryKey: ["my-ads", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myAdvertisements/${user?.email}`);
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/myAdvertisements/${id}`);
    },
    onSuccess: () => {
      toast.success("Advertisement deleted successfully");
      queryClient.invalidateQueries(["my-ads"]);
    },
    onError: () => {
      toast.error("Failed to delete advertisement");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this ad?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setDeletingId(id);
        deleteMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <PageLoader />;
  if (ads.length === 0) return <NoDataFound path={"/dashboard/addAdvertisement"} name={"Add Advertise"} message="No advertisements found." />;

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4">📢 My Advertisements</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ads.map((ad) => (
              <tr key={ad._id} className="border-b">
                <td className="p-3 font-medium">{ad.title}</td>
                <td className="p-3 text-gray-600">{ad.description}</td>
                <td className="p-3 capitalize">{ad.status || "pending"}</td>
                <td className="p-3 space-x-2">
                  <button onClick={() => setSelectedAd(ad)} className="bg-accent text-white px-3 py-1 rounded">
                    <FaEdit className="inline" /> Update
                  </button>
                  <button
                    onClick={() => handleDelete(ad._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    disabled={deleteMutation.isLoading && deletingId === ad._id}>
                    <FaTrash className="inline" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedAd && (
        <UpdateAdvertisementModal
          isOpen={!!selectedAd}
          ad={selectedAd}
          onClose={() => setSelectedAd(null)}
          refetch={() => queryClient.invalidateQueries(["my-ads"])}
        />
      )}
    </div>
  );
};

export default MyAdvertise;
