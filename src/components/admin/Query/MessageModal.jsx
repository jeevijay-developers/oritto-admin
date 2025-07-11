// app/(admin)/components/MessageModal.jsx
"use client";
import React from "react";

const MessageModal = ({ message,selectedProduct, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Details</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {/* view products */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700 mb-2">Products:</h3>
          <div className="p-3 bg-gray-100 rounded-lg border">
            {selectedProduct.map((item, index) => (
              <p key={index}>{item.productName}</p>
            ))}
          </div>
        </div>
        <h3 className="font-semibold text-gray-700 mt-2">Message:</h3>
        <div className="bg-gray-100 border rounded-md p-4 overflow-y-auto flex-grow">
          <p className="whitespace-pre-wrap break-words">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
