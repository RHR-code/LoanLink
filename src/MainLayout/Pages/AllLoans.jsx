import React, { useState } from "react";
import useAxiosInstance from "../../Hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader";
import LoanCard from "../Home/LoanCard";
import LoanCardSkeleton from "../../components/cardSkeleton";
import CardNotFound from "../../components/CardNotFound";

const AllLoans = () => {
  const [searchText, setSearchText] = useState("");
  const [sort, setSort] = useState("");
  console.log(sort);

  const axiosInstance = useAxiosInstance();
  console.log(searchText);

  const { data: loans = [], isLoading } = useQuery({
    queryKey: ["all-loans", searchText, sort],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/loans?searchText=${searchText}&sort=${sort}`
      );
      return res.data;
    },
  });
  return (
    <div className="px-5 lg:px-10 my-10">
      <h1 className="text-3xl  md:text-5xl font-bold text-center pb-10 text-primary">
        All Available Loans
      </h1>
      <div className="pb-5 flex justify-between">
        <input
          type="search"
          onChange={(e) => setSearchText(e.target.value)}
          className="input"
          placeholder="Search Your Loan"
        />
        <select
          onChange={(e) => setSort(e.target.value)}
          className="select bg-primary text-white w-40"
        >
          <option value="">Sort By Max Loan</option>
          <option value="desc">High To Low</option>
          <option value="asc">Low To High</option>
        </select>
      </div>
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 ">
          {[...Array(8)].map((_, i) => (
            <LoanCardSkeleton key={i} />
          ))}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 ">
        {loans.map((loan) => (
          <LoanCard key={loan._id} loan={loan} />
        ))}
      </div>
      {loans.length === 0 && <CardNotFound />}
    </div>
  );
};

export default AllLoans;
