import { useForm } from "react-hook-form";
import { useState } from "react";
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
import useAuth from "../../hooks/firebase/useAuth";
import Button from "../shared/buttons/Button";

const AddProductForm = ({ onSubmit,loader }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [priceHistory, setPriceHistory] = useState([]);
  const { user } = useAuth();

  const addPriceHistory = (e) => {
    const form = e.target.closest("div");
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

  return (
    <form
      onSubmit={handleSubmit((data) =>
        onSubmit({
          ...data,
          date:selectedDate,
          prices: priceHistory,
        },reset,setPriceHistory)
      )}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 bg-white rounded-xl shadow">
      {/* Vendor Email */}
      <div className="flex flex-col gap-1">
        <label className="label flex gap-2 items-center font-medium text-gray-700">
          <FaEnvelope /> Vendor Email
        </label>
        <input
          {...register("vendor_email", { required: true })}
          type="email"
          value={user?.email || ""}
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
          value={user?.displayName || ""}
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
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-accent transition-all"
          placeholder="e.g., Onion"
        />
        {errors.itemName && <span className="text-red-500 text-sm">Required</span>}
      </div>

      {/* Image file */}
      <div className="flex flex-col gap-1">
        <label className="label flex gap-2 items-center font-medium text-gray-700">
          <FaImage /> Image File
        </label>
        <input
          {...register("image", { required: true })}
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
        <Button type={"submit"} widthFull={true} name={"Add Product"} loading={loader ? true : false}></Button>
      </div>
    </form>
  );
};

export default AddProductForm;
