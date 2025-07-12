"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toast";
import { addSolar, getAllProducts } from "@/server/admin"; // Adjust import paths as needed
import { useRouter } from "next/navigation";

const AddSolarForm = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    description: "",
    image: null,
    products: [],
  });

  const [preview, setPreview] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProds = async () => {
      try {
        const all = await getAllProducts();
        setProducts(all);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load products");
      }
    };
    fetchProds();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setForm((prev) => ({ ...prev, image: file }));
    setPreview(URL.createObjectURL(file));
  };

  const handleCheckboxChange = (productId) => {
    setForm((prev) => {
      const exists = prev.products.includes(productId);
      return {
        ...prev,
        products: exists
          ? prev.products.filter((id) => id !== productId)
          : [...prev.products, productId],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.description) {
      return toast.error("Please fill all required fields");
    }

    const formData = new FormData();
    formData.append("name", form.name.trim());
    formData.append("description", form.description.trim());
    form.products.forEach((id) => formData.append("products[]", id));
    if (form.image) formData.append("image", form.image);

    try {
      console.log("Submitting form data:", form);

      await addSolar(formData);
      toast.success("Solar added successfully");
      router.push("/home/solar/list-solar");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to add solar");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4">Add New Solar</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Solar Name *</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Description *</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter description"
            rows={3}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Image</label>
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded mb-2"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 mb-2">Select Products</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-60 overflow-y-auto border p-3 rounded">
            {products.map((product) => (
              <label key={product._id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={form.products.includes(product._id)}
                  onChange={() => handleCheckboxChange(product._id)}
                />
                <span className="capitalize">{product.name}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Solar
        </button>
      </form>
    </div>
  );
};

export default AddSolarForm;
