"use client";
import { createNewCategory } from "@/server/admin";
import React, { useState } from "react";
import { toast } from "react-toast";

const CategoryForm = () => {
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !imageFile) {
      alert("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("categoryName", name.toLowerCase());
    formData.append("image", imageFile);

    try {
      // Replace with your actual endpoint
      const res = await createNewCategory(formData);

      toast.success("Category created successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setName("");
      setImageFile(null);
      setImagePreview("");
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error(
        error.response?.data?.message || "Failed to create category",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 w-full">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-xl shadow-lg rounded-xl p-6 space-y-6"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-semibold text-gray-800">
          Create New Category
        </h2>

        {/* Category Name */}
        <div>
          <label className="block text-gray-700 mb-1" htmlFor="name">
            Category Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="e.g., electronics"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-700 mb-1" htmlFor="image">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full text-sm"
            required
          />
          {imagePreview && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-1">Preview:</p>
              <img
                src={imagePreview}
                alt="Preview"
                className="w-40 h-40 object-cover rounded-lg border"
              />
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Create Category
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
