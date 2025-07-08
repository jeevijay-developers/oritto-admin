import React from "react";
import { FaTools } from "react-icons/fa";

const UnderDevelopment = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4 w-full">
      <FaTools className="text-6xl text-yellow-500 mb-4 animate-bounce" />
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Feature Under Development
      </h1>
      <p className="text-gray-600 max-w-md">
        We're working hard to bring you this feature soon. Stay tuned for
        updates!
      </p>
    </div>
  );
};

export default UnderDevelopment;
