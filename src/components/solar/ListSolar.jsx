"use client";
import React from "react";
const ListSolar = ({ solars }) => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          All Solar Items
        </h1>
      </div>

      {solars.length === 0 ? (
        <div className="text-center text-gray-500">No solar items found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solars.map((solar) => (
            <div
              key={solar._id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200 relative"
            >
              {solar.image?.url && (
                <img
                  src={solar.image.url}
                  alt={solar.name}
                  className="w-full h-48 object-cover rounded mb-4"
                />
              )}
              <h2 className="text-lg font-bold text-gray-700 mb-2 capitalize">
                {solar.name}
              </h2>
              <p className="text-gray-600 text-sm mb-4">{solar.description}</p>

              {solar.products?.length > 0 && (
                <div className="text-sm text-gray-700">
                  <strong>Total Products:</strong>
                  <span> {solar.products?.length ?? 0}</span>
                  {/* <ul className="list-disc list-inside mt-1">
                    {solar.products.map((prodId) => (
                      <li key={prodId}>{prodId}</li>
                    ))}
                  </ul> */}
                </div>
              )}
              {/* <div className="absolute top-2 right-2 flex flex-row gap-3">
                <Link
                  href={`/home/solar/edit-solar/${solar._id}`}
                  className="text-blue-600 hover:underline mr-2 border-2 border-green-500  py-1 px-2 rounded-lg flex items-center hover:bg-green-300 justify-center"
                >
                  <FaEdit className="text-xl" color="green" /> <p>Edit</p>
                </Link>
                <button className="text-blue-600 hover:underline mr-2  border-2 border-red-500  py-1 px-2 rounded-lg flex items-center hover:bg-red-300 justify-center">
                  <MdDelete className="text-xl" color="red" /> <p>Delete</p>
                </button>
              </div> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListSolar;
