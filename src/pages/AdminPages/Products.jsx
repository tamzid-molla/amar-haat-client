import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FaCheck, FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/axios/useAxiosSecure";
import PageLoader from "../../components/shared/pageLoader/PageLoader";
import NoDataFound from "../../components/shared/NoDataFound/NoDataFound";


const Products = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["all-products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products/allProducts");
      return res.data;
    },
  });

  const approveMutation = useMutation({
    mutationFn: async (id) => {
      return axiosSecure.patch(`/products/status/${id}`, { status: "approved" });
    },
    onSuccess: () => {
      toast.success("Product approved successfully!");
      queryClient.invalidateQueries(["all-products"]);
    },
    onError: () => toast.error("Failed to approve product"),
  });

  const rejectMutation = useMutation({
    mutationFn: async ({ id, feedback }) => {
      return axiosSecure.patch(`/products/status/${id}`, {
        status: "rejected",
        feedback,
      });
    },
    onSuccess: () => {
      toast.success("Product rejected with feedback");
      queryClient.invalidateQueries(["all-products"]);
    },
    onError: () => toast.error("Failed to reject product"),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return axiosSecure.delete(`/products/${id}`);
    },
    onSuccess: () => {
      toast.success("Product deleted successfully");
      queryClient.invalidateQueries(["all-products"]);
    },
    onError: () => toast.error("Failed to delete product"),
  });

  const handleReject = (id) => {
    Swal.fire({
      title: "Reject Product",
      input: "text",
      inputLabel: "Reason for rejection",
      inputPlaceholder: "Write your reason here...",
      showCancelButton: true,
      confirmButtonText: "Submit",
      preConfirm: (reason) => {
        if (!reason) {
          Swal.showValidationMessage("You must enter a reason");
        }
        return reason;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        rejectMutation.mutate({ id, feedback: result.value });
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
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

  if (isLoading) return <PageLoader />;
  if (products.length === 0) return <NoDataFound message="No products found." />;

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4">📋 All Products</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Vendor Name</th>
              <th className="p-3 text-left">Item Name</th>
              <th className="p-3 text-left">Market</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product?._id} className="border-b">
                <td className="p-3 font-medium">{product?.vendor_name}</td>
                <td className="p-3 font-medium">{product?.itemName}</td>
                <td className="p-3">{product?.market}</td>
                <td className="p-3">৳{product?.pricePerUnit}</td>
                <td className="p-3">{new Date(product?.created_at).toLocaleDateString()}</td>
                <td className="p-3 capitalize">{product?.status}</td>
                <td className="p-3 space-x-2">
                  {product?.status === "pending" && (
                    <>
                      <button
                        onClick={() => approveMutation.mutate(product?._id)}
                        className="bg-accent cursor-pointer text-white px-2 py-1 rounded">
                        <FaCheck />
                      </button>
                      <button
                        onClick={() => handleReject(product?._id)}
                        className="bg-yellow-500 cursor-pointer text-white px-2 py-1 rounded">
                        <FaTimes />
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => navigate(`/dashboard/update_product/${product?._id}`)}
                    className="bg-blue-500 cursor-pointer text-white px-2 py-1 rounded">
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(product?._id)}
                    className="bg-red-500 cursor-pointer text-white px-2 py-1 rounded">
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

export default Products;
