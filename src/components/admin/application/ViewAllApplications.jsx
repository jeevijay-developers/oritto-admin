"use client";
import { getAllApplications } from "../../../server/admin";
import React, { useEffect, useState } from "react";

const ViewAllApplications = () => {
  const [application, setApplication] = useState([]);

  useEffect(() => {
    getAllApplications()
      .then((data) => {
        setApplication(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleUpdate = (id) => {
    console.log("Update category with ID:", id);
    // You can redirect or open a modal here
  };
  if (application && application.length === 0)
    return (
      <div className="flex justify-center items-center h-screen">
        No applications found
      </div>
    );
  return (
    <div>
      <div className="overflow-x-auto p-4">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">S.N.</th>
              <th className="border border-gray-300 px-4 py-2">Image</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">
                Product Count
              </th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {application.map((item, index) => (
              <tr key={item._id}>
                <td className="border border-gray-300 px-4 py-2">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <img
                    src={item.image?.url}
                    alt={item.name}
                    className="h-16 w-16 object-cover rounded"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.products?.length || 0}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleUpdate(item._id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAllApplications;
