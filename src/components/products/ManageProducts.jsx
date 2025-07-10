"use client";
import React, { useEffect, useState } from "react";
import { getAllProducts } from "@/server/common";
import { MdAutoDelete, MdEditSquare } from "react-icons/md";
import Link from "next/link";
import { confirmAlert } from "react-confirm-alert";
import { confirmDelete } from "@/confirm-alert/CategoryUpdate";
import { deleteProductById } from "@/server/admin";
import { toast } from "react-toast";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProducts(); // Adjust endpoint as needed
        setProducts(res);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      const res = await deleteProductById(id.name); // Adjust endpoint as needed
      toast.success("Product deleted");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 w-full">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Product Listing
        </h2>

        {loading ? (
          <p className="text-gray-500">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-gray-500">No products found.</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="p-4 border-b">#</th>
                  <th className="p-4 border-b">Image</th>
                  <th className="p-4 border-b">Name</th>
                  <th className="p-4 border-b">Price</th>
                  <th className="p-4 border-b">Stock</th>
                  <th className="p-4 border-b">Highlights</th>
                  <th className="p-4 border-b">Attributes</th>
                  <th className="p-4 border-b">Visible</th>
                  <th className="p-4 border-b">Edit</th>
                  <th className="p-4 border-b">Delete</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, index) => (
                  <tr
                    key={p._id}
                    className="hover:bg-gray-50 transition duration-150 border-b"
                  >
                    <td className="p-4 border-b">{index + 1}</td>
                    <td className="p-4 border-b">
                      {p.images?.[0]?.url ? (
                        <img
                          src={p.images[0].url}
                          alt={p.name}
                          className="w-14 h-14 object-cover rounded"
                        />
                      ) : (
                        <span className="text-sm text-gray-400">No Image</span>
                      )}
                    </td>
                    <td className="p-4 border-b capitalize">{p.name}</td>
                    <td className="p-4 border-b">₹{p.price}</td>
                    <td className="p-4 border-b">{p.stock}</td>
                    <td className="p-4 border-b">
                      {p.highlights?.length || 0}
                    </td>
                    <td className="p-4 border-b">
                      {p.attributes?.length || 0}
                    </td>
                    <td className="p-4 border-b">
                      {p.view ? (
                        <span className="text-green-600 font-semibold">
                          Yes
                        </span>
                      ) : (
                        <span className="text-red-500 font-semibold">No</span>
                      )}
                    </td>
                    <td className="">
                      <Link href={`/home/products/update/${p._id}`}>
                        <MdEditSquare
                          className="text-2xl hover:cursor-pointer"
                          color="green"
                        />
                      </Link>
                    </td>
                    <td>
                      <MdAutoDelete
                        className="text-2xl hover:cursor-pointer"
                        color="red"
                        onClick={() =>
                          confirmAlert(confirmDelete(p._id, deleteProduct))
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProducts;
