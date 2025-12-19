import axios from "axios";
import React from "react";
const instance = axios.create({
  baseURL: "https://loan-link-server-seven.vercel.app",
});
const useAxiosInstance = () => {
  return instance;
};

export default useAxiosInstance;
