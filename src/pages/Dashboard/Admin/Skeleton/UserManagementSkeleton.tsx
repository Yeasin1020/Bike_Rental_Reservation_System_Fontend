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

const UserManagementSkeleton: React.FC = () => {
  const skeletonCount = 6; // Number of skeleton cards to show

  return (
    <div className="p-6">
      {/* Header skeleton */}
      <div className="flex justify-between items-center mb-6">
        <SkeletonRect width={200} height={36} />
      </div>

      {/* Skeleton user cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(skeletonCount)].map((_, idx) => (
          <div
            key={idx}
            className="shadow-md rounded-lg p-4 border"
            aria-hidden="true"
          >
            {/* User details skeleton */}
            <div className="mb-4 space-y-2">
              <SkeletonRect width="60%" height={24} />
              <SkeletonRect width="80%" height={16} />
              <SkeletonRect width={50} height={20} className="rounded-full" />
            </div>

            {/* Buttons skeleton */}
            <div className="flex justify-between gap-2">
              <SkeletonRect width={80} height={32} className="rounded-md" />
              <SkeletonRect width={120} height={32} className="rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagementSkeleton;
