import React, { useEffect, useRef, useState } from "react";
import useAxiosInstance from "../../Hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const AllLoansDashboard = () => {
  const [selectedLoanId, setSelectedLoanId] = useState(null);
  const [onHomePage, setOnHomePage] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const axiosInstance = useAxiosInstance();
  const {
    data: loans = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-loans"],
    queryFn: async () => {
      const res = await axiosInstance.get("/loans");
      return res.data;
    },
  });

  // modal information
  const { data: loanDetails = {} } = useQuery({
    queryKey: ["loan-details", selectedLoanId],
    enabled: !!selectedLoanId,
    queryFn: async () => {
      const res = await axiosInstance.get(`/loans/${selectedLoanId}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (loanDetails?._id) {
      reset({
        loan_title: loanDetails.loan_title,
        description: loanDetails.description,
        interest_rate: loanDetails.interest_rate,
        category: loanDetails.category,
        loan_image: loanDetails.loan_image,
        max_limit: loanDetails.max_limit,
        available_emi_plans: loanDetails.available_emi_plans,
      });
    }
  }, [loanDetails, reset]);

  const modalRef = useRef();

  const handleView = (id) => {
    setSelectedLoanId(id);
    modalRef.current.showModal();
  };
  // update the form data
  const handleUpdate = (data) => {
    axiosInstance
      .patch(`/loans/${selectedLoanId}`, data)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          toast.success("Updated Successfully");
          handleClose();
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const handleClose = () => {
    modalRef.current.close();
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do You Want To Delete This Loan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance.delete(`/loans/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Successful!",
              text: "The Loan Has Been Deleted Successfully",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleShowOnHomePage = (e, id) => {
    console.log(e, id);
    axiosInstance
      .patch(`/popular-loans/${id}`, { isPopular: e })
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            title: "Successful!",
            text: `The Loan Has Been ${
              e ? "Added To" : "Removed From"
            } HomePage`,
            icon: "success",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>SL No</th>
              <th>Image & Name</th>
              <th>Interest</th>
              <th>Category</th>
              <th>Created By</th>
              <th>Show On Home</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {loans.map((loan, ind) => (
              <tr key={loan._id}>
                <th>{ind + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={loan.loan_image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{loan.loan_title}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div>{loan.interest_rate}</div>
                </td>
                <td>{loan.category}</td>
                <td>{loan.createdBy}</td>
                <td className="text-center">
                  <input
                    defaultChecked={loan.isPopular}
                    onChange={(e) =>
                      handleShowOnHomePage(e.target.checked, loan._id)
                    }
                    type="checkbox"
                    className="checkbox checkbox-info"
                  />
                </td>
                <th>
                  <button
                    onClick={() => handleView(loan._id)}
                    className="btn bg-green-500 btn-xs"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(loan._id)}
                    className="btn bg-red-500 btn-xs"
                  >
                    Delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* modal */}
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
            <form onSubmit={handleSubmit(handleUpdate)}>
              {/* personal details */}
              <div className="grid gap-12 grid-cols-1  space-y-2">
                <fieldset className="fieldset">
                  <label className="label">Loan Title</label>
                  <input
                    type="text"
                    // value={loanDetails.loan_title}
                    {...register("loan_title")}
                    className="input w-full"
                    placeholder="Loan Title"
                  />
                </fieldset>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-1 ">
                <div>
                  <fieldset className="fieldset space-y-3">
                    <fieldset className="fieldset">
                      <legend className="fieldset-legend">
                        Loan Description
                      </legend>
                      <input
                        type="text"
                        // value={loanDetails.description}
                        {...register("description")}
                        className="input w-full"
                        placeholder="Loan Description"
                      />
                    </fieldset>
                    {/* Interest Rate */}
                    <label className="label">Interest Rate</label>
                    <input
                      type="text"
                      // value={loanDetails.interest_rate}
                      {...register("interest_rate")}
                      className="input w-full"
                      placeholder="Interest Rate"
                    />

                    {/* Passport / National ID no */}
                    <label className="label">Category </label>
                    <input
                      type="text"
                      // value={loanDetails.category}
                      {...register("category")}
                      className="input w-full"
                      placeholder="Category"
                    />

                    {/* monthly income */}
                    <label className="label">Image</label>
                    <input
                      type="text"
                      // value={loanDetails.loan_image}
                      {...register("loan_image")}
                      className="input w-full"
                      placeholder="Loan Image"
                    />
                    {/* Address */}
                    <label className="label">Max Loan Limit</label>
                    <input
                      type="number"
                      // value={loanDetails.max_limit}
                      {...register("max_limit")}
                      className="input w-full"
                      placeholder="Max Loan Limit"
                    />
                  </fieldset>
                </div>
                <div>
                  <fieldset className="fieldset space-y-3">
                    {/* User Email */}
                    <label className="label">Available Emi Plans</label>
                    <input
                      type="text"
                      // value={loanDetails.available_emi_plans}
                      {...register("available_emi_plans")}
                      className="input w-full"
                      placeholder="Your Email"
                    />
                  </fieldset>
                  <div className="flex justify-between py-3">
                    <button
                      type="submit"
                      // onClick={() => handleUpdate(loanDetails._id)}
                      className="btn btn-primary"
                    >
                      Update
                    </button>
                    <button type="button" onClick={handleClose} className="btn">
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default AllLoansDashboard;
