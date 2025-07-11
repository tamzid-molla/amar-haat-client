import React, { useState } from "react";
import registerImage from "../../assets/authAssets/register.png";
import GoogleLogin from "../../components/shared/authCompo/GoogleLogin";
import Input from "../../components/shared/authCompo/Input";
import { FaEnvelope, FaImage, FaLock, FaUser } from "react-icons/fa";
import Button from "../../components/shared/buttons/Button";
import { Link } from "react-router";

const Register = () => {
  const [showPass, setShowPass] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
  };
  return (
    <div className="min-h-screen pt-16 w-11/12 mx-auto px-4 mb-16 rounded-2xl md:px-8 bg-base-secondary dark:bg-darkBase-secondary flex items-center justify-center">
      <div className=" rounded-xl w-full max-w-6xl p-6 md:p-10">
        {/* Heading center */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 dark:text-white mb-10">
          Register Account
        </h2>

        {/* Grid content (image + form) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left: Image */}
          <div className="hidden lg:block">
            <img src={registerImage} alt="Register" className="w-full h-auto object-contain" />
          </div>

          {/* Right: Form */}
          <div>
            <form onSubmit={handleRegister} className="space-y-4">
              {/* Full Name */}
              <Input type={"text"} name={"name"} placeholder={"Enter Full Name"} icon={FaUser} />
              {/* Email */}
              <Input type={"email"} name={"email"} placeholder={"Enter Email"} icon={FaEnvelope} />
              {/* Photo URL */}
              <Input type={"file"} name={"photo"} placeholder={"Upload a photo"} icon={FaImage} />
              {/* Password */}
              <Input
                type={showPass ? "text" : "password"}
                name={"password"}
                placeholder={"Enter your Password"}
                icon={FaLock}
                isPassword={true}
                showPass={showPass}
                toggleShowPass={() => setShowPass(!showPass)}
              />

              {/* Confirm Password */}
              <Input
                type={showPass ? "text" : "password"}
                name={"password"}
                placeholder={"Enter your Password"}
                icon={FaLock}
                isPassword={true}
                showPass={showPass}
                toggleShowPass={() => setShowPass(!showPass)}
              />

              {/* Submit Button */}
              <Button type={"submit"} name={"Sign Up"} widthFull={true} />
            </form>

            {/* Divider + Google Login */}
            <div className="flex items-center justify-center mt-4">
              <hr className="w-full border-gray-300" />
              <span className="px-3 text-gray-500">or</span>
              <hr className="w-full border-gray-300" />
            </div>

            {/* Google login  */}
            <GoogleLogin></GoogleLogin>

            <p className="text-center text-sm mt-4">
              Already have an account?
              <Link to="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
