import React, { useRef, useState } from "react";
import useAxiosInstance from "../../Hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";

const ApprovedLoans = () => {
  const [selectedLoanId, setSelectedLoanId] = useState(null);
  const [Status, setStatus] = useState("");

  const axiosSecure = useAxiosSecure();
  const axiosInstance = useAxiosInstance();
  const { data: LoanApplications = [], refetch } = useQuery({
    queryKey: ["all-loan-applications", Status],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/loan-application/manager?Status=Approved`
      );
      return res.data;
    },
  });

  // modal information
  const { data: LoanApplication = {}, isLoading } = useQuery({
    queryKey: ["loan-application", selectedLoanId],
    enabled: !!selectedLoanId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/loan-application/${selectedLoanId}`);
      return res.data;
    },
  });

  const modalRef = useRef();

  const handleView = (id) => {
    setSelectedLoanId(id);
    modalRef.current.showModal();
  };

  const handleStatus = (id, Status) => {
    axiosInstance
      .patch(`/loan-application/manager/${id}`, { Status: Status })
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          toast.success("Status Changed");
        }
      });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold p-5">
        Approved Loans: {LoanApplications.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Approved Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {LoanApplications.map((loanApps, ind) => (
              <tr key={loanApps._id}>
                <th>{loanApps._id}</th>
                <td>
                  <div>{loanApps.firstName + loanApps.lastName}</div>
                </td>
                <td>
                  <div>{loanApps.email}</div>
                </td>
                <td>{loanApps.updatedAt}</td>
                <td>{loanApps.loanAmount}</td>
                <td className="text-center">{loanApps.Status}</td>
                <th>
                  <button
                    onClick={() => handleView(loanApps._id)}
                    className="btn bg-blue-300 btn-xs"
                  >
                    View
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
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
              </form>
            )}

            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default ApprovedLoans;
