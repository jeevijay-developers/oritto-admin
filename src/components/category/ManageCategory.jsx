"use client";
import { deleteCategoryAPI, getAllCategories } from "@/server/admin";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import React, { useEffect, useState } from "react";
import { MdEditSquare, MdAutoDelete } from "react-icons/md";
import { confirmDelete } from "@/confirm-alert/CategoryUpdate";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toast";
import Link from "next/link";

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategories(); // Change to your actual API
        console.log(res);

        setCategories(res);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const deleteCategory = async (name) => {
    try {
      const res = await deleteCategoryAPI(name);
      toast.success("Category deleted successfully");
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete category");
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 p-6 w-full">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Manage Categories
        </h2>

        {loading ? (
          <p className="text-gray-600">Loading categories...</p>
        ) : categories.length === 0 ? (
          <p className="text-gray-600">No categories found.</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="p-4 border-b">#</th>
                  <th className="p-4 border-b">Category Name</th>
                  <th className="p-4 border-b">Image</th>
                  <th className="p-4 border-b">Total Products</th>
                  <th className="p-4 border-b">Edit</th>
                  <th className="p-4 border-b">Delete</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat, index) => (
                  <tr
                    key={cat._id}
                    className="hover:bg-gray-50 transition duration-150  border-b"
                  >
                    <td className="p-4 border-b">{index + 1}</td>
                    <td className="p-4 border-b capitalize">{cat.name}</td>
                    <td className="p-4 border-b">
                      <img
                        src={cat.image?.url}
                        alt={cat.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="p-4 border-b">
                      {cat.products?.length || 0}
                    </td>
                    <td className="">
                      <Link href={`/home/category/update/${cat._id}`}>
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
                          confirmAlert(confirmDelete(cat.name, deleteCategory))
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

export default ManageCategory;
