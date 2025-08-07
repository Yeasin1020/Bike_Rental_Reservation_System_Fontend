import React, { useEffect, useState } from "react";
import {
  FaBicycle,
  FaHistory,
  FaStar,
  FaCheck,
  FaMoneyBillWave,
  FaClock,
  FaBalanceScale,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import toast from "react-hot-toast";
import { useAppSelector } from "../../../redux/hooks";
import { useGetRentalsQuery } from "../../../redux/api/bikeRentalApi";

const Item = ({
  icon,
  label,
  value,
  color,
}: {
  icon: JSX.Element;
  label: string;
  value: number | string;
  color: string;
}) => (
  <div className="flex items-center p-5 border rounded-lg shadow bg-white gap-4">
    <div className={`text-2xl ${color}`}>{icon}</div>
    <div>
      <p className="text-gray-500 text-sm">{label}</p>
      <h2 className="text-xl font-semibold">{value}</h2>
    </div>
  </div>
);

const UserDashboardAnalytics: React.FC = () => {
  const { token, user } = useAppSelector((state) => state.auth);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [reviews, setReviews] = useState<any[]>([]);

  const {
    data,
    isLoading: loadingRentals,
    error: rentalsError,
  } = useGetRentalsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (!token) return;

    const fetchMyReviews = async () => {
      try {
        const res = await fetch(
          "https://bike-rental-reservation-system-backend-gamma.vercel.app/api/reviews/my-reviews",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        if (data?.success) {
          setReviews(data.data || []);
        } else {
          toast.error("Failed to fetch reviews");
        }
      } catch (err) {
        toast.error("Error fetching reviews");
      }
    };

    fetchMyReviews();
  }, [token]);

  if (!token) {
    return (
      <p>Please login to view your dashboard analytics. (No token found)</p>
    );
  }
  if (!user || !user.email) {
    return (
      <div>
        <p>
          Please login to view your dashboard analytics. (User info missing)
        </p>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    );
  }

  if (loadingRentals) return <p>Loading analytics...</p>;
  if (rentalsError)
    return <p className="text-red-600">Failed to load rental data.</p>;

  // Safely extract rentals array
  const rentals = data?.data || [];
  console.log("Rentals:", rentals);

  // Adjust this to your user object structure

  const userBookings = rentals;

  const totalBookings = userBookings.length;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const activeBookings = userBookings.filter((b: any) => !b.isReturned).length;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pastBookings = userBookings.filter((b: any) => b.isReturned).length;

  console.log(pastBookings, activeBookings, totalBookings, userBookings);

  const totalReviews = reviews.length;

  const totalSpent = userBookings.reduce(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (sum: number, b: any) => sum + (b.totalCost || 0),
    0
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const totalHours = userBookings.reduce((sum: number, booking: any) => {
    const start = new Date(booking.startTime).getTime();
    const end = booking.returnTime
      ? new Date(booking.returnTime).getTime()
      : Date.now();

    const hours = (end - start) / (1000 * 60 * 60);
    return sum + (isNaN(hours) ? 0 : hours);
  }, 0);

  const avgCostPerHour =
    totalHours > 0 ? (totalSpent / totalHours).toFixed(2) : "0.00";

  const chartData = [
    { name: "Total", value: totalBookings },
    { name: "Active", value: activeBookings },
    { name: "Past", value: pastBookings },
    { name: "Reviews", value: totalReviews },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        📊 Dashboard Overview
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <Item
          icon={<FaBicycle />}
          label="Total Bookings"
          value={totalBookings}
          color="text-blue-600"
        />
        <Item
          icon={<FaCheck />}
          label="Active Bookings"
          value={activeBookings}
          color="text-green-600"
        />
        <Item
          icon={<FaHistory />}
          label="Past Bookings"
          value={pastBookings}
          color="text-gray-600"
        />
        <Item
          icon={<FaStar />}
          label="Total Reviews"
          value={totalReviews}
          color="text-yellow-500"
        />
        <Item
          icon={<FaMoneyBillWave />}
          label="Total Spent"
          value={`$${totalSpent.toFixed(2)}`}
          color="text-pink-500"
        />
        <Item
          icon={<FaClock />}
          label="Total Hours Rented"
          value={totalHours.toFixed(2)}
          color="text-orange-500"
        />
        <Item
          icon={<FaBalanceScale />}
          label="Avg. Cost/Hour"
          value={`$${avgCostPerHour}`}
          color="text-indigo-500"
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          📈 Booking & Review Summary
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserDashboardAnalytics;
