import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  FaEnvelope,
  FaUser,
  FaStore,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaCarrot,
  FaClock,
  FaImage,
  FaMoneyBill,
  FaListAlt,
} from "react-icons/fa";
import Button from "../shared/buttons/Button";

const UpdateProductForm = ({ onSubmit, loader, product }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const [priceHistory, setPriceHistory] = useState([]);
  const [selectedDate, setSelectedDate] = useState(product?.created_at ? new Date(product?.created_at) : new Date());

  // watch image input to know if user selected new file
  const imageFile = watch("image");

  // Load prices into state on mount or when product?.prices changes
  useEffect(() => {
    if (product?.prices && product?.prices.length) {
      setPriceHistory(product?.prices);
    }
  }, [product?.prices]);

  // Function to add new price history entry from inputs
  const addPriceHistory = (e) => {
    e.preventDefault();
    const form = e.target.closest("form");
    const priceInput = form.querySelector('input[name="price"]');
    const dateInput = form.querySelector('input[name="date"]');

    const price = priceInput?.value;
    const date = dateInput?.value;

    if (price && date) {
      setPriceHistory((prev) => [...prev, { price: Number(price), date }]);
      priceInput.value = "";
      dateInput.value = "";
    }
  };

  // On form submit, send all data including selectedDate and priceHistory
  const submitHandler = (data) => {
    onSubmit(
      {
        ...data,
        date: selectedDate,
        prices: priceHistory,
        // for image, if new file selected, data.image has file,
        // else can handle in parent component
      },
      reset,
      setPriceHistory
    );
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 bg-white rounded-xl shadow">
      {/* Vendor Email */}
      <div className="flex flex-col gap-1">
        <label className="label flex gap-2 items-center font-medium text-gray-700">
          <FaEnvelope /> Vendor Email
        </label>
        <input
          {...register("vendor_email", { required: true })}
          type="email"
          defaultValue={product?.vendor_email || ""}
          readOnly
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-accent transition-all"
        />
      </div>

      {/* Vendor Name */}
      <div className="flex flex-col gap-1">
        <label className="label flex gap-2 items-center font-medium text-gray-700">
          <FaUser /> Vendor Name
        </label>
        <input
          {...register("vendor_name", { required: true })}
          type="text"
          defaultValue={product?.vendor_name || ""}
          readOnly
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-accent transition-all"
        />
      </div>

      {/* Market Name */}
      <div className="flex flex-col gap-1">
        <label className="label flex gap-2 items-center font-medium text-gray-700">
          <FaStore /> Market Name
        </label>
        <input
          {...register("market", { required: true })}
          defaultValue={product?.market || ""}
          placeholder="Enter market name"
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-accent transition-all"
        />
        {errors.market && <span className="text-red-500 text-sm">Required</span>}
      </div>

      {/* Date Picker */}
      <div className="flex flex-col gap-1">
        <label className="label flex gap-2 items-center font-medium text-gray-700">
          <FaCalendarAlt /> Date
        </label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          maxDate={new Date()}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-accent transition-all"
          dateFormat="yyyy-MM-dd"
        />
      </div>

      {/* Market Description */}
      <div className="col-span-1 lg:col-span-2 flex flex-col gap-1">
        <label className="label flex gap-2 items-center font-medium text-gray-700">
          <FaMapMarkerAlt /> Market Description
        </label>
        <textarea
          {...register("marketDescription", { required: true })}
          defaultValue={product?.marketDescription || ""}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-accent transition-all"
          placeholder="Location, history, and other details"
          rows={3}
        />
        {errors.marketDescription && <span className="text-red-500 text-sm">Required</span>}
      </div>

      {/* Item Name */}
      <div className="flex flex-col gap-1">
        <label className="label flex gap-2 items-center font-medium text-gray-700">
          <FaCarrot /> Item Name
        </label>
        <input
          {...register("itemName", { required: true })}
          defaultValue={product?.itemName || ""}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-accent transition-all"
          placeholder="e.g., Onion"
        />
        {errors.itemName && <span className="text-red-500 text-sm">Required</span>}
      </div>

      {/* Image preview of old image */}
      <div className="flex flex-col gap-1 col-span-1 lg:col-span-2">
        <label className="label flex gap-2 items-center font-medium text-gray-700">
          <FaImage /> Current Image
        </label>

        {product?.product_image && (!imageFile || imageFile.length === 0) && (
          <img src={product?.product_image} alt="Current product?" className="w-40 h-40 object-cover rounded mb-2" />
        )}
      </div>

      {/* Image file input */}
      <div className="flex flex-col gap-1">
        <label className="label flex gap-2 items-center font-medium text-gray-700">
          <FaImage /> Upload New Image (optional)
        </label>
        <input
          {...register("image")}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-accent transition-all"
          type="file"
          placeholder="Select a file"
        />
        {errors.image && <span className="text-red-500 text-sm">Required</span>}
      </div>

      {/* Price Per Unit */}
      <div className="flex flex-col gap-1">
        <label className="label flex gap-2 items-center font-medium text-gray-700">
          <FaMoneyBill /> Price per Unit
        </label>
        <input
          {...register("pricePerUnit", { required: true })}
          defaultValue={product?.pricePerUnit || ""}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-accent transition-all"
          type="number"
          placeholder="e.g., 30"
        />
        {errors.pricePerUnit && <span className="text-red-500 text-sm">Required</span>}
      </div>

      {/* Item Description */}
      <div className="col-span-1 lg:col-span-2 flex flex-col gap-1">
        <label className="label flex gap-2 items-center font-medium text-gray-700">
          <FaListAlt /> Item Description (Optional)
        </label>
        <textarea
          {...register("itemDescription")}
          defaultValue={product?.itemDescription || ""}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-accent transition-all"
          placeholder="Fresh, organic, etc."
          rows={3}
        />
      </div>

      {/* Price History */}
      <div className="col-span-1 lg:col-span-2 flex flex-col gap-2">
        <label className="label flex gap-2 items-center font-medium text-gray-700">
          <FaClock /> Price History
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="date"
            name="date"
            max={new Date().toISOString().split("T")[0]}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-1/3 focus:outline-none focus:border-accent transition-all"
          />
          <input
            type="number"
            name="price"
            placeholder="৳"
            className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-1/3 focus:outline-none focus:border-accent transition-all"
          />
          <button type="button" onClick={addPriceHistory} className="btn btn-accent w-full sm:w-auto">
            Add
          </button>
        </div>
        <ul className="text-sm list-disc pl-6">
          {priceHistory.map((entry, idx) => (
            <li key={idx}>
              {entry.date} — ৳{entry.price}
            </li>
          ))}
        </ul>
      </div>

      {/* Submit */}
      <div className="col-span-1 lg:col-span-2">
        <Button type={"submit"} widthFull={true} message={"Updating..."} name={"Update product?"} loading={loader ? true : false} />
      </div>
    </form>
  );
};

export default UpdateProductForm;
