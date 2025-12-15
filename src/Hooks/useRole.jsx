import React from "react";
import useAxiosInstance from "./useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useRole = () => {
  const axiosInstance = useAxiosInstance();
  const { user } = useAuth();

  const { data: userRole = {}, isLoading } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(`/user-role?email=${user?.email}`);
      return res.data;
    },
  });
  return userRole?.role ? userRole.role : "User";
};

export default useRole;
