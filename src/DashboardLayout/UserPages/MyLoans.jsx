import React, { useEffect, useRef, useState } from "react";
import useAxiosInstance from "../../Hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Loader from "../../components/Loader";
import {
  FaUser,
  FaEnvelope,
  FaMoneyBillWave,
  FaCheckCircle,
  FaHashtag,
  FaClock,
  FaFileContract,
  FaReceipt,
} from "react-icons/fa";

const MyLoans = () => {
  const { user } = useAuth();
  //   console.log(user.email);

  const axiosInstance = useAxiosInstance();
  const axiosSecure = useAxiosSecure();
  const [selectedLoanId, setSelectedLoanId] = useState(null);
  //   const {
  //     register,
  //     handleSubmit,
  //     reset,
  //     formState: { errors },
  //   } = useForm();

  const {
    data: loans = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-loans", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/loan-application/user?email=${user?.email}`
      );
      return res.data;
    },
  });

  const modalRef = useRef();

  const handleView = (id) => {
    if (!id) {
      return;
    }
    setSelectedLoanId(id);
    modalRef.current.showModal();
  };

  // modal information
  const { data: LoanApplication = {} } = useQuery({
    queryKey: ["loan-details", selectedLoanId],
    enabled: !!selectedLoanId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/loan-application/${selectedLoanId}`);
      return res.data;
    },
  });

  const handleClose = () => {
    modalRef.current.close();
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do You Want To Cancel This Loan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/loan-application/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Successful!",
              text: "The Loan Has Been Canceled Successfully",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handlePayment = async (loan) => {
    console.log(loan);

    const paymentInfo = {
      loanId: loan._id,
      email: loan.email,
      loanName: loan.loanTittle,
    };
    const res = await axiosSecure.post(
      "/payment-checkout-session",
      paymentInfo
    );
    refetch();
    window.location.href = res.data.url;
  };
  const [transactionId, setTransactionId] = useState(null);

  const { data: loanHistory = {} } = useQuery({
    queryKey: ["loan-history", transactionId],
    enabled: !!transactionId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${transactionId}`);
      return res.data;
    },
  });

  console.log("history", loanHistory);
  const historyRef = useRef();
  const handlePaidHistory = (id) => {
    setTransactionId(id);
    historyRef.current.showModal();
  };

  return (
    <div>
      this is manage loans: {loans.length}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>Image & Name</th>
              <th>Interest</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {loans.map((loan) => (
              <tr key={loan._id}>
                <th>{loan._id}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold">{loan.loanTittle}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div>{loan.interest}</div>
                </td>
                <td>
                  <div>{loan.loanAmount}</div>
                </td>
                <td>
                  {loan.FeeStatus === "Unpaid" ? (
                    <button className="badge bg-gray-500">
                      {loan.FeeStatus}
                    </button>
                  ) : (
                    <button
                      onClick={() => handlePaidHistory(loan?.transactionId)}
                      className="badge bg-green-500"
                    >
                      {loan.FeeStatus}
                    </button>
                  )}
                </td>

                <th>
                  <button
                    onClick={() => handleView(loan._id)}
                    className="btn bg-blue-300 btn-xs"
                  >
                    View
                  </button>
                  {loan.Status === "Pending" && (
                    <button
                      onClick={() => handleDelete(loan._id)}
                      className="btn bg-red-500 btn-xs"
                    >
                      Cancel
                    </button>
                  )}
                  {loan.FeeStatus === "Unpaid" && (
                    <button
                      onClick={() => handlePayment(loan)}
                      className="btn bg-green-500 btn-xs"
                    >
                      Pay
                    </button>
                  )}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* view modal */}
      <dialog
        id="my_modal_5"
        ref={modalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          {/* VIEW MODAL INFORMATION */}
          {isLoading ? (
            <Loader />
          ) : (
            <form className="">
              {/* personal details */}
              <div className="grid gap-12 grid-cols-1 md:grid-cols-2 space-y-5">
                <fieldset className="fieldset">
                  <label className="label">First Name</label>
                  <input
                    type="text"
                    value={LoanApplication.firstName}
                    readOnly
                    className="input w-full"
                    placeholder="First Name"
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <label className="label">Last Name</label>
                  <input
                    type="text"
                    value={LoanApplication.lastName}
                    readOnly
                    className="input w-full"
                    placeholder="Last Name"
                  />
                </fieldset>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <fieldset className="fieldset space-y-3">
                    <fieldset className="fieldset">
                      <legend className="fieldset-legend">Loan Title</legend>
                      <input
                        type="text"
                        value={LoanApplication.loanTittle}
                        readOnly
                        className="input w-full"
                        placeholder="Last Name"
                      />
                    </fieldset>
                    {/* Interest Rate */}
                    <label className="label">Interest Rate</label>
                    <input
                      type="text"
                      readOnly
                      value={LoanApplication.interest}
                      className="input w-full"
                      placeholder="Interest Rate"
                    />

                    {/* Passport / National ID no */}
                    <label className="label">Passport No/National ID </label>
                    <input
                      type="number"
                      value={LoanApplication.nidOrPassportNo}
                      readOnly
                      className="input w-full"
                      placeholder="Nid/Passport No"
                    />

                    {/* monthly income */}
                    <label className="label">Monthly Income</label>
                    <input
                      type="number"
                      value={LoanApplication.monthlyIncome}
                      readOnly
                      className="input w-full"
                      placeholder="Monthly Income"
                    />
                    {/* Address */}
                    <label className="label">Address</label>
                    <textarea
                      value={LoanApplication.address}
                      readOnly
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
                      value={LoanApplication.email}
                      readOnly
                      className="input w-full"
                      placeholder="Your Email"
                    />
                    {/* Contact No */}
                    <label className="label">Contact No</label>
                    <input
                      type="number"
                      value={LoanApplication.contactNo}
                      readOnly
                      className="input w-full"
                      placeholder="Contact Number"
                    />

                    {/* Income Source */}
                    <label className="label">Income Source</label>
                    <input
                      type="text"
                      value={LoanApplication.incomeSource}
                      readOnly
                      className="input w-full"
                      placeholder="Income Source"
                    />
                    {/* Loan Amount */}
                    <label className="label">Loan Amount</label>
                    <input
                      type="number"
                      value={LoanApplication.loanAmount}
                      readOnly
                      className="input w-full"
                      placeholder="Loan Amount"
                    />
                    {/* Reason For Loan */}
                    <label className="label">Reason For Loan</label>
                    <textarea
                      value={LoanApplication.reasonForLoan}
                      readOnly
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
                value={LoanApplication.extraNotes}
                readOnly
                className="input h-[90px] w-full"
                placeholder="Extra Notes"
                rows="5"
              ></textarea>
              <button
                type="button"
                onClick={handleClose}
                className="btn btn-primary my-5"
              >
                Close
              </button>
            </form>
          )}
        </div>
      </dialog>
      {/* history modal */}
      <dialog
        ref={historyRef}
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box max-w-lg">
          {/* Header */}
          <h3 className="font-bold text-xl text-center mb-6 flex items-center justify-center gap-2">
            <FaCheckCircle className="text-green-500" />
            Payment Details
          </h3>

          {/* Content */}
          <div className="space-y-3">
            {/* Loan Name */}
            <div className="flex items-center gap-3 bg-base-200 p-3 rounded-lg">
              <FaFileContract className="text-primary text-lg" />
              <div>
                <p className="text-xs text-gray-500">Loan Name</p>
                <p className="font-medium">{loanHistory.loanName}</p>
              </div>
            </div>

            {/* Loan ID */}
            <div className="flex items-center gap-3 bg-base-200 p-3 rounded-lg">
              <FaHashtag className="text-primary text-lg" />
              <div>
                <p className="text-xs text-gray-500">Loan ID</p>
                <p className="font-medium text-sm break-all">
                  {loanHistory.loanId}
                </p>
              </div>
            </div>

            {/* Customer Email */}
            <div className="flex items-center gap-3 bg-base-200 p-3 rounded-lg">
              <FaEnvelope className="text-primary text-lg" />
              <div>
                <p className="text-xs text-gray-500">Customer Email</p>
                <p className="font-medium">{loanHistory.customerEmail}</p>
              </div>
            </div>

            {/* Amount */}
            <div className="flex items-center gap-3 bg-base-200 p-3 rounded-lg">
              <FaMoneyBillWave className="text-primary text-lg" />
              <div>
                <p className="text-xs text-gray-500">Amount Paid</p>
                <p className="font-medium">{loanHistory.amount}</p>
              </div>
            </div>

            {/* Transaction ID */}
            <div className="flex items-center gap-3 bg-base-200 p-3 rounded-lg">
              <FaReceipt className="text-primary text-lg" />
              <div>
                <p className="text-xs text-gray-500">Transaction ID</p>
                <p className="font-medium text-sm break-all">
                  {loanHistory.TransactionId}
                </p>
              </div>
            </div>

            {/* Paid At */}
            <div className="flex items-center gap-3 bg-base-200 p-3 rounded-lg">
              <FaClock className="text-primary text-lg" />
              <div>
                <p className="text-xs text-gray-500">Paid At</p>
                <p className="font-medium">{loanHistory.PaidAt}</p>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center gap-3 bg-green-50 border border-green-200 p-3 rounded-lg">
              <FaCheckCircle className="text-green-600 text-lg" />
              <div>
                <p className="text-xs text-green-600">Payment Status</p>
                <p className="font-semibold text-green-700 capitalize">
                  {loanHistory.paymentStatus}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-primary w-full">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyLoans;
