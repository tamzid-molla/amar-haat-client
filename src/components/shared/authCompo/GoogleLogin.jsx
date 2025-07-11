import React from "react";
import { FaGoogle } from "react-icons/fa";

const GoogleLogin = () => {
  return (
    <div>
      <button
        //   onClick={handleGoogleLogin}
        className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200 flex items-center justify-center gap-2 mt-4">
        <FaGoogle />
        Sign in with Google
      </button>
    </div>
  );
};

export default GoogleLogin;
