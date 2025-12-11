import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { useLocation } from "react-router";
import useAxiosInstance from "../../Hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";

const ApplyForLoan = () => {
  const { user } = useAuth();
  const { state } = useLocation();
  const axiosInstance = useAxiosInstance();
  const { data: loans = [], isLoading } = useQuery({
    queryKey: ["all-loans"],
    queryFn: async () => {
      const res = await axiosInstance.get("/loans");
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const interestByTittle = (title) => {
    const loan = loans.find((loan) => loan.loan_title === title);
    return loan.interest_rate;
  };

  const loanTittles = loans.map((loan) => loan.loan_title);
  console.log(loanTittles);
  const watchLoanTittle = useWatch({ control, name: "loanTittle" });

  useEffect(() => {
    if (user?.email) {
      setValue("email", user?.email);
    }
    if (state?.title) {
      setValue("loanTittle", state.title);
    }
    if (state?.interest_rate) {
      setValue("interest", state?.interest_rate);
    } else if (watchLoanTittle) {
      setValue("interest", interestByTittle(watchLoanTittle) || 0);
    } else {
      setValue("interest", 0);
    }
  }, [user, watchLoanTittle, state, setValue]);

  const handleApplyLoan = (data) => {
    console.log(data);
  };
  return (
    <div className="px-10 my-10">
      <div>
        <h1 className="py-5 text-5xl text-secondary font-black ">
          Apply For A Loan
        </h1>
        <h2 className="text-2xl font-bold text-secondary">
          Enter your Personal details
        </h2>
        <form onSubmit={handleSubmit(handleApplyLoan)} className="">
          {/* personal details */}
          <div className="grid gap-12 grid-cols-1 md:grid-cols-2 space-y-5">
            <fieldset className="fieldset">
              <label className="label">First Name</label>
              <input
                type="text"
                {...register("firstName")}
                className="input w-full"
                placeholder="First Name"
              />
            </fieldset>
            <fieldset className="fieldset">
              <label className="label">Last Name</label>
              <input
                type="text"
                {...register("lastName")}
                className="input w-full"
                placeholder="Last Name"
              />
            </fieldset>
          </div>
          {/* sender & receiver details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* sender */}
            <div>
              <fieldset className="fieldset space-y-3">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Loan Title</legend>
                  <select
                    {...register("loanTittle")}
                    defaultValue="Pick a Loan"
                    className="select w-full"
                    disabled={!!state?.title}
                  >
                    <option disabled={true}>Pick a Loan</option>
                    {loanTittles.map((loan, ind) => (
                      <option key={ind} value={loan}>
                        {loan}
                      </option>
                    ))}
                  </select>
                </fieldset>
                {/* Interest Rate */}
                <label className="label">Interest Rate</label>
                <input
                  type="text"
                  readOnly
                  {...register("interest")}
                  className="input w-full"
                  placeholder="Interest Rate"
                />

                {/* Passport / National ID no */}
                <label className="label">Passport No/National ID </label>
                <input
                  type="number"
                  {...register("nid/passport")}
                  className="input w-full"
                  placeholder="Nid/Passport No"
                />
                {/* monthly income */}
                <label className="label">Monthly Income</label>
                <input
                  type="number"
                  {...register("monthlyIncome")}
                  className="input w-full"
                  placeholder="Monthly Income"
                />
                {/* Address */}
                <label className="label">Address</label>
                <textarea
                  {...register("address")}
                  id=""
                  className="input h-[90px] w-full"
                  placeholder="Address"
                  rows="5"
                ></textarea>
              </fieldset>
            </div>
            <div>
              <fieldset className="fieldset space-y-3">
                {/* User Email */}
                <label className="label">Your Email</label>
                <input
                  type="email"
                  {...register("email")}
                  defaultValue={user?.email}
                  className="input w-full"
                  placeholder="Your Email"
                />
                {/* Contact No */}
                <label className="label">Contact No</label>
                <input
                  type="number"
                  {...register("contactNo")}
                  className="input w-full"
                  placeholder="Contact Number"
                />

                {/* Income Source */}
                <label className="label">Income Source</label>
                <input
                  type="text"
                  {...register("incomeSource")}
                  className="input w-full"
                  placeholder="Income Source"
                />
                {/* Loan Amount */}
                <label className="label">Loan Amount</label>
                <input
                  type="number"
                  {...register("loanAmount")}
                  className="input w-full"
                  placeholder="Loan Amount"
                />
                {/* Reason For Loan */}
                <label className="label">Reason For Loan</label>
                <textarea
                  {...register("reasonForLoan")}
                  id=""
                  className="input h-[90px] w-full"
                  placeholder="Reason For Loan"
                  rows="5"
                ></textarea>
              </fieldset>
            </div>
          </div>
          {/* Reason For Loan */}
          <label className="label py-3">Extra Notes</label>
          <textarea
            {...register("extraNotes")}
            id=""
            className="input h-[90px] w-full"
            placeholder="Extra Notes"
            rows="5"
          ></textarea>
          <button className="btn btn-primary text-black w-2xs my-10">
            Proceed to Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyForLoan;
