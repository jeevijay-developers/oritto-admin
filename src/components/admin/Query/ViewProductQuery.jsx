"use client";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { getAllProductQuery } from "../../../server/common";
import MessageModal from "./MessageModal";
const ViewProductQuery = () => {
  const [query, setQuery] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); 
  const [totalPages, setTotalPages] = useState(1);
  const [selectedMessage, setSelectedMessage] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const limit = 5;

  const fetchQueries = (page) => {
    getAllProductQuery(page + 1, limit) 
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
    setSelectedProduct(selectedQuery.products);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMessage("");
  };

  return (
    <div className="overflow-x-auto w-full cursor-pointer  p-4">
      <div className="max-w-sm sm:max-w-sm md:max-w-md lg:max-w-3xl xl:max-w-7xl">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">S.N.</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Phone</th>
              <th className="border border-gray-300 px-4 py-2">Submitted At</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
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
                <td className="border border-gray-300 px-4 py-2">
                  {item.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.phone}
                </td>

                <td className="border border-gray-300 px-4 py-2 text-nowrap">
                  {new Date(item.submittedAt).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",

                    timeZone: "Asia/Kolkata",
                  })}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleUpdate(item._id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded "
                  >
                    View More
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
          forcePage={currentPage}
          containerClassName="flex gap-2 list-none p-0"
          pageClassName=""
          pageLinkClassName="px-3 py-1 border border-gray-300 rounded hover:bg-gray-200 text-gray-800"
          previousClassName=""
          previousLinkClassName="px-3 py-1 border border-gray-300 rounded hover:bg-gray-200 text-gray-800"
          nextClassName=""
          nextLinkClassName="px-3 py-1 border border-gray-300 rounded hover:bg-gray-200 text-gray-800"
          breakClassName=""
          breakLinkClassName="px-3 py-1 border border-gray-300 rounded text-gray-800"
          activeClassName="bg-blue-500 text-white border-blue-500"
        />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <MessageModal
          message={selectedMessage}
          selectedProduct={selectedProduct}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default ViewProductQuery;
