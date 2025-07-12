"use client";
import React from "react";

const error = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <p className="text-xl text-gray-800 mb-2">Something went wrong</p>
        <a
          href="/"
          className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Go Home
        </a>
      </div>
    </div>
  );
};

export default error;
