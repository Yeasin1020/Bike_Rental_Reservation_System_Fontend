const BikeCardSkeleton = () => {
  return (
    <div className="border rounded-xl shadow hover:shadow-lg transition-all duration-200 overflow-hidden bg-white flex flex-col animate-pulse">
      {/* Image Placeholder */}
      <div className="w-full h-48 bg-gray-200" />

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow space-y-2">
        {/* Title */}
        <div className="h-5 bg-gray-200 rounded w-3/4" />

        {/* Brand • Model • CC */}
        <div className="h-4 bg-gray-200 rounded w-1/2" />

        {/* Rating */}
        <div className="h-4 bg-gray-200 rounded w-2/3" />

        {/* Location */}
        <div className="h-4 bg-gray-200 rounded w-1/3" />

        {/* Price */}
        <div className="h-5 bg-gray-200 rounded w-1/2 mt-3" />

        {/* Availability */}
        <div className="h-4 bg-gray-200 rounded w-1/3" />

        {/* View Details Button */}
        <div className="h-9 bg-gray-300 rounded w-full mt-4" />
      </div>
    </div>
  );
};

export default BikeCardSkeleton;
