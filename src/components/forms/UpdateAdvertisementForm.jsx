import { useState } from "react";
import LoaderSVG from "../shared/loaderSVG/LoaderSVG";

const UpdateAdvertisementForm = ({ onSubmit, loading, defaultValues = {} }) => {
    const [isNewImageSelected, setIsNewImageSelected] = useState(false);

      const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setIsNewImageSelected(true);
    } else {
      setIsNewImageSelected(false);
    }
  };
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block font-semibold mb-1">Ad Title</label>
        <input
          name="title"
          defaultValue={defaultValues.title || ""}
          type="text"
          className="w-full px-4 py-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">Short Description</label>
        <textarea
          name="description"
          defaultValue={defaultValues.description || ""}
          rows="3"
          className="w-full px-4 py-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">Upload Banner Image</label>
        <input
          name="image"
          type="file"
          accept="image/*"
                  className="w-full border rounded p-2"
                  onChange={handleImageChange}
        />
        {!isNewImageSelected && defaultValues.image && (
          <img
            src={defaultValues.image}
            alt="Previous Ad"
            className="w-32 mt-2 rounded border"
          />
        )}
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-accent text-white px-6 py-2 rounded hover:bg-accentDark transition-all">
        {loading ? <LoaderSVG message={"Updating..."}></LoaderSVG> : "Update Advertisement"}
      </button>
    </form>
  );
};
export default UpdateAdvertisementForm
