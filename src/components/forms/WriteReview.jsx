import React from 'react';

const WriteReview = () => {
    return (
        <div>
            <form className="space-y-4">
            <textarea
              className="w-full p-4 border border-gray-300 rounded-lg"
              rows="4"
              placeholder="Write your review here..."
              disabled
            ></textarea>
            <button
              disabled
              className="px-6 py-2 bg-indigo-500 text-white rounded-full font-semibold shadow cursor-not-allowed"
            >
              Submit Review (Coming Soon)
            </button>
          </form>
        </div>
    );
};

export default WriteReview;