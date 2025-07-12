"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toast";
import { updateSolarById, getAllProducts } from "@/server/admin"; // You must have these
import Image from "next/image";

const UpdateSolar = ({ solar }) => {
  const [form, setForm] = useState({
    name: solar?.name || "",
    description: solar?.description || "",
    image: null,
  });
  const [selectedProducts, setSelectedProducts] = useState(
    solar.products || []
  );
  const [preview, setPreview] = useState(solar?.image?.url || "");
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await getAllProducts(); // Must return array of all products
        setAllProducts(res);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load products");
      }
    };
    loadProducts();
  }, []);

  const handleCheckboxChange = (productId) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setForm((prev) => ({ ...prev, image: file }));
    setPreview(URL.createObjectURL(file));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.description) {
      return toast.error("Please fill all required fields");
    }

    const formData = new FormData();
    formData.append("name", form.name.trim());
    formData.append("description", form.description.trim());
    formData.append("products", JSON.stringify(selectedProducts));
    if (form.image) {
      formData.append("image", form.image);
    }

    try {
      await updateSolarById(solar._id, formData);
      toast.success("Solar updated successfully");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update solar");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow mt-4">
      <h2 className="text-2xl font-semibold mb-4">Update Solar</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Name */}
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Solar Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            rows={4}
            required
          />
        </div>

        {/* Image Preview */}
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Solar Image</label>
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded mb-2"
            />
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        {/* Product Checkboxes */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Select Products
          </label>
          <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border p-2 rounded">
            {allProducts.map((prod) => (
              <label key={prod._id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedProducts.includes(prod._id)}
                  onChange={() => handleCheckboxChange(prod._id)}
                />
                <span>{prod.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Update Solar
        </button>
      </form>
    </div>
  );
};

export default UpdateSolar;
