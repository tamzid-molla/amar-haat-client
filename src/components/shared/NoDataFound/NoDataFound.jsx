import { FaBoxOpen } from "react-icons/fa";
import { Link } from "react-router";

const NoDataFound = ({ message = "No data found." , path,name}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12">
      <FaBoxOpen className="text-6xl text-gray-400 mb-4" />
      <h2 className="text-xl font-semibold text-gray-700">{message}</h2>
      {
        path && name &&
        <Link to={path} className="bg-accent py-2 px-4 rounded-2xl text-white mt-4">
        {name}
      </Link>
      }
    </div>
  );
};

export default NoDataFound;
