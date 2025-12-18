import React from "react";
import LoanCard from "./LoanCard";
import { useQuery } from "@tanstack/react-query";
import useAxiosInstance from "../../Hooks/useAxiosInstance";

import Loader from "../../components/Loader";
import { motion } from "framer-motion";
const AvailableLoans = () => {
  const axiosInstance = useAxiosInstance();
  const { data: loans = [], isLoading } = useQuery({
    queryKey: ["available-loans"],
    queryFn: async () => {
      const res = await axiosInstance.get("/popular-loans");
      return res.data;
    },
  });
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mt-24 px-5 md:px-10"
    >
      <h1 className="text-3xl md:text-5xl font-bold text-center pb-10 text-primary">
        Available Loans
      </h1>
      {isLoading && <Loader />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 ">
        {loans.map((loan) => (
          <LoanCard key={loan._id} loan={loan} />
        ))}
      </div>
    </motion.div>
  );
};

export default AvailableLoans;
