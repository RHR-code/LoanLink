import React from "react";
import { Link } from "react-router";

const PaymentCancelled = () => {
  return (
    <div className="p-5">
      <h2 className="text-5xl text-secondary">Payment Cancelled</h2>
      <Link
        className="btn my-5 btn-primary text-black"
        to="/dashboard/my-loans"
      >
        Try Again
      </Link>
    </div>
  );
};

export default PaymentCancelled;
