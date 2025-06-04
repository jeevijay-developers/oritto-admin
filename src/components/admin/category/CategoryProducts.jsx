"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { getProductsByCategoryId } from "../../../server/common";
import NotFound from "../../NotFound";
const columns = [
  { key: "index", label: "Sr No." },
  { key: "name", label: "Name" },
  { key: "price", label: "Price" },
  // { key: "categoryName", label: "Category" },
  // { key: "application", label: "Application" },
  { key: "actions", label: "Action" },
];
const CategoryProducts = ({ id }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    setLoading(true);
    getProductsByCategoryId(id)
      .then((res) => {
        console.log(res);

        setProducts(res.products ?? []);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);
  if (!products || products.length === 0) {
    return <NotFound message="Opps!!! No products found 😰😰" />;
  }
  return (
    <div>
      <div className="overflow-x-auto rounded-xl shadow-2xl bg-white dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-gray-700">
        <table className="min-w-full text-sm text-left text-gray-800 dark:text-gray-200">
          <thead className="bg-blue-200 dark:bg-gray-800">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 text-xs font-semibold uppercase tracking-widest text-blue-700 dark:text-blue-300 text-center"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-8 text-center">
                  <ClipLoader
                    color="#3b82f6"
                    loading={loading}
                    size={35}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </td>
              </tr>
            ) : products && products.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-6 text-center text-gray-400"
                >
                  No data found.
                </td>
              </tr>
            ) : (
              products.map((row, idx) => (
                <tr
                  key={row._id}
                  className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900 dark:even:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-200"
                >
                  <td className="px-6 py-4 text-center font-medium">
                    {idx + 1}
                  </td>
                  <td className="px-6 py-4 text-center">{row.name}</td>
                  <td className="px-6 py-4 text-center">₹{row.price}</td>
                  {/* <td className="px-6 py-4 text-center">
                      {row.categoryName}
                    </td>
                    <td className="px-6 py-4 text-center">{row.application}</td> */}
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => router.push(`/product-update/${row.slug}`)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-2 px-4 rounded-full transition duration-300"
                    >
                      View or Update
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryProducts;
