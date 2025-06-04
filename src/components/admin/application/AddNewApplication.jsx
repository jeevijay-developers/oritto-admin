import React, { useState } from "react";
import { createNewApplication } from "../../../server/admin";
import { toast } from "react-toast";

const AddNewApplication = ({ setIsApplicationFormOpen }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
    // setImagePreview(reader.result);
  };

  const handleCancel = () => {
    setIsApplicationFormOpen(false);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.elements.name.value;
    const image = e.target.elements.image.files[0];
    console.log(image);

    if (!name || !image) return toast.warn("Please fill out all fields");
    const formData = new FormData();
    formData.append("applicationName", name);
    formData.append("image", image);

    try {
      setUploading(true);
      const data = await createNewApplication(formData);
      toast.success("Application created successfully");
    } catch (err) {
      console.log(err);

      if (err.response.status === 409) {
        toast.error("Application already exists");
        return;
      }
      toast.error("Unable to create Application");
    } finally {
      setIsApplicationFormOpen(false);
      setImagePreview(null);
      setUploading(false);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-sm">
        <h2 className="text-lg text-black font-semibold mb-4">
          Add New Application
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-4">
            <span className="text-gray-700">Name</span>
            <input
              name="name"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-orange-300"
            />
          </label>
          <label className="block mb-4">
            <span className="text-gray-700">Image</span>
            <div
              className="w-full h-48 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 relative transition hover:border-orange-400"
              style={{ cursor: "pointer" }}
              // onClick={() =>
              //   document.getElementById("application-image-input").click()
              // }
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-full max-w-full object-contain rounded"
                />
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <svg width="48" height="48" fill="none" viewBox="0 0 24 24">
                    <rect width="24" height="24" rx="4" fill="#e5e7eb" />
                    <path
                      d="M12 8v8m0 0l-3-3m3 3l3-3"
                      stroke="#a3a3a3"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <button
                    type="button"
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
                  >
                    Choose Image
                  </button>
                  <span className="mt-2 text-gray-400 text-sm">
                    or, drop the file here
                  </span>
                  <span className="mt-1 text-gray-400 text-xs">
                    Maximum file size: 5MB
                  </span>
                </div>
              )}
              <input
                id="category-image-input"
                name="image"
                type="file"
                accept="image/*"
                required
                className="absolute inset-0 opacity-0 cursor-pointer "
                style={{ width: "100%", height: "100%" }}
                onChange={handleImageChange}
                tabIndex={-1}
              />
            </div>
          </label>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleCancel}
              className="mr-2 px-4 py-2 rounded-md text-gray-700 bg-gray-300 hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            {uploading ? (
              <button
                type="submit"
                className="px-4 py-2 rounded-md text-white bg-green-500 hover:bg-green-600 transition"
              >
                Uploading ...
              </button>
            ) : (
              <button
                type="submit"
                className="px-4 py-2 rounded-md text-white bg-orange-500 hover:bg-orange-600 transition"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewApplication;
