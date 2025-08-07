import React from "react";

const BikeCardSkeleton: React.FC<{ count?: number }> = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse border rounded-xl shadow overflow-hidden bg-white flex flex-col"
        >
          <div className="w-full h-48 bg-gray-200" />

          <div className="p-4 flex flex-col flex-grow space-y-2">
            <div className="h-4 bg-gray-300 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-2/3" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
            <div className="h-3 bg-gray-200 rounded w-2/5" />

            <div className="mt-auto space-y-2 pt-3">
              <div className="h-4 bg-gray-300 rounded w-1/3" />
              <div className="h-8 bg-gray-300 rounded w-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BikeCardSkeleton;
