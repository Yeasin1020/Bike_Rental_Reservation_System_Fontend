import React from "react";

const RentalCardSkeleton: React.FC = () => {
  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 animate-pulse">
        <div className="w-full sm:w-48 h-48 bg-gray-300" />

        <div className="flex-1 p-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="h-5 bg-gray-300 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded" />
            </div>

            <div className="h-8 bg-gray-200 rounded w-32 mt-3" />
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="h-6 bg-gray-200 rounded w-24" />
            <div className="h-6 bg-gray-300 rounded w-16" />
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 animate-pulse">
        <div className="w-full sm:w-48 h-48 bg-gray-300" />

        <div className="flex-1 p-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="h-5 bg-gray-300 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded" />
            </div>

            <div className="h-8 bg-gray-200 rounded w-32 mt-3" />
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="h-6 bg-gray-200 rounded w-24" />
            <div className="h-6 bg-gray-300 rounded w-16" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalCardSkeleton;
