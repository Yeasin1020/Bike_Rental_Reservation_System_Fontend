import React from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars

const SkeletonRect = ({
  width = "100%",
  height = 16,
}: {
  width?: string | number;
  height?: number;
}) => (
  <div
    className="bg-gray-300 rounded animate-pulse"
    style={{ width, height }}
  />
);

const ProfileSkeleton: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="shadow-xl rounded-xl p-8">
        <div className="h-12 w-64 bg-gray-300 rounded mb-8 animate-pulse mx-auto"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Picture Skeleton */}
          <div className="flex flex-col items-center">
            <div className="w-36 h-36 rounded-full bg-gray-300 border-4 border-white shadow-lg animate-pulse" />
          </div>

          {/* Profile Info Skeleton */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* 5 fields */}
            {[...Array(5)].map((_, idx) => (
              <div key={idx} className="space-y-2">
                <SkeletonRect width={100} height={14} />
                <SkeletonRect width="90%" height={24} />
              </div>
            ))}
          </div>
        </div>

        {/* Buttons Skeleton */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-10 gap-4">
          <SkeletonRect width={120} height={40} />
          <SkeletonRect width={120} height={40} />
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
