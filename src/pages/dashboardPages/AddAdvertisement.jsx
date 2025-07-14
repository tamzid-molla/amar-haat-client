
import { toast } from "react-toastify";
import useAuth from "../../hooks/firebase/useAuth";
import { getPhotoURL } from "../../utils/shareUtils/ShareUtils";
import AdvertisementForm from "../../components/forms/AdvertisementForm";
import { useState } from "react";
import useAxiosSecure from "../../hooks/axios/useAxiosSecure";

const AddAdvertisement = () => {
  const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const imageFile = form.image.files[0];

    if (!title || !description || !imageFile) {
      toast.error("Please fill out all fields.");
      return;
    }

    try {
      setLoading(true);
      const imageURL = await getPhotoURL(imageFile);

      const adData = {
        title,
        description,
        image: imageURL,
        status: "pending",
        created_at: new Date(),
        vendor_email: user?.email,
      };

      const res = await axiosSecure.post("/advertisements", adData);
      if (res.data.insertedId) {
        toast.success("Advertisement submitted successfully!");
        form.reset();
      }
    } catch (err) {
      toast.error("Failed to submit advertisement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-center text-accent">📢 Add Advertisement</h2>
      <AdvertisementForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
};

export default AddAdvertisement;
