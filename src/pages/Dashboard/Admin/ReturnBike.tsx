import React, { useState, useEffect } from "react";
import {
  useGetAllRentalsQuery,
  useReturnBikeMutation,
} from "../../../redux/api/bikeRentalApi";

interface Rentals {
  id: string;
  bikeName: string;
  userName: string;
  startTime: string;
  endTime?: string;
  cost?: number;
  status: "ongoing" | "returned";
}

const ReturnBike: React.FC = () => {
  // Fetch all rental data from the API
  const {
    data: rentalsData,
    isLoading: isLoadingRentals,
    isError: isFetchError,
    error: fetchError,
    refetch,
  } = useGetAllRentalsQuery();

  const [returnBike, { isLoading: isReturningBike, error: returnError }] =
    useReturnBikeMutation();

  const [successMessage, setSuccessMessage] = useState<string>("");

  // Log rentals data for debugging purposes
  useEffect(() => {
    if (rentalsData?.data) {
      console.log("All Rentals data:", rentalsData.data);
    }
    if (isFetchError) {
      console.error("Error fetching rentals:", fetchError);
    }
  }, [rentalsData, isFetchError, fetchError]);

  // Handle the bike return process
  const handleReturnBike = async (rentalId: string) => {
    try {
      const response = await returnBike(rentalId).unwrap();
      console.log("Bike returned successfully:", response);

      // Refetch the rentals data after a successful return
      refetch();
      setSuccessMessage("Bike returned successfully!");
    } catch (err) {
      console.error("Error returning bike:", err);
      setSuccessMessage("Failed to return bike.");
    }
  };

  // Loading state
  if (isLoadingRentals) return <div>Loading all rentals...</div>;

  // Error state
  if (isFetchError)
    return (
      <div className="text-red-600">
        Error loading rentals: {JSON.stringify(fetchError)}
      </div>
    );

  // Rentals data
  const rentals = rentalsData?.data || [];

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Return Bike
        </h1>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg shadow-md">
          {successMessage}
        </div>
      )}

      {/* Error Message for Returning */}
      {returnError && (
        <div className="mb-4 p-4 bg-red-100 text-red-800 rounded-lg shadow-md">
          Error: Unable to return the bike. Please try again.
        </div>
      )}

      {/* Rentals Table (Desktop View) */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
            <tr>
              <th className="text-left p-4">Bike</th>
              <th className="text-left p-4">User</th>
              <th className="text-left p-4">Start Time</th>
              <th className="text-left p-4">Return Time</th>
              <th className="text-center p-4">Cost</th>
              <th className="text-center p-4">Status</th>
              <th className="text-center p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rentals.map((rental: any) => (
              <tr
                key={rental._id}
                className="border-t hover:bg-gray-100 transition-all"
              >
                <td className="p-4">{rental.bikeId?.name || "Unknown"}</td>
                <td className="p-4">{rental.userId?.name || "Unknown"}</td>
                <td className="p-4">
                  {new Date(rental.startTime).toLocaleString()}
                </td>
                <td className="p-4">
                  {rental.returnTime
                    ? new Date(rental.returnTime).toLocaleString()
                    : "Not Returned"}
                </td>
                <td className="p-4 text-center">
                  {rental.totalCost ? `$${rental.totalCost}` : "-"}
                </td>
                <td className="p-4 text-center">
                  <span
                    className={`px-3 py-1 text-sm rounded-full font-medium ${
                      rental.isReturned
                        ? "bg-green-200 text-green-800"
                        : "bg-yellow-200 text-yellow-800"
                    }`}
                  >
                    {rental.isReturned ? "Returned" : "Ongoing"}
                  </span>
                </td>
                <td className="p-4 text-center">
                  {!rental.isReturned && (
                    <button
                      onClick={() => handleReturnBike(rental._id)}
                      disabled={isReturningBike}
                      className={`px-4 py-2 rounded-md transition-all ${
                        isReturningBike
                          ? "bg-gray-400 text-white cursor-not-allowed"
                          : "bg-blue-500 text-white hover:bg-blue-600"
                      }`}
                    >
                      {isReturningBike ? "Returning..." : "Return"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Rentals Cards (Mobile View) */}
      <div className="sm:hidden space-y-4">
        {rentals.map((rental: any) => (
          <div
            key={rental._id}
            className="bg-white shadow-md rounded-lg p-4 border"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-lg">
                {rental.bikeId?.name || "Unknown"}
              </h2>
              <span
                className={`px-3 py-1 text-sm rounded-full font-medium ${
                  rental.isReturned
                    ? "bg-green-200 text-green-800"
                    : "bg-yellow-200 text-yellow-800"
                }`}
              >
                {rental.isReturned ? "Returned" : "Ongoing"}
              </span>
            </div>
            <p className="text-gray-600 mb-1">
              <strong>User:</strong> {rental.userId?.name || "Unknown"}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Start Time:</strong>{" "}
              {new Date(rental.startTime).toLocaleString()}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Return Time:</strong>{" "}
              {rental.returnTime
                ? new Date(rental.returnTime).toLocaleString()
                : "Not Returned"}
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Cost:</strong>{" "}
              {rental.totalCost ? `$${rental.totalCost}` : "-"}
            </p>
            {!rental.isReturned && (
              <button
                onClick={() => handleReturnBike(rental._id)}
                disabled={isReturningBike}
                className={`w-full px-4 py-2 rounded-md transition-all ${
                  isReturningBike
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {isReturningBike ? "Returning..." : "Return"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReturnBike;
