"use client";
import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../../server/common";
import { ClipLoader } from "react-spinners";
import Pagination from "../../../components/Pagination";

const columns = [
  { key: "index", label: "Sr No." },
  { key: "name", label: "Name" },
  { key: "price", label: "Price" },
  // { key: "categoryName", label: "Category" },
  // { key: "application", label: "Application" },
  { key: "actions", label: "Action" },
];

// import products from "../../../data/products";
import { useRouter } from "next/navigation";

// const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString("en-GB");

const TodaysQueryPage = () => {
  // const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    setLoading(true);
    getAllProducts()
      .then((res) => {
        setProducts(res);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [itemsPerPage] = useState(5); // You can adjust this number

  // Calculate pagination variables
  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  // const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // const formatTime = (time) => {
  //   if (!time) return "";
  //   const [hours, minutes] = time.split(":");
  //   const hour = parseInt(hours, 10);
  //   const period = hour >= 12 ? "PM" : "AM";
  //   const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  //   return `${displayHour}:${minutes} ${period}`;
  // };

  return (
    <div className="min-h-screen bg-gray-100 w-full dark:bg-[#ffffff0f] p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-blue-700 dark:text-blue-300 mb-10 text-center">
          Welcome to Oritto LED Lights
        </h1>

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
                  <td
                    colSpan={columns.length}
                    className="px-6 py-8 text-center"
                  >
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
                        onClick={() =>
                          router.push(`/product-update/${row.slug}`)
                        }
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

        {/* <div className="mt-10">
          <Pagination
            usersPerPage={itemsPerPage}
            totalUsers={data.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div> */}
      </div>
    </div>
  );
};

export default TodaysQueryPage;
