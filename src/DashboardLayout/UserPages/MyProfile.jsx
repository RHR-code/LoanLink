import React from "react";
import {
  FaUserTie,
  FaEnvelope,
  FaPlusCircle,
  FaCheckCircle,
  FaHourglassHalf,
} from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import Loader from "../../components/Loader";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const MyProfile = ({ manager }) => {
  const axiosSecure = useAxiosSecure();
  const { user, loading, userLogout } = useAuth();
  const navigate = useNavigate();
  const handleSignout = () => {
    userLogout()
      .then(() => {
        toast.success("Successfully Signed Out!");
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  //   for added loans
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

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-6 items-center">
        {/* Avatar */}
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500">
          <img
            src={user.photoURL || "https://i.ibb.co/MBtjqXQ/no-avatar.png"}
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1">
          <h2 className="text-2xl text-primary font-bold flex items-center gap-2">
            <FaUserTie className="text-primary" />
            {user.displayName || "User Name"}
          </h2>

          <p className="text-gray-600 flex items-center gap-2 mt-1">
            <FaEnvelope /> {user.email || "User@email.com"}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-blue-50 rounded-2xl p-5 shadow flex items-center gap-4">
          <FaPlusCircle className="text-3xl text-primary" />
          <div>
            <p className="text-sm text-gray-600">Loans Added</p>
            <p className="text-2xl text-primary font-bold">{loans.length}</p>
          </div>
        </div>
        <div className="bg-red-50 rounded-2xl p-5 shadow flex items-center justify-center gap-4">
          <div onClick={handleSignout}>
            <button className="md:btn btn-primary btn-outline">Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
