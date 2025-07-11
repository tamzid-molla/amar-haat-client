import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/firebase/useAuth";
import { ClipLoader } from "react-spinners";

const GoogleLogin = () => {
  const [loading, setLoading] = useState(false);
  const { googleLogin,setUser } = useAuth();
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await googleLogin()
      setUser(result?.user);
      Swal.fire({
        icon: "success",
        title: "Logged in!",
        text: "You have successfully signed in with Google.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message || "Google sign-in failed.",
      });
    } finally {
      setLoading(false)
    }
  };
  return (
    <div>
      <button
        disabled={loading? true: false}
        onClick={handleGoogleLogin}
        className={`w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200 flex items-center justify-center gap-2 mt-4 ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}>
        {loading ? <ClipLoader size={19}/>: <FaGoogle />}
        {!loading && "Sign in with Google"}
      </button>
    </div>
  );
};

export default GoogleLogin;
