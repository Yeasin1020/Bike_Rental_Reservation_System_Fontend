import React from "react";

const SkeletonCard = () => (
  <div className="flex items-center p-5 border rounded-lg shadow bg-gray-100 gap-4 animate-pulse">
    <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
    <div className="flex-1 space-y-2 py-1">
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="h-8 bg-gray-300 rounded w-1/2"></div>
    </div>
  </div>
);

const SkeletonChart = () => (
  <div className="bg-white p-6 rounded-lg shadow animate-pulse">
    <div className="h-8 bg-gray-300 rounded w-48 mb-5"></div>
    <div className="h-72 bg-gray-300 rounded"></div>
  </div>
);

const AdminDashboardSkeleton: React.FC = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="h-10 bg-gray-300 rounded w-64 animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>

      <SkeletonChart />
    </div>
  );
};

export default AdminDashboardSkeleton;
