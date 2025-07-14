import LoaderSVG from "../shared/loaderSVG/LoaderSVG";


const AdvertisementForm = ({ onSubmit, loading }) => {
  return (
      <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block font-semibold mb-1">Ad Title</label>
        <input
          name="title"
          type="text"
          className="w-full px-4 py-2 border rounded"
          placeholder="Enter ad title"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Short Description</label>
        <textarea
          name="description"
          rows="3"
          className="w-full px-4 py-2 border rounded"
          placeholder="Write a short description"
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
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-accent text-white px-6 py-2 rounded hover:bg-accentDark transition-all duration-200">
        {loading ? <LoaderSVG></LoaderSVG>: "Submit Advertisement"}
      </button>
    </form>
  );
};

export default AdvertisementForm;
