import React from "react";

const loading = () => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default loading;
