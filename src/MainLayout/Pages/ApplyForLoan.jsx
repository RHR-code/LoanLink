import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { useLocation } from "react-router";
import useAxiosInstance from "../../Hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

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
    reset,
    formState: { errors },
  } = useForm();

  const interestByTittle = (title) => {
    const loan = loans.find((loan) => loan.loan_title === title);
    return loan ? loan.interest_rate : "";
  };

  const loanTittles = loans.map((loan) => loan.loan_title);

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
    axiosInstance
      .post("/loan-application", data)
      .then((res) => {
        toast.success("Successfully Applied For Loan");
        reset();
      })
      .catch((error) => {
        console.log(error);
      });
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
                {...register("firstName", { required: true })}
                className="input w-full"
                placeholder="First Name"
              />
              {errors.firstName?.type === "required" && (
                <p className="text-red-500">First Name is required</p>
              )}
            </fieldset>
            <fieldset className="fieldset">
              <label className="label">Last Name</label>
              <input
                type="text"
                {...register("lastName", { required: true })}
                className="input w-full"
                placeholder="Last Name"
              />
              {errors.lastName?.type === "required" && (
                <p className="text-red-500">Last Name is required</p>
              )}
            </fieldset>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <fieldset className="fieldset space-y-3">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Loan Title</legend>
                  <select
                    {...register("loanTittle", { required: true })}
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
                  {errors.loanTittle?.type === "required" && (
                    <p className="text-red-500">Loan Tittle is required</p>
                  )}
                </fieldset>
                {/* Interest Rate */}
                <label className="label">Interest Rate</label>
                <input
                  type="text"
                  readOnly
                  {...register("interest", { required: true })}
                  className="input w-full"
                  placeholder="Interest Rate"
                />
                {errors.interest?.type === "required" && (
                  <p className="text-red-500">Interest is required</p>
                )}
                {/* Passport / National ID no */}
                <label className="label">Passport No/National ID </label>
                <input
                  type="number"
                  {...register("nidOrPassportNo", { required: true })}
                  className="input w-full"
                  placeholder="Nid/Passport No"
                />
                {errors.nidOrPassportNo?.type === "required" && (
                  <p className="text-red-500">NID or Passport No required</p>
                )}
                {/* monthly income */}
                <label className="label">Monthly Income</label>
                <input
                  type="number"
                  {...register("monthlyIncome", { required: true })}
                  className="input w-full"
                  placeholder="Monthly Income"
                />
                {errors.monthlyIncome?.type === "required" && (
                  <p className="text-red-500">Monthly Income is required</p>
                )}
                {/* Address */}
                <label className="label">Address</label>
                <textarea
                  {...register("address", { required: true })}
                  id=""
                  className="input h-[90px] w-full"
                  placeholder="Address"
                  rows="5"
                ></textarea>
                {errors.address?.type === "required" && (
                  <p className="text-red-500">Address is required</p>
                )}
              </fieldset>
            </div>
            <div>
              <fieldset className="fieldset space-y-3">
                {/* User Email */}
                <label className="label">Your Email</label>
                <input
                  type="email"
                  readOnly
                  {...register("email", { required: true })}
                  defaultValue={user?.email}
                  className="input w-full"
                  placeholder="Your Email"
                />
                {errors.email?.type === "required" && (
                  <p className="text-red-500">Email is required</p>
                )}
                {/* Contact No */}
                <label className="label">Contact No</label>
                <input
                  type="number"
                  {...register("contactNo", { required: true })}
                  className="input w-full"
                  placeholder="Contact Number"
                />
                {errors.contactNo?.type === "required" && (
                  <p className="text-red-500">Contact No required</p>
                )}
                {/* Income Source */}
                <label className="label">Income Source</label>
                <input
                  type="text"
                  {...register("incomeSource", { required: true })}
                  className="input w-full"
                  placeholder="Income Source"
                />
                {errors.incomeSource?.type === "required" && (
                  <p className="text-red-500">Income Source is required</p>
                )}
                {/* Loan Amount */}
                <label className="label">Loan Amount</label>
                <input
                  type="number"
                  {...register("loanAmount", { required: true })}
                  className="input w-full"
                  placeholder="Loan Amount"
                />
                {errors.loanAmount?.type === "required" && (
                  <p className="text-red-500">Loan Amount is required</p>
                )}
                {/* Reason For Loan */}
                <label className="label">Reason For Loan</label>
                <textarea
                  {...register("reasonForLoan", { required: true })}
                  id=""
                  className="input h-[90px] w-full"
                  placeholder="Reason For Loan"
                  rows="5"
                ></textarea>
                {errors.reasonForLoan?.type === "required" && (
                  <p className="text-red-500">Reason For Loan required</p>
                )}
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
