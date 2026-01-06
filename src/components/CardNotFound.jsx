import React from "react";
import { FaBookOpen, FaSearch } from "react-icons/fa";

const CardNotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px] w-full">
      <div className="text-center p-8 max-w-md">
        {/* Animated Icon */}
        <div className="relative inline-block mb-6">
          <div className="w-32 h-32 rounded-full flex items-center justify-center animate-bounce bg-secondary/20"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full flex items-center justify-center bg-secondary">
              <FaBookOpen className="text-5xl text-white" />
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-lg">
            <FaSearch className="text-2xl text-primary" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-3xl font-bold mb-3 text-primary">No Loans Found</h3>

        {/* Description */}
        <p className="text-gray-600 text-lg mb-6">
          We couldn't find any Loans matching your search. Try adjusting your
          filters or explore our collection.
        </p>

        {/* Decorative Elements */}
        <div className="mt-8 flex justify-center gap-2">
          <div className="w-2 h-2 rounded-full animate-pulse bg-secondary"></div>
          <div className="w-2 h-2 rounded-full animate-pulse delay-75 bg-primary"></div>
          <div className="w-2 h-2 rounded-full animate-pulse delay-150 bg-secondary"></div>
        </div>
      </div>
    </div>
  );
};

export default CardNotFound;
