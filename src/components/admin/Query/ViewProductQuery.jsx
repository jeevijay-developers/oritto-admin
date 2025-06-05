"use client";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { getAllProductQuery } from "../../../server/common";
import "./ViewProductQuery.css";

const ViewProductQuery = () => {
  const [query, setQuery] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Note: react-paginate is 0-indexed
  const [totalPages, setTotalPages] = useState(1);
  const [selectedMessage, setSelectedMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const limit = 5;

  const fetchQueries = (page) => {
    getAllProductQuery(page + 1, limit) // convert 0-indexed to 1-indexed
      .then((data) => {
        setQuery(data.data);
        setTotalPages(data.totalPages);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchQueries(currentPage);
  }, [currentPage]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const handleUpdate = (id) => {
    const selectedQuery = query.find((item) => item._id === id);
    setSelectedMessage(selectedQuery.message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMessage("");
  };

  return (
    <div className="overflow-x-auto p-4">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">S.N.</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Phone</th>
            <th className="border border-gray-300 px-4 py-2">Product</th>
            <th className="border border-gray-300 px-4 py-2">Submitted At</th>
            <th className="border border-gray-300 px-4 py-2">Message</th>
          </tr>
        </thead>
        <tbody>
          {query.map((item, index) => (
            <tr key={item._id}>
              <td className="border border-gray-300 px-4 py-2">
                {currentPage * limit + index + 1}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-nowrap">
                {item.name}
              </td>
              <td className="border border-gray-300 px-4 py-2">{item.email}</td>
              <td className="border border-gray-300 px-4 py-2">{item.phone}</td>
              <td className="border border-gray-300 px-4 py-2 text-nowrap">
                {item.productName}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-nowrap">
                {new Date(item.submittedAt).toLocaleString("en-IN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                  timeZone: "Asia/Kolkata",
                })}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleUpdate(item._id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded "
                >
                  View Message
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* React Paginate */}
      <div className="flex justify-center mt-4">
        <ReactPaginate
          previousLabel={"← Prev"}
          nextLabel={"Next →"}
          breakLabel={"..."}
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          nextClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
          forcePage={currentPage}
        />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Message Details</h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="bg-gray-100 p-4 rounded overflow-y-auto flex-grow">
              <p className="whitespace-pre-wrap break-words">
                {selectedMessage}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProductQuery;
