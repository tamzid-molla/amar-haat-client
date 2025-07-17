import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/axios/useAxiosSecure";
import PageLoader from "../../components/shared/pageLoader/PageLoader";
import NoDataFound from "../../components/shared/NoDataFound/NoDataFound";

const AllAdvertise = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: ads = [], isLoading } = useQuery({
    queryKey: ["all-ads"],
    queryFn: async () => {
      const res = await axiosSecure.get("/advertisements");
      return res.data;
    },
  });

  // Status Update Mutation
  const statusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      await axiosSecure.patch(`/advertisements/status/${id}`, { status });
    },
    onSuccess: () => {
      toast.success("Status updated successfully");
      queryClient.invalidateQueries(["all-ads"]);
    },
    onError: () => {
      toast.error("Failed to update status");
    },
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/myAdvertisements/${id}`);
    },
    onSuccess: () => {
      toast.success("Advertisement deleted");
      queryClient.invalidateQueries(["all-ads"]);
    },
    onError: () => {
      toast.error("Failed to delete advertisement");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the advertisement.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  const handleStatusChange = (id, status) => {
    statusMutation.mutate({ id, status });
  };

  if (isLoading) return <PageLoader />;
  if (ads.length === 0) return <NoDataFound message="No advertisements found." />;

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4">📢 All Advertisements</h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] table-auto text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Vendor Email</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ads.map((ad) => (
              <tr key={ad._id} className="border-b">
                <td className="p-3 font-medium">{ad.title}</td>
                <td className="p-3 text-gray-600">{ad.vendor_email}</td>
                <td className="p-3 capitalize font-medium">{ad.status}</td>
                <td className="p-3 space-x-2 flex flex-wrap items-center gap-2">
                  {ad?.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleStatusChange(ad._id, "approved")}
                        className="bg-accent text-white px-2 py-1 rounded">
                        <FaCheck />
                      </button>
                      <button
                        onClick={() => handleStatusChange(ad._id, "rejected")}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded">
                        <FaTimes />
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleDelete(ad._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded">
                    <FaTrash />
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

export default AllAdvertise;
