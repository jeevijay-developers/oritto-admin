"use client";

import React, { useEffect, useState } from "react";
import { getProductsBySlug, updateProductBySlug } from "@/server/common";
import { toast } from "react-toast";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});
import "react-quill-new/dist/quill.snow.css";

const UpdateProduct = ({ slug }) => {
  const [product, setProduct] = useState(null);
  const [name, setName] = useState("");
  const [productOverview, setProductOverview] = useState("");

  const [categories, setCategories] = useState([]);
  const [application, setApplication] = useState([]);
  const [highlights, setHighlights] = useState("");
  const [price, setPrice] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductsBySlug(slug);
        setProduct(data);
        setName(data.name);
        setProductOverview(data.productOverview);
        setHighlights(data.highlights.join(", "));
        setPrice(data.price);
        // console.log(data);

        setCategories(data.categoryName);
        setApplication(data.application);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch product");
      }
    };
    fetchProduct();
  }, [slug]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name || !productOverview || !highlights || !price) {
      return toast.warn("All fields are required");
    }

    try {
      setUpdating(true);
      await updateProductBySlug(slug, {
        name,
        productOverview,
        highlights: highlights.split(",").map((h) => h.trim()),
        price: parseFloat(price),
      });
      toast.success("Product updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update product");
    } finally {
      setUpdating(false);
    }
  };

  if (!product) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Update Product: {product.name}
        </h2>

        <form onSubmit={handleUpdate} className="space-y-6">
          <label className="block">
            <span className="block font-medium text-gray-700 mb-1">
              Product Name
            </span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter product name"
              required
              className="w-full px-4 py-2 border rounded"
            />
          </label>

          <label className="block">
            <span className="block font-medium text-gray-700 mb-1">
              Product Overview
            </span>
            <ReactQuill
              value={productOverview}
              onChange={setProductOverview}
              placeholder="Enter product overview"
              className="bg-white"
            />
          </label>

          <label className="block">
            <span className="block font-medium text-gray-700 mb-1">
              Highlights (comma-separated)
            </span>
            <input
              type="text"
              value={highlights}
              onChange={(e) => setHighlights(e.target.value)}
              placeholder="e.g., Waterproof, Durable, Lightweight"
              required
              className="w-full px-4 py-2 border rounded"
            />
          </label>

          <label className="block">
            <span className="block font-medium text-gray-700 mb-1">Price</span>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter product price"
              required
              className="w-full px-4 py-2 border rounded"
            />
          </label>

          <div>
            <span className="block font-medium text-gray-700 mb-1">
              Current Images
            </span>
            <div className="flex flex-wrap gap-2 mt-2">
              {product.images?.map((img, idx) => (
                <img
                  key={idx}
                  src={img.url}
                  alt={`image-${idx}`}
                  className="w-24 h-24 object-cover rounded border"
                />
              ))}
            </div>
          </div>
          <div className="flex justify-start items-center gap-25">
            <ul>
              <li>
                <span className=" text-gray-700 font-bold ">Categories</span>{" "}
              </li>
              {categories &&
                categories.length >= 0 &&
                categories.map((category, idx) => (
                  <li key={idx}>
                    <span className="font-medium text-gray-700">Category:</span>{" "}
                    {category}
                  </li>
                ))}
              {/* <li> */}
            </ul>

            <ul>
              <li>
                <span className="font-bold text-gray-700">Applications</span>{" "}
              </li>
              {application &&
                application.length >= 0 &&
                application.map((category, idx) => (
                  <li key={idx}>
                    <span className="font-medium text-gray-700">Category:</span>{" "}
                    {category}
                  </li>
                ))}
            </ul>
          </div>

          <button
            type="submit"
            disabled={updating}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-60"
          >
            {updating ? "Updating..." : "Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
