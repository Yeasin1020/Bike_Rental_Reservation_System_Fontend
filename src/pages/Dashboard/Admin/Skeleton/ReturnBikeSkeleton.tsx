import React from "react";

const SkeletonRect = ({
  width = "100%",
  height = 16,
  className = "",
}: {
  width?: string | number;
  height?: number;
  className?: string;
}) => (
  <div
    className={`bg-gray-300 rounded animate-pulse ${className}`}
    style={{ width, height }}
  />
);

const ReturnBikeSkeleton: React.FC = () => {
  const skeletonRows = 4;

  return (
    <div className="p-4 sm:p-6 min-h-screen">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center mb-6">
        <SkeletonRect width={180} height={32} />
      </div>

      {/* Desktop Table Skeleton */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full shadow-md rounded-lg">
          <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
            <tr>
              {[
                "Bike",
                "User",
                "Start Time",
                "Return Time",
                "Cost",
                "Status",
                "Actions",
              ].map((title) => (
                <th key={title} className="text-left p-4">
                  <SkeletonRect width={80} height={20} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(skeletonRows)].map((_, i) => (
              <tr key={i} className="border-t">
                {/* Bike Name */}
                <td className="p-4">
                  <SkeletonRect width={100} height={16} />
                </td>
                {/* User Name */}
                <td className="p-4">
                  <SkeletonRect width={120} height={16} />
                </td>
                {/* Start Time */}
                <td className="p-4">
                  <SkeletonRect width={140} height={16} />
                </td>
                {/* Return Time */}
                <td className="p-4">
                  <SkeletonRect width={140} height={16} />
                </td>
                {/* Cost */}
                <td className="p-4 text-center">
                  <SkeletonRect width={60} height={16} className="mx-auto" />
                </td>
                {/* Status Badge */}
                <td className="p-4 text-center">
                  <SkeletonRect
                    width={80}
                    height={24}
                    className="rounded-full mx-auto"
                  />
                </td>
                {/* Actions Button */}
                <td className="p-4 text-center">
                  <SkeletonRect
                    width={80}
                    height={32}
                    className="rounded-md mx-auto"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards Skeleton */}
      <div className="sm:hidden space-y-4">
        {[...Array(skeletonRows)].map((_, i) => (
          <div key={i} className="bg-white shadow-md rounded-lg p-4 border">
            <div className="flex items-center justify-between mb-3">
              <SkeletonRect width={120} height={24} />
              <SkeletonRect width={80} height={24} className="rounded-full" />
            </div>
            <div className="space-y-2">
              <SkeletonRect width="70%" height={16} />
              <SkeletonRect width="60%" height={16} />
              <SkeletonRect width="70%" height={16} />
              <SkeletonRect width="40%" height={16} />
            </div>
            <div className="mt-4">
              <SkeletonRect width="100%" height={36} className="rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReturnBikeSkeleton;
