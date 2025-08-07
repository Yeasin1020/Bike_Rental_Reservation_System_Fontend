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

const BikeManagementSkeleton: React.FC = () => {
  // Number of bike cards to show as skeletons
  const skeletonCount = 6;

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <SkeletonRect width={180} height={36} />
        <SkeletonRect width={120} height={40} className="rounded-md" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(skeletonCount)].map((_, idx) => (
          <div
            key={idx}
            className="p-4 shadow-md rounded-lg flex flex-col justify-between"
          >
            <div className="space-y-2">
              <SkeletonRect width="70%" height={24} className="mb-2" />
              <SkeletonRect width="90%" height={16} />
              <SkeletonRect width="40%" height={18} className="mt-1" />
              <SkeletonRect width="50%" height={16} />
              <SkeletonRect width="30%" height={16} />
              <SkeletonRect width="40%" height={16} />
              <SkeletonRect width="35%" height={16} />
            </div>

            <div className="mt-4 flex justify-between">
              <SkeletonRect width={60} height={32} className="rounded-md" />
              <SkeletonRect width={60} height={32} className="rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BikeManagementSkeleton;
