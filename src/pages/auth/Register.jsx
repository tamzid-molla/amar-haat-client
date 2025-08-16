import React, { useEffect, useState } from "react";
import axios from "axios";
import registerImage from "../../assets/authAssets/register.png";
import GoogleLogin from "../../components/shared/authCompo/GoogleLogin";
import Input from "../../components/shared/authCompo/Input";
import { FaEnvelope, FaImage, FaLock, FaUser } from "react-icons/fa";
import Button from "../../components/shared/buttons/Button";
import { Link, useNavigate } from "react-router";
import { getPhotoURL, SaveUserInDb, validPass } from "../../utils/shareUtils/ShareUtils";
import useAuth from "../../hooks/firebase/useAuth";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const Register = () => {
  const { registerWithEmailPass, updateUser,logOutUser, } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  //Handle register
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.files[0];
    const password = e.target.password.value;
    const confirmPassword = e.target.confirm_password.value;

    
    try {
      // Generate Photo URL
      const imageURL = await getPhotoURL(photo);
      // Valid password
      const passwordValidation = await validPass(password, confirmPassword);
      if (!passwordValidation) return;
      //Create user with email and password
      const credential = await registerWithEmailPass(email, password);
      const newUser = credential?.user;
      if (!newUser) throw new Error("User creation failed");
      //Update Profile
      await updateUser({ displayName: name, photoURL: imageURL });
      const updatedUser = {
        name: newUser?.displayName,
        email:newUser?.email,
        image: newUser?.photoURL,
      };
      // save user Data
      await SaveUserInDb(updatedUser);
      logOutUser().then(() => {
        toast.success("Register successfully")
        navigate("/login");
          });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message || "An unexpected error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
        document.title = "AmarHaat || Register";
      }, []);

  return (
    <div className="min-h-screen w-11/12 mx-auto px-4 rounded-2xl md:px-8 flex items-center justify-center">
      <div className=" rounded-xl max-w-6xl p-6 md:p-10">
        {/* Heading center */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-textSecondary mb-10">Register Account</h2>

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
              {/* Photo File */}
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
                name={"confirm_password"}
                placeholder={"Confirm Your Password"}
                icon={FaLock}
                isPassword={true}
                showPass={showPass}
                toggleShowPass={() => setShowPass(!showPass)}
              />

              {/* Submit Button */}
              <Button type={"submit"} name={"Sign Up"} widthFull={true} loading={loading ? true : false} />
            </form>

            {/* Divider + Google Login */}
            <div className="flex items-center justify-center mt-4">
              <hr className="w-full border-gray-300" />
              <span className="px-3 text-gray-500">or</span>
              <hr className="w-full border-gray-300" />
            </div>

            {/* Google login  */}
            <GoogleLogin emailLoading={loading}></GoogleLogin>

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
