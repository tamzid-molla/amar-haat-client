import axios from "axios";
import Swal from "sweetalert2";

export const getPhotoURL = async (photo) => {
    const formData = new FormData();
        formData.append("image", photo);
    try {
      const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgBB_APIKEY}`,
      formData
      );
      return res.data.data.url;
    } catch (error) {
      return error
    }
}

export const validPass = (password,confirmPassword) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

    if (!passwordRegex.test(password)) {
      return Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: "Password must include at least one lowercase letter, one uppercase letter, and one number.",
        footer: "Please try again",
      });
    }

    if (password.length < 6) {
      return Swal.fire({
        icon: "error",
        title: "Weak Password",
        text: "Password must be at least 6 characters long",
        footer: "Try again",
      });
    }

    if (password !== confirmPassword) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords do not match",
        footer: "Please try again",
      });
  }
  return true
}

//save or update user
export const SaveUserInDb = async (userData) => {
  const { data } = axios.post(`${import.meta.env.VITE_baseURL}/users`, userData);
}