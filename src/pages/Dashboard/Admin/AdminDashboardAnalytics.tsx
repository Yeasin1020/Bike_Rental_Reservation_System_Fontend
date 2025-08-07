import React from "react";
import { FaBicycle, FaCheck, FaHistory, FaUsers } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useGetBikesQuery } from "../../../redux/api/bikeApi";
import { useGetAllRentalsQuery } from "../../../redux/api/bikeRentalApi";
import { useGetUsersQuery } from "../../../redux/api/userManagementApi";
import AdminDashboardSkeleton from "./Skeleton/AdminDashboardSkeleton";

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
    <div className={`text-3xl ${color}`}>{icon}</div>
    <div>
      <p className="text-gray-500 text-sm">{label}</p>
      <h2 className="text-3xl font-semibold">{value}</h2>
    </div>
  </div>
);

const AdminDashboard: React.FC = () => {
  const { data: bikesData, isLoading: bikesLoading } = useGetBikesQuery();
  const { data: rentalsData, isLoading: rentalsLoading } =
    useGetAllRentalsQuery({});
  const { data: usersData, isLoading: usersLoading } = useGetUsersQuery();

  if (bikesLoading || rentalsLoading || usersLoading) {
    return <AdminDashboardSkeleton />;
  }

  const bikes = bikesData?.data || [];
  const rentals = rentalsData?.data || [];
  const users = usersData?.data || [];

  const runningCount = rentals.filter(
    (r: { isReturned: boolean }) => !r.isReturned
  ).length;
  const returnedCount = rentals.filter(
    (r: { isReturned: boolean }) => r.isReturned
  ).length;

  const chartData = [
    { name: "Total Bikes", value: bikes.length },
    { name: "Currently Rented", value: runningCount },
    { name: "Returned Bikes", value: returnedCount },
    { name: "Total Users", value: users.length },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Item
          icon={<FaBicycle />}
          label="Total Bikes"
          value={bikes.length}
          color="text-blue-600"
        />
        <Item
          icon={<FaCheck />}
          label="Bikes Currently Rented"
          value={runningCount}
          color="text-yellow-600"
        />
        <Item
          icon={<FaHistory />}
          label="Bikes Returned"
          value={returnedCount}
          color="text-green-600"
        />
        <Item
          icon={<FaUsers />}
          label="Total Users"
          value={users.length}
          color="text-purple-600"
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-5 text-gray-800">
          📊 Summary Chart
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;
