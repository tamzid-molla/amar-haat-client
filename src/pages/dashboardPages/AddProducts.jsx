
import { useState } from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/axios/useAxiosSecure";
import { getPhotoURL } from "../../utils/shareUtils/ShareUtils";
import AddProductForm from "../../components/forms/AddProductForm";

const AddProducts = () => {
  const [ loader, setLoader ] = useState(false);
  const axiosSecure = useAxiosSecure();

  const handleProductSubmit = async (data, reset,setPriceHistory) => {
    const { image, date, pricePerUnit, ...product } = data;
    product.created_at = new Date(date);
    const photo = image[0];
    product.pricePerUnit = parseFloat(pricePerUnit);

    setLoader(true);
    try {
      const photoURL = await getPhotoURL(photo);
      product.product_image = photoURL;
      await axiosSecure.post("/products", product);
      toast.success("Product added successfully!");
      reset();
      setPriceHistory([]);
    } catch (error) {
      toast.error(error?.message)
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold text-center text-accent mb-4">Add Product</h2>
      <p className="text-gray-500 text-sm mb-6 text-center">
        Vendors submit daily price updates for local market items. This helps users track market trends and product
        pricing accurately.
      </p>
      
      <AddProductForm onSubmit={handleProductSubmit} loader={loader}/>
    </div>
  );
};

export default AddProducts;
