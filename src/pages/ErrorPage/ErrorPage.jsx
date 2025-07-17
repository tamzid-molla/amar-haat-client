import { useNavigate } from "react-router";
import { FaExclamationTriangle } from "react-icons/fa";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gray-50 text-center">
      <FaExclamationTriangle className="text-red-500 text-6xl mb-4" />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Something Went Wrong</h1>
      <p className="text-gray-600 max-w-md mb-6">
        We’re sorry, but an unexpected error has occurred. Please try again later or go back to the homepage.
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-accent hover:bg-accentDark cursor-pointer text-white px-6 py-2 shadow-2xs rounded-lg transition-all"
      >
         Back to Home
      </button>
    </div>
  );
};

export default ErrorPage;
