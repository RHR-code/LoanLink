import axios from "axios";
import React from "react";
const instance = axios.create({
  // baseURL: "https://loan-link-server-seven.vercel.app",
  baseURL: "http://localhost:3000",
});
const useAxiosInstance = () => {
  return instance;
};

export default useAxiosInstance;
