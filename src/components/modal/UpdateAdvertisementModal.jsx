
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/axios/useAxiosSecure";
import { getPhotoURL } from "../../utils/shareUtils/ShareUtils";
import UpdateAdvertisementForm from "../forms/UpdateAdvertisementForm";

const UpdateAdvertisementModal = ({ isOpen, onClose, ad, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const imageFile = form.image.files[0];

    if (!title || !description) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      let imageURL = ad.image; 

      if (imageFile) {
        imageURL = await getPhotoURL(imageFile);
      }

      const updatedAd = {
        title,
        description,
        image: imageURL,
        };
      
      const res = await axiosSecure.patch(`/myAdvertisements/${ad._id}`, updatedAd);
      if (res.data.modifiedCount > 0) {
        toast.success("Advertisement updated successfully!");
        refetch();
        onClose();
      }
    } catch (err) {
      toast.error("Failed to update advertisement");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-bold text-accent mb-4">
                  ✏️ Update Advertisement
                </Dialog.Title>
                <UpdateAdvertisementForm
                  onSubmit={handleUpdate}
                  loading={loading}
                  defaultValues={ad} // You need to support this in the form
                />
                <button
                  onClick={onClose}
                  className="mt-4 text-sm text-gray-500 hover:underline">
                  Cancel
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UpdateAdvertisementModal;
