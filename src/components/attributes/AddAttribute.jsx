"use client";
import { createNewAttribute } from "@/server/admin";
import React, { useState } from "react";
import { toast } from "react-toast";

const AttributeForm = () => {
  const [attributeName, setAttributeName] = useState("");
  const [variants, setVariants] = useState([{ name: "", enabled: false }]);

  const handleVariantChange = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = field === "enabled" ? value.target.checked : value;
    setVariants(updated);
  };

  const addVariant = () => {
    setVariants([...variants, { name: "", enabled: false }]);
  };

  const removeVariant = (index) => {
    const updated = [...variants];
    updated.splice(index, 1);
    setVariants(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: attributeName,
      varients: variants,
    };
    try {
      const response = await createNewAttribute(payload);
      toast.success("Attribute created successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setAttributeName("");
      setVariants([{ name: "", enabled: false }]); // Reset variants
    } catch (error) {
      console.error("Error creating attribute:", error);
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
    // send payload to your backend API
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4 w-full">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white shadow-md rounded-xl p-6 space-y-6"
      >
        <h2 className="text-2xl font-semibold text-gray-800">Add Attribute</h2>

        {/* Attribute Name */}
        <div>
          <label className="block text-gray-700 mb-1" htmlFor="attributeName">
            Attribute Name
          </label>
          <input
            type="text"
            id="attributeName"
            value={attributeName}
            onChange={(e) => setAttributeName(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Variants Section */}
        <div>
          <label className="block text-gray-700 mb-2">Variants</label>
          {variants.map((variant, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center gap-4 mb-3"
            >
              <input
                type="text"
                placeholder="Variant name"
                value={variant.name}
                onChange={(e) =>
                  handleVariantChange(index, "name", e.target.value)
                }
                className="flex-1 border border-gray-300 rounded-md px-4 py-2 w-full"
                required
              />
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={variant.enabled}
                  onChange={(e) => handleVariantChange(index, "enabled", e)}
                />
                <span className="text-sm text-gray-600">Enabled</span>
              </label>
              {variants.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeVariant(index)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addVariant}
            className="mt-2 text-blue-600 hover:underline text-sm"
          >
            + Add another variant
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AttributeForm;
