"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toast";
import dynamic from "next/dynamic";
import {
  getAllApplications,
  getAllCategories,
  createNewProduct,
} from "../../../server/admin";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});
import "react-quill-new/dist/quill.snow.css";

const AddNewProduct = () => {
  const [categories, setCategories] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedApplications, setSelectedApplications] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [productOverview, setProductOverview] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, appRes] = await Promise.all([
          getAllCategories(),
          getAllApplications(),
        ]);
        setCategories(catRes);
        setApplications(appRes);
      } catch (err) {
        console.error("Failed to fetch categories or applications", err);
        toast.error("Failed to load form data");
      }
    };
    fetchData();
  }, []);

  const handleCheckboxChange = (value, selectedValues, setSelectedValues) => {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter((v) => v !== value));
    } else {
      setSelectedValues([...selectedValues, value]);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    setImageFiles(files);
    setPreviewUrls(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const highlights = form.highlights.value.split(",");
    const price = parseFloat(form.price.value);

    if (
      !name ||
      !productOverview ||
      !highlights.length ||
      !price ||
      !selectedCategories.length ||
      !selectedApplications.length ||
      !imageFiles.length
    ) {
      return toast.warn(
        "All fields are required including images, categories, and applications."
      );
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("productOverview", productOverview);
    formData.append("highlights", JSON.stringify(highlights));
    formData.append("price", price);
    selectedCategories.forEach((c) => formData.append("categoryName", c));
    selectedApplications.forEach((a) => formData.append("application", a));
    imageFiles.forEach((file) => formData.append("images", file));

    try {
      setUploading(true);
      await createNewProduct(formData);
      toast.success("Product added successfully");

      form.reset();
      setProductOverview("");
      setSelectedCategories([]);
      setSelectedApplications([]);
      setImageFiles([]);
      setPreviewUrls([]);
    } catch (err) {
      console.error("Failed to add product", err);
      if (err.response?.status === 409) {
        toast.error("Product already exists");
        return;
      }
      toast.error("Product creation failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Add New Product
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Product Name"
            required
            className="w-full px-4 py-2 border rounded"
          />
          <ReactQuill
            value={productOverview}
            onChange={setProductOverview}
            placeholder="Product Overview"
            className="bg-white"
          />
          <input
            name="highlights"
            placeholder="Highlights (comma-separated)"
            required
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            required
            className="w-full px-4 py-2 border rounded"
          />

          <div>
            <label className="block font-medium">Categories</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {categories.map((cat) => (
                <label key={cat._id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={cat.name}
                    checked={selectedCategories.includes(cat.name)}
                    onChange={() =>
                      handleCheckboxChange(
                        cat.name,
                        selectedCategories,
                        setSelectedCategories
                      )
                    }
                  />
                  {cat.name}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-medium">Applications</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {applications.map((app) => (
                <label key={app._id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={app.name}
                    checked={selectedApplications.includes(app.name)}
                    onChange={() =>
                      handleCheckboxChange(
                        app.name,
                        selectedApplications,
                        setSelectedApplications
                      )
                    }
                  />
                  {app.name}
                </label>
              ))}
            </div>
          </div>

          <label className="block">
            Upload Images (max 5)
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="w-full px-4 py-2 border rounded"
            />
          </label>

          <div className="flex flex-wrap gap-2">
            {previewUrls.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`preview-${idx}`}
                className="w-24 h-24 object-cover rounded border"
              />
            ))}
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="submit"
              disabled={uploading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {uploading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewProduct;
