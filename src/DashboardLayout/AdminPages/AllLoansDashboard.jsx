import React from "react";
import useAxiosInstance from "../../Hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";

const AllLoansDashboard = () => {
  const axiosInstance = useAxiosInstance();
  const { data: loans = [], isLoading } = useQuery({
    queryKey: ["all-loans"],
    queryFn: async () => {
      const res = await axiosInstance.get("/loans");
      return res.data;
    },
  });
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
              <tr>
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
                <td>SomeOne</td>
                <td className="text-center">
                  <input type="checkbox" className="checkbox checkbox-info" />
                </td>
                <th>
                  <button
                    // onClick={() => handleApprove(user._id)}
                    className="btn bg-green-500 btn-xs"
                  >
                    Update
                  </button>
                  <button className="btn bg-red-500 btn-xs">Delete</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllLoansDashboard;
