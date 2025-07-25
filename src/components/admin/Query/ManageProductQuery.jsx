"use client";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { deleteProductQuery, getAllProductQuery } from "../../../server/common";


import ResponseModal from "./ResponseModal"; 
import { MdDelete } from "react-icons/md";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-toastify"; 

const ManageProductQuery = () => {
  const [query, setQuery] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedMessage, setSelectedMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New state for response modal
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);
  const [selectedQueryForResponse, setSelectedQueryForResponse] =
    useState(null);

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

  const handleDelete = (id) => {
    confirmAlert({
      title: "Delete Query",
      message: "Are you sure to do this? This cannot be undone",
      buttons: [
        {
          label: "Yes, Delete",
          onClick: async () => {
            try {
              const res = await deleteProductQuery(id);
              toast.success("Query deleted");
              console.log("Deletion response: ", res);
              // Refresh the queries after deletion
              fetchQueries(currentPage);
            } catch (error) {
              toast.error("Error in deleting Query");
            }
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  // Updated handleSendQueryMessage function
  const handleSendQueryMessage = (id) => {
    const selectedQuery = query.find((item) => item._id === id);
    setSelectedQueryForResponse(selectedQuery);
    setIsResponseModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMessage("");
  };

  const closeResponseModal = () => {
    setIsResponseModalOpen(false);
    setSelectedQueryForResponse(null);
  };

  return (
    <div className="overflow-x-auto w-full p-4">
      <div className="max-w-xs sm:max-w-xs md:max-w-md lg:max-w-3xl xl:max-w-7xl">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">S.N.</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Phone</th>
              {/* <th className="border border-gray-300 px-4 py-2">Product</th> */}
              <th className="border border-gray-300 px-4 py-2">Submitted At</th>
              <th className="border border-gray-300 px-4 py-2">
                Send Response
              </th>
              <th className="border border-gray-300 px-4 py-2">Delete</th>
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
                {/* <td className="border border-gray-300 px-4 py-2  md:break-words md:max-w-xs">
                  {item.productName}
                </td> */}
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
                    onClick={() => handleSendQueryMessage(item._id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
                  >
                    Send Response
                  </button>
                </td>
                <td className=" border border-gray-300 p-4">
                  <div
                    onClick={() => handleDelete(item._id)}
                    className="flex flex-row items-center justify-center bg-red-500 hover:bg-red-600 text-gray-900 cursor-pointer p-2 rounded"
                  >
                    <MdDelete />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* React Paginate */}
      <div className="flex justify-center cursor-pointer mt-4">
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

      {/* New Response Modal */}
      {isResponseModalOpen && selectedQueryForResponse && (
        <ResponseModal
          isOpen={isResponseModalOpen}
          onClose={closeResponseModal}
          products={selectedQueryForResponse.products}
          queryId={selectedQueryForResponse._id}
          customerName={selectedQueryForResponse.name}
          customerEmail={selectedQueryForResponse.email}
          originalMessage={selectedQueryForResponse.message}
        />
      )}
    </div>
  );
};

export default ManageProductQuery;
