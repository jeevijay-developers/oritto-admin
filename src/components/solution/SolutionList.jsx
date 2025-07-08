"use client";
import React, { useEffect, useState } from "react";

import { getAllSolutions } from "@/server/admin";

const SolutionList = () => {
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        const res = await getAllSolutions(); // Update endpoint if needed
        console.log("data ", res);

        setSolutions(res);
      } catch (error) {
        console.error("Error fetching solutions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSolutions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 w-full">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          All Solutions
        </h2>

        {loading ? (
          <p className="text-gray-600">Loading solutions...</p>
        ) : solutions.length === 0 ? (
          <p className="text-gray-600">No solutions found.</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="w-full border-collapse text-left">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="p-4 border-b">#</th>
                  <th className="p-4 border-b">Name</th>
                  <th className="p-4 border-b">Description</th>
                  <th className="p-4 border-b">Image</th>
                  <th className="p-4 border-b">Total Products</th>
                </tr>
              </thead>
              <tbody>
                {solutions.map((sol, index) => (
                  <tr
                    key={sol._id}
                    className="hover:bg-gray-50 transition duration-150"
                  >
                    <td className="p-4 border-b">{index + 1}</td>
                    <td className="p-4 border-b capitalize">{sol.name}</td>
                    <td className="p-4 border-b text-sm text-gray-700 max-w-sm">
                      {sol.description.length > 100
                        ? sol.description.slice(0, 100) + "..."
                        : sol.description}
                    </td>
                    <td className="p-4 border-b">
                      <img
                        src={sol.image?.url}
                        alt={sol.name}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                    </td>
                    <td className="p-4 border-b">
                      {sol.products?.length || 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SolutionList;
