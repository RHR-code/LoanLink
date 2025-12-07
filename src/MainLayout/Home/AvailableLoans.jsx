import React from "react";
import LoanCard from "./LoanCard";
import { useQuery } from "@tanstack/react-query";
import useAxiosInstance from "../../Hooks/useAxiosInstance";

const AvailableLoans = () => {
  const axiosInstance = useAxiosInstance();
  const { data: loans = [] } = useQuery({
    queryKey: ["available-loans"],
    queryFn: async () => {
      const res = await axiosInstance.get("/loans");
      return res.data;
    },
  });
  return (
    <div className="mt-24 px-10">
      <h1 className="text-5xl font-bold text-center pb-10 text-primary">
        Available Loans
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 ">
        {loans.map((loan) => (
          <LoanCard loan={loan} />
        ))}
      </div>
    </div>
  );
};

export default AvailableLoans;
