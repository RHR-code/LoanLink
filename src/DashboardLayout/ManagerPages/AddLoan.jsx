import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosInstance from "../../Hooks/useAxiosInstance";
import axios from "axios";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AddLoan = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const axiosInstance = useAxiosInstance();
  const axiosSecure = useAxiosSecure();
  const handleAddLoan = (data) => {
    setLoading(true);
    const loanImage = data.loan_image[0];
    const formData = new FormData();
    formData.append("image", loanImage);
    const Image_Api_Url = `https://api.imgbb.com/1/upload?&key=${
      import.meta.env.VITE_Image_Host_Api
    }`;

    axios.post(Image_Api_Url, formData).then((res) => {
      // ADDING LOAN TO DATABASE
      const emiPlansArray = data.available_emi_plans
        .split(",")
        .map((item) => item.trim());
      data.available_emi_plans = emiPlansArray;
      data.loan_image = res.data.data.url;
      data.Date = new Date();
      data.updatedAt = new Date();
      data.createdBy = user?.displayName;
      data.email = user?.email;
      axiosSecure
        .post("/loans", data)
        .then((res) => {
          setLoading(false);
          reset();
          toast.success("Loan Added Successfully");
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    });
  };
  return (
    <div>
      <div className="m-5 lg:mx-20 lg:my-10">
        <h1 className=" text-5xl text-secondary font-black ">Add A Loan</h1>
        <h2 className="py-5 text-2xl font-bold text-secondary">
          Enter your Personal details
        </h2>
        <form
          className="p-5 lg:p-10 border-2 border-gray-400 rounded-2xl shadow-2xl"
          onSubmit={handleSubmit(handleAddLoan)}
        >
          {/* personal details */}
          <div className="grid gap-12 grid-cols-1  space-y-2">
            <fieldset className="fieldset">
              <label className="label">Loan Title</label>
              <input
                type="text"
                // value={loanDetails.loan_title}
                {...register("loan_title", { required: true })}
                className="input w-full"
                placeholder="Loan Title"
              />
            </fieldset>
            {errors.loan_title?.type === "required" && (
              <p className="text-red-500">Loan Title is required</p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 ">
            <div>
              <fieldset className="fieldset space-y-3">
                <fieldset className="fieldset">
                  <label className="label">Loan Description</label>
                  <input
                    type="text"
                    // value={loanDetails.description}
                    {...register("description", { required: true })}
                    className="input w-full"
                    placeholder="Loan Description"
                  />
                </fieldset>
                {errors.description?.type === "required" && (
                  <p className="text-red-500">Description is required</p>
                )}
                {/* Interest Rate */}
                <label className="label">Interest Rate</label>
                <input
                  type="text"
                  {...register("interest_rate", { required: true })}
                  className="input w-full"
                  placeholder="Interest Rate"
                />
                {errors.interest_rate?.type === "required" && (
                  <p className="text-red-500">Interest Rate is required</p>
                )}
                {/* Category */}
                <label className="label">Category </label>
                <input
                  type="text"
                  {...register("category", { required: true })}
                  className="input w-full"
                  placeholder="Category"
                />
                {errors.category?.type === "required" && (
                  <p className="text-red-500">Category is required</p>
                )}
                <label className="label">Upload Photo</label>
                <input
                  type="file"
                  {...register("loan_image", { required: true })}
                  className="file-input file-input-primary"
                  placeholder="Your Photo"
                />
                {errors.photo?.type === "required" && (
                  <p className="text-red-500">photo is required</p>
                )}
                {/* Address */}
                <label className="label">Max Loan Limit</label>
                <input
                  type="number"
                  {...register("max_limit", { required: true })}
                  className="input w-full"
                  placeholder="Max Loan Limit"
                />
              </fieldset>
              {errors.max_limit?.type === "required" && (
                <p className="text-red-500">Max Limit is required</p>
              )}
            </div>
            <div>
              <fieldset className="fieldset space-y-3">
                {/* EMI */}
                <label className="label">Available Emi Plans</label>
                <input
                  type="text"
                  {...register("available_emi_plans", { required: true })}
                  className="input w-full"
                  placeholder="3month,6month"
                />
              </fieldset>
              {errors.available_emi_plans?.type === "required" && (
                <p className="text-red-500">EMI is required</p>
              )}
              <label className="label py-5">Show ON Home</label>
              <input
                {...register("isPopular")}
                type="checkbox"
                className="checkbox mx-5 checkbox-info"
              />
              <fieldset className="fieldset space-y-3">
                {/* Required Documents */}
                <label className="label">Required Documents</label>
                <input
                  type="text"
                  {...register("requiredDocuments", { required: true })}
                  className="input w-full"
                  placeholder="Required Documents"
                />
              </fieldset>
              {errors.requiredDocuments?.type === "required" && (
                <p className="text-red-500">Documents is required</p>
              )}
              <div className="flex justify-between py-3">
                <button type="submit" className="btn btn-primary">
                  {loading ? "Adding..." : "Add Loan"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLoan;
