"use client";
import { getAllCategories } from "../../../server/admin";
import React, { useEffect, useState } from "react";
import NotFound from "../../NotFound";
import { useRouter } from "next/navigation";

const ViewAllCategory = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    getAllCategories()
      .then((data) => {
        setCategory(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const router = useRouter();
  const handleUpdate = (id) => {
    router.push(`/view-cate-prods/${id}`);
  };

  if (!category || category.length === 0) {
    return <NotFound message="Opps!!! No categories found 😰😰" />;
  }

  return (
    <div className="overflow-x-auto p-4">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">S.N.</th>
            <th className="border border-gray-300 px-4 py-2">Image</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Product Count</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {category.map((item, index) => (
            <tr key={item._id}>
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">
                <img
                  src={item.image?.url}
                  alt={item.name}
                  className="h-16 w-16 object-cover rounded"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">{item.name}</td>
              <td className="border border-gray-300 px-4 py-2">
                {item.products?.length || 0}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleUpdate(item._id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
                >
                  View Products
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAllCategory;
