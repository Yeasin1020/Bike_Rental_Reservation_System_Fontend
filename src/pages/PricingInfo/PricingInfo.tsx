/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect, useState } from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { MdAccessTime } from "react-icons/md";
import { TbCalculator } from "react-icons/tb";

const PricingInfo = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [hourlyRate, setHourlyRate] = useState(100);
  const [hours, setHours] = useState(1);

  const estimatedCost = hourlyRate * hours;

  return (
    <div className="min-h-screen">
      <section className="max-w-3xl mx-auto my-10  px-4 py-10 bg-white rounded-xl shadow-md border border-gray-200">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <TbCalculator className="text-blue-600 text-3xl" />
          Rental Pricing Estimator
        </h2>

        {/* Description */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          Easily calculate your rental cost by entering your hourly rate and
          desired rental duration. This helps you plan ahead with a clear
          understanding of your expenses.
        </p>

        {/* Form Section */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {/* Hourly Rate */}
          <div className="flex flex-col">
            <label
              htmlFor="rate"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Your Hourly Rate (৳)
            </label>
            <div className="flex items-center border rounded-md shadow-sm px-3 py-2 bg-white">
              <BsCurrencyDollar className="text-green-600 mr-2" />
              <input
                id="rate"
                type="number"
                min={1}
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full focus:outline-none text-gray-700"
              />
            </div>
          </div>

          {/* Hours */}
          <div className="flex flex-col">
            <label
              htmlFor="hours"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Number of Hours
            </label>
            <div className="flex items-center border rounded-md shadow-sm px-3 py-2 bg-white">
              <MdAccessTime className="text-indigo-600 mr-2" />
              <input
                id="hours"
                type="number"
                min={1}
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="w-full focus:outline-none text-gray-700"
              />
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 text-gray-700 text-base space-y-2">
          <p>
            <span className="font-medium text-gray-800">Hourly Rate:</span> ৳
            {hourlyRate}
          </p>
          <p>
            <span className="font-medium text-gray-800">Total Time:</span>{" "}
            {hours} hour(s)
          </p>
          <p className="text-xl font-semibold text-blue-700">
            Estimated Total: ৳{estimatedCost.toLocaleString()}
          </p>
        </div>

        <p className="text-sm text-gray-500 mt-4 italic">
          * This is an estimated cost. Actual pricing may vary depending on bike
          type, demand, and other conditions.
        </p>
      </section>
    </div>
  );
};

export default PricingInfo;
