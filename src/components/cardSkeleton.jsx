import React from "react";

const LoanCardSkeleton = () => {
  return (
    <div className="card bg-base-200 shadow-sm animate-pulse">
      {/* Image Skeleton */}
      <figure>
        <div className="h-[200px] w-full bg-gray-300"></div>
      </figure>

      {/* Card Body Skeleton */}
      <div className="card-body space-y-1">
        {/* Title and Badge Skeleton */}
        <div className="card-title flex justify-between items-center">
          <div className="h-7 bg-gray-300 rounded w-2/3"></div>
          <div className="h-6 bg-gray-300 rounded-full w-20"></div>
        </div>

        {/* Description Skeleton */}
        <div className="h-5 bg-gray-300 rounded w-full mt-2"></div>

        {/* Badges Skeleton */}
        <div className="card-actions justify-between mt-4">
          <div className="h-7 bg-gray-300 rounded-full w-24"></div>
          <div className="h-7 bg-gray-300 rounded-full w-20"></div>
        </div>

        {/* Button Skeleton */}
        <div className="h-12 bg-gray-300 rounded-lg w-full mt-2"></div>
      </div>
    </div>
  );
};

export default LoanCardSkeleton;
