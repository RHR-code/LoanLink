import React from "react";
import useAxiosInstance from "../../Hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosInstance = useAxiosInstance();
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosInstance.get("/users");
      return res.data;
    },
  });
  const handleApprove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do You Want To Change the Role!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Change it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance.patch(`/users/${id}`).then((res) => {
          if (res.data.modifiedCount) {
            refetch();
            Swal.fire({
              title: "Successful!",
              text: "The Role Has Been Changes To Manager",
              icon: "success",
            });
          }
        });
      }
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
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((user, ind) => (
              <tr>
                <th>{ind + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user.photoURL}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div>{user.email}</div>
                </td>
                <td>{user.role}</td>
                <th>
                  <button
                    onClick={() => handleApprove(user._id)}
                    className="btn bg-green-500 btn-xs"
                  >
                    Approve
                  </button>
                  <button className="btn bg-red-500 btn-xs">Suspend</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
