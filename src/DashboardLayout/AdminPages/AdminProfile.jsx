import React from "react";
import {
  FaUser,
  FaEnvelope,
  FaCalendar,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaIdCard,
  FaEdit,
  FaCamera,
  FaShieldAlt,
  FaPhone,
} from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";

const AdminProfile = () => {
  const { user } = useAuth();
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const InfoCard = ({
    icon: Icon,
    label,
    value,
    verified,
    bgColor = "bg-primary",
  }) => (
    <div className="bg-base-200 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4">
        <div className={`${bgColor} bg-opacity-10 rounded-lg p-3`}>
          <Icon className={`${bgColor.replace("bg-", "text-")} text-2xl`} />
        </div>
        <div className="flex-1">
          <p className="text-sm  mb-1">{label}</p>
          <p className=" font-semibold break-all">{value || "Not provided"}</p>
          {verified !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              {verified ? (
                <>
                  <FaCheckCircle className="text-green-500 text-sm" />
                  <span className="text-xs text-green-600 font-medium">
                    Verified
                  </span>
                </>
              ) : (
                <>
                  <FaTimesCircle className="text-red-500 text-sm" />
                  <span className="text-xs text-red-600 font-medium">
                    Not Verified
                  </span>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen  py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Card */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl shadow-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
              />
              <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors">
                <FaCamera className="text-primary" />
              </button>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                <h1 className="text-3xl font-bold text-white">
                  {user.displayName}
                </h1>
                <button className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors">
                  <FaEdit />
                </button>
              </div>
              <p className="text-white text-opacity-90 mb-1">{user.email}</p>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <FaShieldAlt className="text-white text-opacity-90" />
                <span className="text-white text-opacity-90 text-sm">
                  Administrator
                </span>
              </div>
            </div>

            <div className="bg-base-200 bg-opacity-20 backdrop-blur-sm rounded-xl p-4 text-center">
              <p className=" text-opacity-90 text-sm mb-1">Account Status</p>
              <p className=" font-bold text-lg">
                {user.emailVerified ? "Active" : "Pending"}
              </p>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Account Information
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <InfoCard
            icon={FaUser}
            label="Display Name"
            value={user.displayName}
            bgColor="bg-primary"
          />

          <InfoCard
            icon={FaEnvelope}
            label="Email Address"
            value={user.email}
            verified={user.emailVerified}
            bgColor="bg-secondary"
          />

          <InfoCard
            icon={FaIdCard}
            label="User ID"
            value={user.uid}
            bgColor="bg-primary"
          />

          <InfoCard
            icon={FaCalendar}
            label="Account Created"
            value={formatDate(user.metadata.creationTime)}
            bgColor="bg-secondary"
          />

          <InfoCard
            icon={FaClock}
            label="Last Sign In"
            value={formatDate(user.metadata.lastSignInTime)}
            bgColor="bg-primary"
          />

          <InfoCard
            icon={FaShieldAlt}
            label="Provider"
            value={user.providerId}
            bgColor="bg-secondary"
          />
        </div>

        {/* Additional Info Card */}
        <div className=" rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-primary mb-4">
            Additional Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Anonymous Account:</span>
              <span className="font-semibold text-gray-800">
                {user.isAnonymous ? "Yes" : "No"}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Phone Number:</span>
              <span className="font-semibold text-gray-800">
                {user.phoneNumber || "Not provided"}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Tenant ID:</span>
              <span className="font-semibold text-gray-800">
                {user.tenantId || "None"}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Email Verified:</span>
              <span
                className={`font-semibold ${
                  user.emailVerified ? "text-green-600" : "text-red-600"
                }`}
              >
                {user.emailVerified ? "Yes" : "No"}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Created At:</span>
              <span className="font-semibold text-gray-800">
                {formatDate(new Date(parseInt(user.metadata.createdAt)))}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Last Login:</span>
              <span className="font-semibold text-gray-800">
                {formatDate(new Date(parseInt(user.metadata.lastLoginAt)))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
