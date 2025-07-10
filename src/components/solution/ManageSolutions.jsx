"use client";
import React, { useEffect, useState } from "react";

import { deleteSolutionById, getAllSolutions } from "@/server/admin";
import { MdAutoDelete, MdEditSquare } from "react-icons/md";
import { confirmAlert } from "react-confirm-alert";
import { confirmDelete } from "@/confirm-alert/CategoryUpdate";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import Link from "next/link";
const ManageSolutions = () => {
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

  const deleteSolution = async (id) => {
    try {
      const res = await deleteSolutionById(id);
      toast.success("Solution deleted successfully");
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete solution");
    }
  };
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
                  <th className="p-4 border-b">Edit</th>
                  <th className="p-4 border-b">Delete</th>
                </tr>
              </thead>
              <tbody>
                {solutions.map((sol, index) => (
                  <tr
                    key={sol._id}
                    className="hover:bg-gray-50 transition duration-150 border-b"
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
                    <td className="p-4 border-b">
                      <Link href={`/home/solution/update/${sol._id}`}>
                        <MdEditSquare
                          className="text-2xl hover:cursor-pointer"
                          color="green"
                        />
                      </Link>
                    </td>
                    <td>
                      <MdAutoDelete
                        className="text-2xl hover:cursor-pointer"
                        color="red"
                        onClick={() =>
                          confirmAlert(confirmDelete(sol._id, deleteSolution))
                        }
                      />
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

export default ManageSolutions;
