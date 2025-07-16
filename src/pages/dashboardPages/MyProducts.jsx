import React, { useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router";

import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAuth from "../../hooks/firebase/useAuth";
import useAxiosSecure from "../../hooks/axios/useAxiosSecure";
import PageLoader from "../../components/shared/pageLoader/PageLoader";
import NoDataFound from "../../components/shared/NoDataFound/NoDataFound";

const MyProducts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [deletingId, setDeletingId] = useState(null);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["myProducts", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my_products/${user?.email}`);
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/products/${id}`);
    },
    onSuccess: () => {
      toast.success("Product deleted successfully");
      queryClient.invalidateQueries(["myProducts"]);
    },
    onError: () => {
      toast.error("Failed to delete product");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setDeletingId(id);
        deleteMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <PageLoader />;
  if (products.length === 0) return <NoDataFound path={"/dashboard/addProducts"} name={"Add Product"} message="You have not added any products yet." />;

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4">📦 My Products</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Item Name</th>
              <th className="p-3 text-left">Price/Unit</th>
              <th className="p-3 text-left">Market</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{p.itemName}</td>
                <td className="p-3">৳{p.pricePerUnit}</td>
                <td className="p-3">{p.market}</td>
                <td className="p-3">{new Date(p.created_at).toLocaleDateString()}</td>
                <td className="p-3 capitalize">
                  {p.status}
                  {p.status === "rejected" && p.feedback && (
                    <p className="text-red-500 text-xs">📝 {p.feedback}</p>
                  )}
                </td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => navigate(`/dashboard/update_product/${p._id}`)}
                    className="bg-accent text-white px-3 py-1 rounded">
                    <FaEdit className="inline" /> Update
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    disabled={deletingId === p._id && deleteMutation.isLoading}>
                    <FaTrashAlt className="inline" /> Delete
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

export default MyProducts;
