import React from "react";
import useAuth from "../../hooks/firebase/useAuth";

const WriteReview = () => {
  const { user, role } = useAuth();
  return (
    <div>
      <form className="space-y-4">
        <textarea
          className="w-full p-4 border border-gray-300 rounded-lg"
          rows="4"
          placeholder="Write your review here..."
          disabled={role === "user" ? false : true}></textarea>
        <button
          disabled={role === "user" ? false : true}
          className={`${
            role === "user" ? " cursor-pointer " : "cursor-not-allowed"
          }px-5 py-3 bg-accent text-white font-semibold rounded-full shadow`}>
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default WriteReview;
