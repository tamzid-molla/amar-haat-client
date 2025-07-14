import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/axios/useAxiosSecure";
import UpdateProductForm from "../../components/forms/UpdateProductForm";
import { getPhotoURL } from "../../utils/shareUtils/ShareUtils";
import PageLoader from "../../components/shared/pageLoader/PageLoader";

const UpdateProduct = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
    const [loader, setLoader] = useState(false);
    const [productLoading, setProductLoading] = useState(false);

  // Fetch existing product
    useEffect(() => {
      setProductLoading(true)
    axiosSecure.get(`/product/${id}`).then((res) => {
        setProduct(res.data);
        setProductLoading(false);
    });
  }, [axiosSecure, id]);

  const handleUpdate = async (formData, reset, setPriceHistory) => {
    try {
      setLoader(true);
      const { image, date, ...rest } = formData;
      const updatedData = {
        ...rest,
        created_at: date,
        prices: formData.prices,
      };

      // If a new image is selected, upload it
        if (image && image.length > 0) {
        const photoURL = await getPhotoURL(image[0]);
        updatedData.product_image = photoURL;
        }

      await axiosSecure.put(`/product/${id}`, updatedData);
      toast.success("Product updated successfully!");
      reset();
      setPriceHistory([]);
      navigate("/dashboard/myProducts");
    } catch (err) {
      toast.error(" Failed to update product.");
    } finally {
      setLoader(false);
    }
  };

if(productLoading) return <PageLoader></PageLoader>
  return (
    <div className="max-w-5xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-6">🛠️ Update Product</h2>
      <UpdateProductForm
        onSubmit={handleUpdate}
        loader={loader}
        product={product}
      />
    </div>
  );
};

export default UpdateProduct;
