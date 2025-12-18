import React from "react";
import useAxiosInstance from "../../Hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import Loader from "../../components/Loader";
import useRole from "../../Hooks/useRole";
import toast from "react-hot-toast";

const LoanDetails = () => {
  const axiosInstance = useAxiosInstance();
  const { userRole } = useRole();

  const { id } = useParams();
  const { data: loan = {}, isLoading } = useQuery({
    queryKey: ["loan-details", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/loans/${id}`);
      return res.data;
    },
  });
  isLoading && <Loader />;
  return (
    <div className="px-10 my-10">
      <div className="card lg:card-side bg-base-100 shadow-sm">
        <figure className="flex-1">
          <img src={loan.loan_image} alt="Album" />
        </figure>
        <div className="card-body flex-1 space-y-3">
          <h2 className="card-title">{loan.loan_title}</h2>
          <p>{loan.description}</p>
          <div className="flex flex-col md:flex-row justify-between gap-3 lg:gap-40">
            <p className="badge badge-ghost ">
              {" "}
              <strong>Category:</strong> {loan.category}
            </p>
            <p className="badge badge-neutral">
              <strong>Interest: </strong> {loan.interest_rate}
            </p>
          </div>
          <p>
            Borrow any amount up to the <strong>{loan.max_limit} Taka.</strong>{" "}
            Eligibility may vary depending on your financial profile.
          </p>
          <h2 className="font-semibold text-xl">Our Emi Plans</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {loan.available_emi_plans?.map((emi, ind) => (
              <p key={ind} className="badge badge-outline ">
                {emi}
              </p>
            ))}
          </div>
          <div className="card-actions justify-end">
            {userRole === "User" ? (
              <Link
                state={{
                  title: loan.loan_title,
                  interest_rate: loan.interest_rate,
                }}
                to="/apply-loan"
                className="btn btn-primary "
              >
                Apply Now
              </Link>
            ) : (
              <button
                onClick={() => toast.error("You're Not A User")}
                className="btn btn-primary"
              >
                Apply Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanDetails;
