"use client";
import { createNewProduct } from "@/server/admin";
import React, { useState } from "react";
import { toast } from "react-toast";

const ProductForm = () => {
  const [form, setForm] = useState({
    name: "",
    productOverview: "",
    price: 0,
    categoryName: [""],
    solutions: [""],
    highlights: [""],
    attributes: [{ name: "", varients: [{ name: "", enabled: false }] }],
    stock: 0,
    images: [],
  });

  const [imagePreview, setImagePreview] = useState([]);

  const handleArrayChange = (field, index, value) => {
    const updated = [...form[field]];
    updated[index] = value;
    setForm({ ...form, [field]: updated });
  };

  const addToArray = (field, defaultValue) => {
    setForm({ ...form, [field]: [...form[field], defaultValue] });
  };

  const removeFromArray = (field, index) => {
    const updated = [...form[field]];
    updated.splice(index, 1);
    setForm({ ...form, [field]: updated });
  };

  const handleAttributeChange = (i, key, value) => {
    const updated = [...form.attributes];
    updated[i][key] = value;
    setForm({ ...form, attributes: updated });
  };

  const handleVariantChange = (i, j, key, value) => {
    const updated = [...form.attributes];
    updated[i].varients[j][key] =
      key === "enabled" ? value.target.checked : value;
    setForm({ ...form, attributes: updated });
  };

  const addVariant = (i) => {
    const updated = [...form.attributes];
    updated[i].varients.push({ name: "", enabled: false });
    setForm({ ...form, attributes: updated });
  };

  const addAttribute = () => {
    setForm({
      ...form,
      attributes: [
        ...form.attributes,
        { name: "", varients: [{ name: "", enabled: false }] },
      ],
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setForm({ ...form, images: files });

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreview(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("productOverview", form.productOverview);
    formData.append("price", form.price);
    formData.append("stock", form.stock);
    formData.append("view", true);

    form.categoryName.forEach((c) => formData.append("categoryName[]", c));
    form.solutions.forEach((s) => formData.append("solutions[]", s));
    form.highlights.forEach((h) => formData.append("highlights[]", h));

    form.images.forEach((img) => formData.append("images", img));

    formData.append("attributes", JSON.stringify(form.attributes));

    try {
      const res = await createNewProduct(formData);

      toast.success("Product created successfully");
      setForm({
        name: "",
        productOverview: "",
        price: 0,
        categoryName: [""],
        solutions: [""],
        highlights: [""],
        attributes: [{ name: "", varients: [{ name: "", enabled: false }] }],
        stock: 0,
        images: [],
      });
      setImagePreview([]);
    } catch (error) {
      console.error("Submit Error:", error);
      toast.error(error.response?.data?.message || "Failed to create product", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-start w-full">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-5xl space-y-6"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-semibold">Create Product</h2>

        {/* Name */}
        <input
          type="text"
          placeholder="Product name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border px-4 py-2 rounded-md"
          required
        />

        {/* Overview */}
        <textarea
          rows={4}
          placeholder="Product overview"
          value={form.productOverview}
          onChange={(e) =>
            setForm({ ...form, productOverview: e.target.value })
          }
          className="w-full border px-4 py-2 rounded-md"
          required
        />

        {/* Price & Stock */}
        <div className="flex gap-4">
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="w-1/2 border px-4 py-2 rounded-md"
            required
          />
          <input
            type="number"
            placeholder="Stock"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
            className="w-1/2 border px-4 py-2 rounded-md"
            required
          />
        </div>

        {/* Highlights */}
        <div>
          <label className="font-medium">Highlights</label>
          {form.highlights.map((highlight, i) => (
            <div key={i} className="flex gap-2 mt-2">
              <input
                type="text"
                value={highlight}
                onChange={(e) =>
                  handleArrayChange("highlights", i, e.target.value)
                }
                className="w-full border px-3 py-1 rounded"
              />
              <button
                type="button"
                onClick={() => removeFromArray("highlights", i)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addToArray("highlights", "")}
            className="text-blue-600 mt-2"
          >
            + Add Highlight
          </button>
        </div>

        {/* Category */}
        <div>
          <label className="font-medium">Categories</label>
          {form.categoryName.map((cat, i) => (
            <div key={i} className="flex gap-2 mt-2">
              <input
                type="text"
                value={cat}
                onChange={(e) =>
                  handleArrayChange("categoryName", i, e.target.value)
                }
                className="w-full border px-3 py-1 rounded"
              />
              <button
                type="button"
                onClick={() => removeFromArray("categoryName", i)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addToArray("categoryName", "")}
            className="text-blue-600 mt-2"
          >
            + Add Category
          </button>
        </div>

        {/* Solutions */}
        <div>
          <label className="font-medium">Solutions</label>
          {form.solutions.map((s, i) => (
            <div key={i} className="flex gap-2 mt-2">
              <input
                type="text"
                value={s}
                onChange={(e) =>
                  handleArrayChange("solutions", i, e.target.value)
                }
                className="w-full border px-3 py-1 rounded"
              />
              <button
                type="button"
                onClick={() => removeFromArray("solutions", i)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addToArray("solutions", "")}
            className="text-blue-600 mt-2"
          >
            + Add Solution
          </button>
        </div>

        {/* Attributes */}
        <div>
          <label className="font-medium">Attributes</label>
          {form.attributes.map((attr, i) => (
            <div key={i} className="border p-4 rounded-md mt-4">
              <input
                type="text"
                placeholder="Attribute Name"
                value={attr.name}
                onChange={(e) =>
                  handleAttributeChange(i, "name", e.target.value)
                }
                className="w-full mb-2 border px-3 py-1 rounded"
              />
              <label className="text-sm text-gray-600">Variants</label>
              {attr.varients.map((variant, j) => (
                <div key={j} className="flex gap-2 items-center mt-1">
                  <input
                    type="text"
                    placeholder="Variant Name"
                    value={variant.name}
                    onChange={(e) =>
                      handleVariantChange(i, j, "name", e.target.value)
                    }
                    className="flex-1 border px-3 py-1 rounded"
                  />
                  <label className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={variant.enabled}
                      onChange={(e) => handleVariantChange(i, j, "enabled", e)}
                    />
                    Enabled
                  </label>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addVariant(i)}
                className="text-blue-600 mt-2 text-sm"
              >
                + Add Variant
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addAttribute}
            className="text-blue-600 mt-2"
          >
            + Add Attribute
          </button>
        </div>

        {/* Images */}
        <div>
          <label className="font-medium">Upload Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="block mt-1"
            required
          />
          <div className="flex flex-wrap mt-3 gap-3">
            {imagePreview.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="preview"
                className="w-24 h-24 object-cover rounded-md border"
              />
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
