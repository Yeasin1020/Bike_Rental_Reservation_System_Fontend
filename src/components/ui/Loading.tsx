import React from "react";
import { FaSpinner } from "react-icons/fa";

const Loading: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-gray-600 animate-fade-in">
      <FaSpinner className="animate-spin text-4xl text-indigo-500 mb-4" />
      <p className="text-lg font-medium">Loading, please wait...</p>
    </div>
  );
};

export default Loading;
