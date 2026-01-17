import React, { useState } from "react";
import {
  FaMoneyBillWave,
  FaBriefcase,
  FaGraduationCap,
  FaHeart,
  FaHome,
  FaSeedling,
  FaChartLine,
  FaRing,
  FaPlane,
  FaLaptop,
  FaMotorcycle,
  FaFemale,
  FaBuilding,
} from "react-icons/fa";
import { Link } from "react-router";

const categoryIcons = {
  Personal: FaMoneyBillWave,
  Business: FaBriefcase,
  Education: FaGraduationCap,
  Medical: FaHeart,
  Home: FaHome,
  Agriculture: FaSeedling,
  Startup: FaChartLine,
  Event: FaRing,
  Travel: FaPlane,
  Electronics: FaLaptop,
  Vehicle: FaMotorcycle,
  Women: FaFemale,
  Housing: FaBuilding,
};

const categoryColors = [
  "bg-blue-100",
  "bg-purple-100",
  "bg-pink-100",
  "bg-green-100",
  "bg-yellow-100",
  "bg-red-100",
  "bg-indigo-100",
  "bg-teal-100",
];

const LoanCard = ({ loan, index }) => {
  const Icon = categoryIcons[loan.category] || FaMoneyBillWave;
  const iconBgColor = categoryColors[index % categoryColors.length];

  return (
    <div className="bg-base-200 rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
      <div className={`${iconBgColor} rounded-2xl p-6 inline-block mb-6`}>
        <Icon className="text-4xl text-gray-700" />
      </div>

      <h3 className="text-xl font-bold  mb-3">{loan.loan_title}</h3>

      <p className="text-gray-600 text-sm mb-6 leading-relaxed">
        Interest rate: {loan.interest_rate} | Max limit: ৳
        {parseInt(loan.max_limit).toLocaleString()}
      </p>

      <Link
        to="/all-loans"
        className="bg-primary text-white px-8 py-2.5 rounded-full hover:opacity-90 transition-opacity font-medium"
      >
        APPLY
      </Link>
    </div>
  );
};

const ServicesSection = () => {
  const [loans] = useState([
    {
      _id: "693fa91ddb5f39a7c4701573",
      loan_title: "Personal Micro Loan",
      category: "Personal",
      interest_rate: "12%",
      max_limit: "50000",
    },
    {
      _id: "693fa91ddb5f39a7c4701574",
      loan_title: "Small Business Loan",
      category: "Business",
      interest_rate: "10%",
      max_limit: "150000",
    },
    {
      _id: "693fa91ddb5f39a7c4701575",
      loan_title: "Education Support Loan",
      category: "Education",
      interest_rate: "8%",
      max_limit: "80000",
    },
    {
      _id: "693fa91ddb5f39a7c4701576",
      loan_title: "Emergency Medical Loan",
      category: "Medical",
      interest_rate: "9%",
      max_limit: "100000",
    },
    {
      _id: "693fa91ddb5f39a7c4701577",
      loan_title: "Home Repair Loan",
      category: "Home",
      interest_rate: "11%",
      max_limit: "120000",
    },
    {
      _id: "693fa91ddb5f39a7c4701578",
      loan_title: "Agriculture Micro Loan",
      category: "Agriculture",
      interest_rate: "7%",
      max_limit: "90000",
    },
    {
      _id: "693fa91ddb5f39a7c4701579",
      loan_title: "Startup Booster Loan",
      category: "Startup",
      interest_rate: "10%",
      max_limit: "200000",
    },
    {
      _id: "693fa91ddb5f39a7c470157a",
      loan_title: "Wedding Loan",
      category: "Event",
      interest_rate: "13%",
      max_limit: "180000",
    },
    {
      _id: "693fa91ddb5f39a7c470157b",
      loan_title: "Travel Loan",
      category: "Travel",
      interest_rate: "9%",
      max_limit: "70000",
    },
  ]);

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-primary to-primary/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold tracking-wider uppercase mb-2">
            FEATURES
          </p>
          <h2 className="text-4xl  font-bold mb-2">Our Features & Services.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loans.slice(0, 9).map((loan, index) => (
            <LoanCard key={loan._id} loan={loan} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
