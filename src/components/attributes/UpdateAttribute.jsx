"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { deleteAttributeById, updateAttributeById } from "@/server/admin";
import Link from "next/link";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { confirmAlert } from "react-confirm-alert";
import { confirmDelete } from "@/confirm-alert/CategoryUpdate";
const UpdateAttribute = ({ attribute }) => {
  // console.log(attribute);

  const [name, setName] = useState(attribute?.name || "");
  const [varients, setVarients] = useState(attribute?.varients || []);

  const handleVarientChange = (index, key, value) => {
    const updated = [...varients];
    updated[index][key] = value;
    setVarients(updated);
  };

  const addVarient = () => {
    setVarients([...varients, { name: "", enabled: true }]);
  };

  const removeVarient = (index) => {
    const updated = [...varients];
    updated.splice(index, 1);
    setVarients(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Attribute name is required");
    if (varients.length === 0) return toast.error("Add at least one variant");

    try {
      await updateAttributeById(attribute._id, { name, varients });
      toast.success("Attribute updated successfully");
    } catch (error) {
      toast.error("Update failed");
      console.error(error);
    }
  };

  const handleDeleteAttribute = async () => {
    try {
      await deleteAttributeById(attribute._id);
      toast.success("Attribute deleted");
    } catch (error) {
      toast.error("Deletion failed");
      console.error(error);
    }
  };

  return (
    <div className="max-w-3xl w-full mx-auto p-6 bg-white rounded shadow">
      <div className="text-xl mb-4 flex gap-2">
        <Link className="hover:text-blue-800" href="/home">
          Home
        </Link>{" "}
        /
        <Link
          className="hover:text-blue-800"
          href="/home/attributes/list-attributes"
        >
          Attributes
        </Link>
      </div>

      <h2 className="text-2xl font-bold mb-4">Update Attribute</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Attribute Name"
          className="w-full border px-3 py-2 rounded bg-orange-50"
          disabled
          required
        />

        <div>
          <label className="font-semibold mb-2 block">Variants</label>
          {varients.map((v, i) => (
            <div key={i} className="flex gap-3 items-center mb-2">
              <input
                type="text"
                value={v.name}
                onChange={(e) => handleVarientChange(i, "name", e.target.value)}
                placeholder="Variant name"
                className="border px-2 py-1 rounded w-full "
              />
              <label className="flex gap-1 items-center">
                <input
                  type="checkbox"
                  checked={v.enabled}
                  onChange={(e) =>
                    handleVarientChange(i, "enabled", e.target.checked)
                  }
                />
                Enabled
              </label>
              {/* <button
                type="button"
                className="text-red-500"
                onClick={() => removeVarient(i)}
              >
                Remove
              </button> */}
            </div>
          ))}
          <button
            type="button"
            className="bg-blue-100 text-blue-700 px-4 py-2 rounded mt-2"
            onClick={addVarient}
          >
            + Add Variant
          </button>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            Save Changes
          </button>
          <button
            type="button"
            className="bg-red-600 text-white px-6 py-2 rounded"
            onClick={() =>
              confirmAlert(confirmDelete(attribute.name, handleDeleteAttribute))
            }
          >
            Delete Attribute
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateAttribute;
