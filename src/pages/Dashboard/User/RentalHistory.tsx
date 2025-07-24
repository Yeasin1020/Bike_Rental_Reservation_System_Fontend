import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useGetRentalsQuery } from "../../../redux/api/bikeRentalApi";
import { MdAccessTime, MdLocationOn } from "react-icons/md";
import { BsCurrencyDollar } from "react-icons/bs";
import Loading from "../../../components/ui/Loading";

interface Rental {
  _id: string;
  startTime: string;
  returnTime: string | null;
  isReturned: boolean;
  calculatedCost: number;
  durationHours: string;
  bikeDetails: {
    name: string;
    model: string;
    brand: string;
    image: string;
    pricePerHour: number;
  };
  bikeId: {
    location: {
      city: string;
      area: string;
    };
  };
}

const RentalHistory: React.FC = () => {
  const { data, error, isLoading } = useGetRentalsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [now, setNow] = useState(new Date());

  // Update `now` every second for live countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) return <Loading></Loading>;

  if (error)
    return (
      <div className="text-center py-10 text-red-600">
        Failed to load rental history.
      </div>
    );

  const rentals: Rental[] = data?.data || [];

  if (rentals.length === 0)
    return (
      <div className="text-center py-10 text-gray-600">
        No rental history found.
      </div>
    );

  const formatLiveDuration = (start: Date, end: Date) => {
    const ms = end.getTime() - start.getTime();
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
        Rental History
      </h1>
      <div className="space-y-6">
        {rentals.map((rental) => {
          const start = new Date(rental.startTime);
          const end = rental.returnTime ? new Date(rental.returnTime) : now;
          const elapsedMs = end.getTime() - start.getTime();
          const elapsedHours = elapsedMs / (1000 * 60 * 60);
          const liveCost = Math.round(
            elapsedHours * rental.bikeDetails.pricePerHour
          );
          const durationString = rental.isReturned
            ? rental.durationHours + " hrs"
            : formatLiveDuration(start, now);

          return (
            <div
              key={rental._id}
              className="flex flex-col sm:flex-row gap-4 bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
            >
              {/* Bike Image */}
              <img
                src={rental.bikeDetails?.image}
                alt={rental.bikeDetails?.name}
                className="w-full sm:w-48 h-48 object-cover"
              />

              {/* Content */}
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                    {rental.bikeDetails?.brand} {rental.bikeDetails?.model}
                  </h2>
                  <p className="text-sm text-gray-500 mb-2">
                    <MdLocationOn className="inline-block mr-1 text-blue-500" />
                    {rental.bikeId?.location?.area},{" "}
                    {rental.bikeId?.location?.city}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                    <p>
                      <MdAccessTime className="inline-block mr-1 text-indigo-500" />
                      Started: {format(new Date(rental.startTime), "PPPpp")}
                    </p>
                    <p>
                      <MdAccessTime className="inline-block mr-1 text-indigo-500" />
                      Returned:{" "}
                      {rental.returnTime
                        ? format(new Date(rental.returnTime), "PPPpp")
                        : "Not returned yet"}
                    </p>
                    <p>⏳ Duration: {durationString}</p>
                    <p>
                      <BsCurrencyDollar className="inline-block mr-1 text-green-600" />
                      Hourly Rate: ৳{rental.bikeDetails?.pricePerHour}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <span
                    className={`text-sm px-3 py-1 rounded-full font-medium ${
                      rental.isReturned
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {rental.isReturned ? "Returned" : "Ongoing"}
                  </span>
                  <span className="text-xl font-bold text-gray-800">
                    ৳
                    {rental.isReturned
                      ? rental.calculatedCost.toLocaleString()
                      : liveCost.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RentalHistory;
