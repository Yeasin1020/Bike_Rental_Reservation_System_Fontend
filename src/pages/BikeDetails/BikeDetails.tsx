import { useParams } from "react-router-dom";
import { useGetBikeByIdQuery } from "../../redux/api/bikeApi";
import { Bike, Review } from "../../utils/type/bike";
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

  // New state to control pending confirmation
  const [pendingRental, setPendingRental] = useState<boolean>(false);

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

  // ⭐ Calculate rating breakdown counts
  const ratingCounts = [0, 0, 0, 0, 0];
  (bike.reviews ?? []).forEach((review: Review) => {
    const r = Math.round(review.rating);
    if (r >= 1 && r <= 5) {
      ratingCounts[r - 1]++;
    }
  });

  // This will be called when user confirms rental inside the modal/toast
  const confirmRent = async () => {
    if (!bike._id) return;
    setRenting(true);
    toast.dismiss(); // close the confirm toast
    try {
      const startTime = new Date().toISOString();
      await createRental({ bikeId: bike._id, startTime }).unwrap();

      toast.success("Rental created successfully!");

      // Refetch bike data to update availability and button state
      await refetch();

      setPendingRental(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to rent bike.");
    } finally {
      setRenting(false);
    }
  };

  // When user clicks "Rent Now" button
  const handleRentClick = () => {
    setPendingRental(true);
    toast(
      (t) => (
        <div
          className="p-4 bg-white rounded shadow-lg max-w-sm mx-auto text-center"
          style={{ minWidth: "280px" }}
        >
          <h4 className="font-semibold mb-2">Confirm Rental</h4>
          <p className="mb-2">
            Rent <span className="font-bold">{bike.name}</span> for{" "}
            <span className="font-bold">{bike.pricePerHour} Tk/hr</span>?
          </p>

          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                setPendingRental(false);
              }}
              disabled={renting || isRenting}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={confirmRent}
              disabled={renting || isRenting}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >
              {renting ? "Processing..." : "Confirm"}
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
      }
    );
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
              onClick={handleRentClick}
              disabled={renting || isRenting || pendingRental}
              className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition duration-200 disabled:opacity-50"
            >
              {renting ? "Processing..." : "Rent Now"}
            </button>
          )}
        </div>
      </div>

      {/* ⭐ Rating Breakdown */}
      {(bike.reviews?.length ?? 0) > 0 && (
        <div className="mt-10 flex justify-center">
          <div className="w-full max-w-md">
            <h3 className="text-xl font-semibold mb-2 text-center">
              Rating Breakdown
            </h3>
            <div className="space-y-1 text-sm text-gray-700">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-2">
                  <span className="w-10">{star} ★</span>
                  <div className="h-2 bg-gray-200 rounded w-full">
                    <div
                      className="h-full bg-yellow-400 rounded"
                      style={{
                        width: `${
                          (ratingCounts[star - 1] /
                            (bike.reviews?.length ?? 1)) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                  <span>({ratingCounts[star - 1]})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 🔍 Review List */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Customer Reviews</h3>
        {bike.reviews?.length ? (
          bike.reviews.map((review) => (
            <ReviewCard key={review._id} review={review} refetch={refetch} />
          ))
        ) : (
          <p>No reviews yet</p>
        )}
      </div>

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
