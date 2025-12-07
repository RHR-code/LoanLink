import React from "react";
import { GoArrowUpRight } from "react-icons/go";
import bannerImg from "../../assets/banner-img.jpg";
const Banner = () => {
  return (
    <div className="flex flex-col-reverse gap-10 md:flex-row justify-between items-center bg-base-200 md:h-[500px] p-5 md:px-10">
      <div className="space-y-5 md:flex-1">
        <h3 className="text-lg lg:text-2xl font-semibold ">
          Easily Find the Right Loan Quickly
        </h3>
        <h1 className="text-4xl  lg:text-6xl font-bold max-w-xl">
          Discover the Best Loan Options
        </h1>
        <p className="max-w-lg">
          We provide simple, transparent micro-loan solutions designed around
          your personal financial needs, helping you borrow with clarity and
          confidence.
        </p>
        <button className="btn btn-primary text-black rounded-full ">
          Apply For Loan <GoArrowUpRight size={20} />
        </button>
      </div>
      <div className="md:flex-1 ">
        <img src={bannerImg} alt="" />
      </div>
    </div>
  );
};

export default Banner;
