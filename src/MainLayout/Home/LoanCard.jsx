import React from "react";
import { Link } from "react-router";
import { FaMoneyBillWave, FaPercentage } from "react-icons/fa";

import { motion } from "framer-motion";
const LoanCard = ({ loan }) => {
  const {
    category,
    description,
    interest_rate,
    loan_image,
    loan_title,
    max_limit,
    _id,
  } = loan;
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="card bg-base-200 shadow-sm"
    >
      <figure>
        <img
          className="h-[200px] w-full object-cover"
          src={loan_image}
          alt="Shoes"
        />
      </figure>
      <div className="card-body space-y-1">
        <div className="card-title ">
          <h2 className="line-clamp-1">{loan_title}</h2>
          <div className="badge badge-primary">{category}</div>
        </div>
        <p className="line-clamp-1">{description}</p>
        <div className="card-actions justify-between">
          <div className="badge  badge-outline">
            <strong>
              <FaMoneyBillWave />{" "}
            </strong>{" "}
            {max_limit}
          </div>
          <div className="badge  badge-outline">
            <strong>
              <FaPercentage />
            </strong>{" "}
            {interest_rate}
          </div>
        </div>
        <Link to={`/loan-details/${_id}`} className="btn btn-primary">
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default LoanCard;
