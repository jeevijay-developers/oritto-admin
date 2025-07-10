"use client";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toast";
import { updateSolutionById } from "../../server/admin";

const UpdateSolution = ({ solution }) => {
  const [form, setForm] = useState({
    name: solution?.name || "",
    description: solution?.description || "",
    image: null,
  });

  const [preview, setPreview] = useState(solution?.image?.url || "");

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

    if (!form.name || !form.description) {
      return toast.error("Name and Description are required");
    }

    const formData = new FormData();
    formData.append("name", form.name.toLowerCase().trim());
    formData.append("description", form.description.trim());

    if (form.image) {
      formData.append("image", form.image);
    }

    try {
      await updateSolutionById(solution._id, formData);
      toast.success("Solution updated successfully");
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
            href={"/home/solution/list-solution"}
          >
            Solutions
          </Link>
        </div>
      </div>

      {/* Update Form */}
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Update Solution
        </h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Name */}
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-1">
              Solution Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter solution name"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter solution description"
              required
            />
          </div>

          {/* Image */}
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-1">
              Solution Image
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

          {/* Submit */}
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Update Solution
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateSolution;
