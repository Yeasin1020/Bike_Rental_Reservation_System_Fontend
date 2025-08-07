import { useParams } from "react-router-dom";
import { useGetBikeByIdQuery } from "../../redux/api/bikeApi";
import { Bike } from "../../utils/type/bike";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useCreateRentalMutation } from "../../redux/api/bikeRentalApi";
import { ReviewCard } from "../../components/ReviewCard";
import BikeDetailsSkeleton from "./BikeDetailsSkeleton";

const BikeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, refetch } = useGetBikeByIdQuery(id ?? "");
  const [createRental, { isLoading: isRenting }] = useCreateRentalMutation();
  const [renting, setRenting] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (isLoading) return <BikeDetailsSkeleton></BikeDetailsSkeleton>;

  if (isError || !data?.data)
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load bike details.
      </div>
    );

  const bike: Bike = data.data;

  const handleRent = async () => {
    if (!bike._id) return;
    setRenting(true);
    try {
      const startTime = new Date().toISOString();
      await createRental({ bikeId: bike._id, startTime }).unwrap();
      toast.success("Rental created successfully!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to rent bike.");
    } finally {
      setRenting(false);
    }
  };

  return (
    <div className="min-h-screen max-w-6xl mx-auto p-4 md:p-6 rounded-lg shadow-md mt-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Image Section */}
        <div className="lg:w-1/2 w-full">
          <div className="w-full aspect-video rounded-lg overflow-hidden shadow-md">
            <img
              src={bike.imageUrls?.[0]}
              alt={bike.name}
              className="w-full h-full object-cover"
            />
          </div>

          {bike.imageUrls?.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {bike.imageUrls.slice(1).map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`Image ${i + 2}`}
                  className="w-24 h-16 object-cover rounded border"
                />
              ))}
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="lg:w-1/2 w-full space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            {bike.name}
          </h2>
          <p className="text-gray-600 text-sm">{bike.description}</p>

          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            <Detail label="Price/hr" value={`${bike.pricePerHour} Tk`} />
            <Detail label="Available" value={bike.isAvailable ? "Yes" : "No"} />
            <Detail label="Brand" value={bike.brand} />
            <Detail label="Model" value={bike.model} />
            <Detail label="Year" value={bike.year} />
            <Detail label="Engine CC" value={bike.cc || "N/A"} />
            <Detail label="Fuel Type" value={bike.fuelType} />
            <Detail label="Color" value={bike.color || "N/A"} />
            <Detail label="Transmission" value={bike.transmission} />
            <Detail label="Top Speed" value={`${bike.topSpeed} km/h`} />
            <Detail label="Mileage" value={`${bike.mileage} km`} />
            <Detail
              label="Location"
              value={`${bike.location?.area}, ${bike.location?.city}`}
            />
          </div>

          {/* Rating Summary */}
          <div className="flex items-center gap-2 text-sm mt-1">
            <span className="text-yellow-500 text-base">★</span>
            <span className="text-gray-700">
              {bike.averageRating} / 5.0 ({bike.totalRatings} reviews)
            </span>
          </div>

          {/* Features */}
          {bike.features?.length > 0 && (
            <div>
              <h3 className="font-semibold mb-1">Features</h3>
              <div className="flex flex-wrap gap-2">
                {bike.features.map((feature, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Rent Button */}
          {bike.isAvailable && (
            <button
              onClick={handleRent}
              disabled={renting || isRenting}
              className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition duration-200 disabled:opacity-50"
            >
              {renting ? "Processing..." : "Rent Now"}
            </button>
          )}
        </div>
      </div>

      {bike.reviews?.length ? (
        bike.reviews.map((review) => (
          <ReviewCard key={review._id} review={review} refetch={refetch} />
        ))
      ) : (
        <p>No reviews yet</p>
      )}
      <Toaster />
    </div>
  );
};

export default BikeDetails;

// Utility Detail component
const Detail = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <p>
    <span className="font-medium">{label}:</span> {value}
  </p>
);
