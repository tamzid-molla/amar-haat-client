
import { getPhotoURL } from "../../../utils/shareUtils/ShareUtils";
import AddProductForm from "../../forms/AddProductForm";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/axios/useAxiosSecure";
import { useState } from "react";

const AddProducts = () => {
  const [ loader, setLoader ] = useState(false);
  const axiosSecure = useAxiosSecure();

  const handleProductSubmit = async (data,reset) => {
    const { image, date, ...product } = data;
    product.created_at = new Date(date);
    const photo = image[0];
    console.log(new Date(date).toLocaleDateString());

    try {
      setLoader(true)
        const photoURL = await getPhotoURL(photo)
        product.product_image = photoURL;
      const res = await axiosSecure.post("/products",product);
      console.log(res);;
        

      Swal.fire({
        icon: "success",
        title: "Product submitted successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      reset()
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed to submit product.",
        showConfirmButton: true,
      });
    } finally {
      setLoader(false)
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
