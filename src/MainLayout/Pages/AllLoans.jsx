import React from "react";
import useAxiosInstance from "../../Hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader";
import LoanCard from "../Home/LoanCard";

const AllLoans = () => {
  const axiosInstance = useAxiosInstance();
  const { data: loans = [], isLoading } = useQuery({
    queryKey: ["all-loans"],
    queryFn: async () => {
      const res = await axiosInstance.get("/loans");
      return res.data;
    },
  });
  return (
    <div className="px-10 my-10">
      <h1 className="text-3xl  md:text-5xl font-bold text-center pb-10 text-primary">
        All Available Loans
      </h1>
      {isLoading && <Loader />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 ">
        {loans.map((loan) => (
          <LoanCard key={loan._id} loan={loan} />
        ))}
      </div>
    </div>
  );
};

export default AllLoans;
