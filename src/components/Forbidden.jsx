import React from "react";
import { MdBlock } from "react-icons/md";
import { Link } from "react-router";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="max-w-lg w-full bg-slate-800/70 backdrop-blur-xl rounded-2xl shadow-2xl p-8 text-center border border-slate-700">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-red-500/10 text-red-500">
            <MdBlock size={64} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-white mb-4">
          403 – Access Denied
        </h1>

        {/* Message */}
        <p className="text-slate-300 mb-8 leading-relaxed">
          You are not authorized to view this page. Please make sure you have
          the required permissions or log in with the correct account.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
