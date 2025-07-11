"use client";
import { addMechanicalFeaturesToProduct } from "@/server/admin";
import React, { useState } from "react";
import { toast } from "react-toast";
// import { addMechanicalFeaturesToProduct } from "@/server/admin"; // Your backend handler

const defaultFeature = {
  productCode: "",
  size: { length: "", breadth: "", height: "" },
  inputPower: "",
  systemLumens: "",
  energySaving: "",
};

const AddMechanicalFeatures = ({ product }) => {
  const [features, setFeatures] = useState([defaultFeature]);

  const handleChange = (index, field, value, isSize = false) => {
    const updated = [...features];
    if (isSize) {
      updated[index].size[field] = value;
    } else {
      updated[index][field] = value;
    }
    setFeatures(updated);
  };

  const addRow = () => {
    const newFeature = {
      productCode: "",
      size: { length: "", breadth: "", height: "" },
      inputPower: "",
      systemLumens: "",
      energySaving: "",
    };

    setFeatures((prev) => [...prev, newFeature]);
  };

  const removeRow = (index) => {
    const updated = [...features];
    updated.splice(index, 1);
    setFeatures(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const valid = features.every(
        (f) =>
          f.productCode &&
          f.size.length &&
          f.size.breadth &&
          f.size.height &&
          f.inputPower &&
          f.systemLumens &&
          f.energySaving
      );

      if (!valid) {
        return toast.error("Fill all fields before submitting.");
      }

      console.log(features);

      await addMechanicalFeaturesToProduct(product._id, { features });
      toast.success("Mechanical features added successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save mechanical features");
    }
  };

  console.log(features);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">
        Add Mechanical Features for:{" "}
        <span className="text-blue-600">{product.name}</span>
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border px-3 py-2">#</th>
                <th className="border px-3 py-2">Product Code</th>
                <th
                  className=" border px-3 py-2 row-span-3 text-center"
                  colSpan={3}
                >
                  Size
                </th>
                {/* <th className="border px-3 py-2">Breadth</th> */}
                {/* <th className="border px-3 py-2">Height</th> */}
                <th className="border px-3 py-2">Input Power</th>
                <th className="border px-3 py-2">System Lumens</th>
                <th className="border px-3 py-2">Energy Saving (%)</th>
                <th className="border px-3 py-2">Action</th>
              </tr>
              <tr className="bg-gray-100 text-left">
                <th className="border px-3 py-2">#</th>
                <th className="border px-3 py-2">Product Code</th>
                <th className="border px-3 py-2">Length</th>
                <th className="border px-3 py-2">Breadth</th>
                <th className="border px-3 py-2">Height</th>
                <th className="border px-3 py-2">Input Power</th>
                <th className="border px-3 py-2">System Lumens</th>
                <th className="border px-3 py-2">Energy Saving (%)</th>
                <th className="border px-3 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr key={index} className="text-sm">
                  <td className="border px-3 py-2">{index + 1}</td>
                  <td className="border px-3 py-2">
                    <input
                      type="text"
                      value={feature.productCode}
                      onChange={(e) =>
                        handleChange(index, "productCode", e.target.value)
                      }
                      className="w-full border px-2 py-1"
                      required
                    />
                  </td>
                  <td className="border px-3 py-2">
                    <input
                      type="number"
                      value={feature.size.length}
                      onChange={(e) =>
                        handleChange(index, "length", e.target.value, true)
                      }
                      className="w-full border px-2 py-1"
                      required
                    />
                  </td>
                  <td className="border px-3 py-2">
                    <input
                      type="number"
                      value={feature.size.breadth}
                      onChange={(e) =>
                        handleChange(index, "breadth", e.target.value, true)
                      }
                      className="w-full border px-2 py-1"
                      required
                    />
                  </td>
                  <td className="border px-3 py-2">
                    <input
                      type="number"
                      value={feature.size.height}
                      onChange={(e) =>
                        handleChange(index, "height", e.target.value, true)
                      }
                      className="w-full border px-2 py-1"
                      required
                    />
                  </td>
                  <td className="border px-3 py-2">
                    <input
                      type="text"
                      value={feature.inputPower}
                      onChange={(e) =>
                        handleChange(index, "inputPower", e.target.value)
                      }
                      className="w-full border px-2 py-1"
                      required
                    />
                  </td>
                  <td className="border px-3 py-2">
                    <input
                      type="number"
                      value={feature.systemLumens}
                      onChange={(e) =>
                        handleChange(index, "systemLumens", e.target.value)
                      }
                      className="w-full border px-2 py-1"
                      required
                    />
                  </td>
                  <td className="border px-3 py-2">
                    <input
                      type="number"
                      value={feature.energySaving}
                      onChange={(e) =>
                        handleChange(index, "energySaving", e.target.value)
                      }
                      className="w-full border px-2 py-1"
                      required
                    />
                  </td>
                  <td className="border px-3 py-2 text-center">
                    {features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeRow(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={addRow}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            + Add Feature
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit All
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMechanicalFeatures;
