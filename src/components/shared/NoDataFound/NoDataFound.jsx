import { FaBoxOpen } from "react-icons/fa";

const NoDataFound = ({ message = "No data found." }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12">
      <FaBoxOpen className="text-6xl text-gray-400 mb-4" />
      <h2 className="text-xl font-semibold text-gray-700">{message}</h2>
      <p className="text-sm text-gray-500 mt-1">Try adjusting filters or come back later.</p>
    </div>
  );
};

export default NoDataFound;
