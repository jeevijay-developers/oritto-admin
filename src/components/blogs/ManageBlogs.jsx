"use client";

import { useEffect, useState } from "react";
import { fetchBlogs, handleDelete } from "@/server/admin";
import { toast } from "react-toast";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { confirmDelete } from "@/confirm-alert/CategoryUpdate";

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const deleteBlog = async (id) => {
    try {
      await handleDelete(id.name);
    setBlogs((prev) => prev.filter((b) => b._id !== id));
    
    toast.success("Blog deleted successfully")
    } catch (error) {
      console.error("Error deleting blogs:", error);
      toast.error("Error in deleting the blog")
    }
  };

  const handleBlogs = async () => {
    try {
       const data =await fetchBlogs()
       setBlogs(data);
    } catch (error) {
        console.error("Error fetching blogs:", error);
    }
  }

  useEffect(() => {
    handleBlogs();
  }, [])

  const handleCloseModal = () => {
    setSelectedBlog(null);
  };

  const handleView = (blog) => {
    setSelectedBlog(blog);
  };

  return (
    <div className="w-full px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Manage Blogs</h1>

      {blogs?.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                  S.No.
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {blogs?.map((blog, index) => (
                <tr
                  key={blog._id}
                  className="hover:bg-gray-50 border-b border-gray-200"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{blog.title}</td>
                  <td className="px-6 py-4">{blog.desc}</td>
                  <td className="px-6 py-4">
                    <button
                      style={{
                        background:
                          "linear-gradient(90deg, #f44336 0%, #ff9800 100%)",
                      }}
                      className="px-4 py-2  text-white rounded  transition"
                      onClick={() => handleView(blog)}
                    >
                      View
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      style={{ background: "Red" }}
                      className="px-4 py-2  text-white rounded  transition"
                      onClick={() => confirmAlert(confirmDelete(blog._id, deleteBlog))}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for blog view */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-3xl w-full relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 hover:text-gray-900"
            >
              ✕
            </button>

            {/* 1. Content */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                Content
              </h3>
              <div
                className="text-gray-700 dark:text-gray-300 prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html: selectedBlog.content,
                }}
              />
            </div>

            {/* 2. Banner Image */}
            {selectedBlog.bannerImage?.url && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                  Banner Image
                </h3>
                <img
                  src={selectedBlog.bannerImage.url}
                  alt="Banner"
                  className="w-full h-64 object-contain rounded border"
                />
              </div>
            )}

            {/* 3. Content Images */}
            {selectedBlog.contentImages?.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                  Content Images
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedBlog.contentImages.map((img) => (
                    <img
                      key={img._id}
                      src={img.url}
                      alt="Content"
                      className="w-full h-48 object-contain rounded border"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
