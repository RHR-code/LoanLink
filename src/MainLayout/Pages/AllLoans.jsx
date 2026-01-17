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
  const [loansCount, setLoansCount] = useState(0);
  const [allLoans, setAllLoans] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [categoryText, setCategoryText] = useState("All");
  console.log(sort);

  const axiosInstance = useAxiosInstance();
  console.log(searchText);

  // const { data: loans = [], isLoading } = useQuery({
  //   queryKey: ["all-loans", searchText, sort],
  //   queryFn: async () => {
  //     const res = await axiosInstance.get(
  //       `/loans?searchText=${searchText}&sort=${sort}`
  //     );
  //     return res.data;
  //   },
  // });
  const { data: loans = [], isLoading } = useQuery({
    queryKey: ["all-loans", currentPage, categoryText, searchText, sort],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/loans?searchText=${searchText}&sort=${sort}&limit=${8}&skip=${
          currentPage * 8
        }&categoryText=${categoryText}`
      );

      setAllLoans(res.data.result.length);
      const page = Math.ceil(res.data.total / 8);
      setTotalPage(page);
      setLoansCount(res.data.total);
      return res.data.result;
    },
  });

  const loanCategories = [
    "All",
    "Personal",
    "Business",
    "Education",
    "Medical",
    "Home",
    "Agriculture",
    "Startup",
    "Event",
    "Travel",
    "Electronics",
    "Vehicle",
    "Women",
    "Housing",
  ];

  return (
    <div className="px-5 lg:px-10 my-10">
      <h1 className="text-3xl  md:text-5xl font-bold text-center pb-10 text-primary">
        All Available Loans
      </h1>
      <div className="pb-5 flex justify-between">
        <input
          type="search"
          onChange={(e) => setSearchText(e.target.value)}
          className="input border-primary"
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

      <div className="flex flex-col md:flex-row md:border-t-2 border-primary">
        <div className="flex text-center md:w-2/12 md:mr-5 md:border-r-2 border-primary md:pr-5">
          <div>
            <h2 className="text-center my-2 font-bold">Categories</h2>
            {loanCategories.map((item, i) => (
              <button
                onClick={() => setCategoryText(item)}
                key={i}
                className={`${
                  item === categoryText
                    ? "btn-primary text-primary md:text-black"
                    : "btn-outline"
                } md:btn btn-primary md:w-full gap-5 px-2 my-1 `}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="md:w-10/12 flex justify-center pt-4 flex-col items-center">
          <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 ">
            {loans.map((loan) => (
              <LoanCard key={loan._id} loan={loan} />
            ))}
          </div>
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 ">
              {[...Array(8)].map((_, i) => (
                <LoanCardSkeleton key={i} />
              ))}
            </div>
          )}
          {loans.length === 0 && <CardNotFound />}
          <div className="flex items-center justify-center my-5 ">
            {[...Array(totalPage).keys()].map((i) => (
              <button
                onClick={() => setCurrentPage(i)}
                className={`btn mx-2 ${i === currentPage && "btn-primary"}`}
              >
                {i}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllLoans;
