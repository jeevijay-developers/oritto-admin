"use client";
import React, { useEffect, useState } from "react";
import { getAllAttributes } from "@/server/admin";

const AttributesList = () => {
  const [attributes, setAttributes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        const res = await getAllAttributes(); // Replace with your real endpoint
        setAttributes(res);
      } catch (error) {
        console.error("Error fetching attributes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttributes();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-100 p-4 flex justify-center items-start">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          All Attributes
        </h2>

        {loading ? (
          <p className="text-gray-500">Loading attributes...</p>
        ) : attributes.length === 0 ? (
          <p className="text-gray-500">No attributes found.</p>
        ) : (
          <div className="space-y-6 flex flex-row flex-wrap gap-4 ">
            {attributes.map((attr) => (
              <div
                key={attr._id}
                className="border border-gray-200 rounded-md p-4 min-w-[250px] min-h-[200px]"
              >
                <h3 className="text-xl font-medium text-gray-700">
                  {attr.name}
                </h3>
                <ul className="mt-2 pl-4 list-disc">
                  {attr.varients.map((variant, index) => (
                    <li
                      key={index}
                      className={`text-sm ${
                        variant.enabled ? "text-green-600" : "text-gray-500"
                      }`}
                    >
                      {variant.name}{" "}
                      {variant.enabled && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full ml-2">
                          enabled
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AttributesList;
