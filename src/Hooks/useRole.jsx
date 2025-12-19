import React from "react";
import useAxiosInstance from "./useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useRole = () => {
  const axiosInstance = useAxiosInstance();
  const { user } = useAuth();

  const { data: userRole = "User", isLoading: roleLoading } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(`/user-role?email=${user?.email}`);
      console.log("role", res.data.role);

      return res.data.role;
    },
  });
  return { userRole, roleLoading };
};

export default useRole;
