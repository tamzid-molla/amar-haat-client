import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "../firebase/useAuth";
import { useNavigate } from "react-router";



const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_baseURL,
});

const useAxiosSecure = () => {
  const { user, logOutUser, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user?.accessToken) {
      // Add request interceptor
      const requestInterceptor = axiosInstance.interceptors.request.use(
        (config) => {
          config.headers.Authorization = `Bearer ${user.accessToken}`;
          return config;
        }
      );

      // Add response interceptor
      const responseInterceptor = axiosInstance.interceptors.response.use(
        (res) => res,
        (err) => {
          if (err?.response?.status === 401 || err?.response?.status === 403) {
            logOutUser()
              .then(() => {
                console.log("Logged out due to token issue.");
                navigate("/login")
              })
              .catch(console.error);
          }
          return Promise.reject(err);
        }
      );

      // Cleanup to prevent multiple interceptors on re-renders
      return () => {
        axiosInstance.interceptors.request.eject(requestInterceptor);
        axiosInstance.interceptors.response.eject(responseInterceptor);
      };
    }
  }, [user, loading,logOutUser]);

  return axiosInstance;
};

export default useAxiosSecure;