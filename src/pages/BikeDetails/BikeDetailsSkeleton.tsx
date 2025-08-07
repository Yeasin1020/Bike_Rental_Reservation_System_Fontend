const BikeDetailsSkeleton = () => {
  return (
    <div className="min-h-screen max-w-6xl mx-auto p-4 md:p-6 rounded-lg shadow-md mt-8 animate-pulse">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Image Section */}
        <div className="lg:w-1/2 w-full space-y-3">
          <div className="w-full aspect-video bg-gray-200 rounded-lg shadow-md" />
          <div className="flex gap-2 overflow-x-auto">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-24 h-16 bg-gray-200 rounded" />
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="lg:w-1/2 w-full space-y-4">
          <div className="h-7 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-full" />

          {/* Detail Grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded w-full" />
            ))}
          </div>

          {/* Rating Summary */}
          <div className="flex items-center gap-2 mt-1">
            <div className="w-4 h-4 bg-gray-200 rounded-full" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
          </div>

          {/* Features */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-24" />
            <div className="flex gap-2 flex-wrap">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-6 w-20 bg-gray-200 rounded-full" />
              ))}
            </div>
          </div>

          {/* Rent Button */}
          <div className="h-10 bg-gray-300 rounded w-full mt-4" />
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-10 space-y-4">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="border rounded-lg p-4 space-y-2 bg-white shadow animate-pulse"
          >
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-3 bg-gray-200 rounded w-full" />
            <div className="h-3 bg-gray-200 rounded w-5/6" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BikeDetailsSkeleton;
