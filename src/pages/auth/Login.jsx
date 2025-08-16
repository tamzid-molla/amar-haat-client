import React, { useEffect, useState } from "react";
import {
  FaEnvelope,
  FaLock,
} from "react-icons/fa";
import loginImg from "../../assets/authAssets/Login.png";
import { Link, useNavigate } from "react-router";
import Input from "../../components/shared/authCompo/Input";
import Button from "../../components/shared/buttons/Button";
import GoogleLogin from "../../components/shared/authCompo/GoogleLogin";
import useAuth from "../../hooks/firebase/useAuth";
import Swal from "sweetalert2";
import { SaveUserInDb } from "../../utils/shareUtils/ShareUtils";

const Login = () => {
  const { loginWithEmailPass, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  //handle Login
  const handleLogin = async(e) => {
    e.preventDefault();
    setLoading(true)
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      const credential = await loginWithEmailPass(email, password);
      const updateUser = {
        name: credential?.user?.displayName,
        email: credential?.user?.email,
        image: credential?.user?.photoURL,
      }
      // save user Data
      await SaveUserInDb(updateUser);
      navigate(location.state || "/");
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome back, ${credential.user?.displayName}!`,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Incorrect email or password.",
        timer: 2000,
        showConfirmButton: false,
      });
    } finally {
      setLoading(false)
    }
  };

   useEffect(() => {
      document.title = "AmarHaat || Login";
    }, []);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className=" rounded-xl w-full max-w-5xl p-6 md:p-10">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 dark:text-white mb-10">
          Login Your Account
        </h2>

        {/* Grid layout: image + form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Image Side */}
          <div className="hidden md:block">
            <img
              src={loginImg}
              alt="Login Illustration"
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Form Side */}
          <div>
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email Field */}
              <Input
                type={"email"}
                name={"email"}
                placeholder={"Enter your email"}
                icon={FaEnvelope}></Input>

              {/* Password Field */}
              <Input
                type={showPass ? "text" : "password"}
                name={"password"}
                placeholder={"Enter your Password"}
                icon={FaLock}
                isPassword={true}
                showPass={showPass}
                toggleShowPass={() => setShowPass(!showPass)}></Input>

              {/* Submit Button */}
              <Button type={"submit"} name={"Sign In"} widthFull={true} loading={loading? true : false}></Button>
            </form>

            {/* Divider */}
            <div className="flex items-center justify-center mt-4">
              <hr className="w-full border-gray-300" />
              <span className="px-3 text-gray-500">or</span>
              <hr className="w-full border-gray-300" />
            </div>

            {/* Google Login */}
            <GoogleLogin emailLoading={loading}></GoogleLogin>
                      
            <p className="text-center text-sm mt-4">
              Don't have an account?
              <Link to="/register" className="text-blue-500 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
