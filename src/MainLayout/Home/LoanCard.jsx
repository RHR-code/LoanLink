import React from "react";
import { Link } from "react-router";

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
    <div className="card bg-base-200 shadow-sm">
      <figure>
        <img
          className="h-[250px] w-full object-cover"
          src={loan_image}
          alt="Shoes"
        />
      </figure>
      <div className="card-body space-y-3">
        <h2 className="card-title">
          {loan_title}
          <div className="badge badge-primary">{category}</div>
        </h2>
        <p className="line-clamp-2">{description}</p>
        <div className="card-actions justify-between">
          <div className="badge  badge-outline">
            <strong>Max Loan:</strong> {max_limit}
          </div>
          <div className="badge  badge-outline">
            <strong>Interest:</strong> {interest_rate}
          </div>
        </div>
        <Link to={`/loan-details/${_id}`} className="btn btn-primary">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default LoanCard;
