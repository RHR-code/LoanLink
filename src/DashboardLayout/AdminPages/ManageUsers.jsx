import React, { useRef, useState } from "react";
import useAxiosInstance from "../../Hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const ManageUsers = () => {
  // const axiosInstance = useAxiosInstance();
  const axiosSecure = useAxiosSecure();

  const [role, setRole] = useState("");
  const [searchText, setSearchText] = useState("");
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", role, searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users?role=${role}&searchText=${searchText}`
      );
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
        axiosSecure.patch(`/users/${id}`).then((res) => {
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
  const [suspendId, setSuspendId] = useState(null);
  const modalRef = useRef();
  const handleSuspend = (id) => {
    setSuspendId(id);
    modalRef.current.showModal();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axiosSecure.patch(`/users/suspend/${suspendId}`).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        toast.success("Suspend Feedback Added Successfully");
        e.target.reset();
        modalRef.current.close();
        Swal.fire({
          title: "Successful!",
          text: "The User Is Suspended",
          icon: "success",
        });
      }
    });
  };
  return (
    <div>
      <h1 className="text-2xl font-bold p-5 "> All Users: {users.length}</h1>
      <div className="flex justify-between p-5">
        <input
          onChange={(e) => setSearchText(e.target.value)}
          type="search"
          className="input"
          placeholder="Search By Name"
        />
        <select
          onChange={(e) => setRole(e.target.value)}
          defaultValue="Pick a Role"
          className="select"
        >
          <option value="">Filter By Role</option>
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
          <option value="User">User</option>
        </select>
      </div>
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
              <tr key={user._id}>
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
                  <button
                    onClick={() => handleSuspend(user._id)}
                    className="btn bg-red-500 btn-xs"
                  >
                    Suspend
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* modal */}
      <dialog
        ref={modalRef}
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label>Suspend Reason</label>
              <input
                type="text"
                required
                className="input"
                placeholder="Suspend Reason"
              />
            </div>
            <div className=" mt-2 flex flex-col gap-2">
              <label>Suspend Feedback</label>
              <textarea
                className="border-2 border-gray-200 rounded-sm p-2"
                required
                rows={5}
                placeholder="Suspend Feedback"
              ></textarea>
            </div>
            <button className="btn btn-primary mt-5">Submit</button>
          </form>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ManageUsers;
