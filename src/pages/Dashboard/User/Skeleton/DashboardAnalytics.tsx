import React from "react";

const SkeletonItem = () => (
  <div className="flex items-center p-5 border rounded-lg shadow bg-gray-200 gap-4 animate-pulse">
    <div className="w-10 h-10 bg-gray-300 rounded"></div>
    <div className="flex-1 space-y-2 py-1">
      <div className="h-4 bg-gray-300 rounded w-24"></div>
      <div className="h-6 bg-gray-300 rounded w-12"></div>
    </div>
  </div>
);

const DashboardAnalyticsSkeleton: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 animate-pulse bg-gray-200 rounded w-48 h-8"></h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {[...Array(7)].map((_, i) => (
          <SkeletonItem key={i} />
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow animate-pulse h-[300px]"></div>
    </div>
  );
};

export default DashboardAnalyticsSkeleton;
