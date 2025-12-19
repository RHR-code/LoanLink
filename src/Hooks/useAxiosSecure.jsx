import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
const instance = axios.create({
  baseURL: "https://loan-link-server-seven.vercel.app",
});
const useAxiosSecure = () => {
  const { user, userLogout } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const reqInterceptor = instance.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`;
      return config;
    });
    const resInterceptor = instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        
        const statusCode = error.status;
        if (statusCode === 403) {
          userLogout().then(() => {
            console.log("UnAuthorized Access");
            toast.error("Your're Not Authorized");
            navigate("/login");
          });
        }
        return Promise.reject(error);
      }
    );
    return () => {
      instance.interceptors.request.eject(reqInterceptor);
      instance.interceptors.response.eject(resInterceptor);
    };
  }, [user, userLogout]);
  return instance;
};

export default useAxiosSecure;
