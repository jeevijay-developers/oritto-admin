"use client";
import { createNewSolution } from "@/server/admin";
import React, { useState } from "react";
import { toast } from "react-toast";

const SolutionForm = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setForm((prev) => ({ ...prev, image: file }));
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.description || !form.image) {
      alert("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name.toLowerCase());
    formData.append("description", form.description);
    formData.append("image", form.image);

    try {
      const res = await createNewSolution(formData);
      toast.success("Solution created successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setForm({
        name: "",
        description: "",
        image: null,
      });
      setPreview(null);
    } catch (error) {
      console.error("Failed to create solution:", err);
      toast.error(
        error.response?.data?.message || "Failed to create attribute",
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
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6 w-full">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-xl p-6 rounded-xl shadow-md space-y-6"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-semibold text-gray-800">
          Create New Solution
        </h2>

        {/* Name */}
        <div>
          <label className="block mb-1 text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            placeholder="e.g., water purification"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 text-gray-700">Description</label>
          <textarea
            name="description"
            placeholder="Write a short description..."
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full border border-gray-300 rounded-md px-4 py-2 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
            required
          ></textarea>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-1 text-gray-700">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full text-sm"
            required
          />
          {preview && (
            <div className="mt-3">
              <img
                src={preview}
                alt="preview"
                className="w-32 h-32 object-cover border rounded-lg"
              />
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Create Solution
        </button>
      </form>
    </div>
  );
};

export default SolutionForm;
