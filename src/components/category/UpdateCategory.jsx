"use client";
import { updateCategoryById } from "@/server/admin";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toast";

const UpdateCategory = ({ category }) => {
  const [form, setForm] = useState({
    name: category?.name || "",
    image: null,
  });

  const [preview, setPreview] = useState(category?.image?.url || "");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setForm((prev) => ({ ...prev, image: file }));
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name) {
      return toast.error("Category name is required");
    }

    const formData = new FormData();
    formData.append("name", form.name.toLowerCase().trim());
    if (form.image) {
      formData.append("image", form.image);
    }

    try {
      const res = await updateCategoryById(category._id, formData);

      toast.success("Category updated successfully");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="w-full">
      <div className="text-xl flex flex-row gap-2">
        <div>
          <Link className="hover:text-blue-900" href={"/home"}>
            Home
          </Link>
        </div>
        /
        <div>
          <Link
            className="hover:text-blue-900"
            href={"/home/category/list-category"}
          >
            Categories
          </Link>
        </div>
      </div>

      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Update Category
        </h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-1">
              Category Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter category name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-1">
              Category Image
            </label>
            {preview && (
              <img
                src={preview}
                alt="preview"
                className="w-24 h-24 object-cover rounded mb-2"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Update Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategory;
