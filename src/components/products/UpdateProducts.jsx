"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  getAllAttributes,
  getAllCategories,
  getAllSolutions,
  updateProductById,
} from "../../server/admin";
import { toast } from "react-toast";

const UpdateProducts = ({ prods }) => {
  const images = [
    ...prods.images.map((itm) => {
      return itm.url;
    }),
  ];
  console.log(images);

  const [form, setForm] = useState({ ...prods });
  const [imagePreview, setImagePreview] = useState(images);
  const [attributes, setAttributes] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      const result = await Promise.allSettled([
        getAllAttributes(),
        getAllSolutions(),
        getAllCategories(),
      ]);
      return result;
    };
    fetchInitialData().then((res) => {
      console.log(res);

      if (res[0].status === "fulfilled") {
        // setForm({ ...form, attributes: res[0].value });
        setAttributes(res[0].value);
      }
      if (res[1].status === "fulfilled") {
        // setForm({ ...form, solutions: res[1].value });
        setSolutions(res[1].value);
      }
      if (res[2].status === "fulfilled") {
        // setForm({ ...form, categoryName: res[2].value });
        setCategories(res[2].value);
      }
    });
  }, []);

  const handleArrayChange = (field, index, value) => {
    const updated = [...form[field]];
    updated[index] = value;
    setForm({ ...form, [field]: updated });
  };

  const addToArray = (field, defaultValue) => {
    setForm({ ...form, [field]: [...form[field], defaultValue] });
  };

  const removeFromArray = (field, index) => {
    const updated = [...form[field]];
    updated.splice(index, 1);
    setForm({ ...form, [field]: updated });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setForm({ ...form, images: [...form.images, ...files] });

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreview((prev) => [...prev, ...previews]);
  };

  const handleCategoryChange = (status, id, target) => {
    setForm({
      ...form,
      [target]: status
        ? [...form[target], id]
        : form[target].filter((c) => c !== id),
    });
  };

  const handleAttributeChange = (status, attributeName, variantName) => {
    const updatedAttributes = [...form.attributes];
    const attributeIndex = updatedAttributes.findIndex(
      (attr) => attr.name === attributeName
    );

    if (attributeIndex !== -1) {
      // Attribute exists
      const variantIndex = updatedAttributes[attributeIndex].varients.findIndex(
        (v) => v.name === variantName
      );

      if (variantIndex !== -1) {
        // Variant exists, update its status
        if (status) {
          updatedAttributes[attributeIndex].varients[variantIndex].enabled =
            status;
        } else {
          updatedAttributes[attributeIndex].varients.splice(variantIndex, 1);
        }
      } else {
        // Variant doesn't exist, add it
        updatedAttributes[attributeIndex].varients.push({
          name: variantName,
          enabled: status,
        });
      }
    } else {
      // Attribute doesn't exist, create it
      updatedAttributes.push({
        name: attributeName,
        varients: [
          {
            name: variantName,
            enabled: status,
          },
        ],
      });
    }

    setForm({
      ...form,
      attributes: updatedAttributes,
    });
  };

  const checkVarientInitially = (attr, name) => {
    const ATT = form.attributes.find((atr) => atr.name === attr);
    if (ATT) {
      return ATT.varients.some((v) => v.name === name);
    }
    return false;
  };

  const checkSolutionAndCategoryCheckBox = (target, name) => {
    if (form[target].includes(name)) {
      return true;
    }
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (form.attributes.length < 1) {
      toast.warn("Please add at least one attribute");
      return;
    } else if (form.categoryName.length < 1) {
      toast.warn("Please add at least one category");
      return;
    } else if (form.solutions.length < 1) {
      toast.warn("Please add at least one solution");
      return;
    } else if (form.highlights.length < 1) {
      toast.warn("Please add at least one highlight");
      return;
    }

    formData.append("name", form.name);
    formData.append("productOverview", form.productOverview);
    formData.append("price", form.price);
    formData.append("stock", form.stock);
    formData.append("view", true);

    formData.append("categoryName", JSON.stringify(form.categoryName));
    formData.append("solutions", JSON.stringify(form.solutions));
    formData.append("highlights", JSON.stringify(form.highlights));
    form.images.forEach((img) => formData.append("images", img));

    formData.append("attributes", JSON.stringify(form.attributes));

    try {
      const res = await updateProductById(prods._id, formData);

      toast.success("Product created successfully");
      // setForm({
      //   name: "",
      //   productOverview: "",
      //   price: 0,
      //   categoryName: [],
      //   solutions: [],
      //   highlights: [],
      //   attributes: [],
      //   stock: 0,
      //   images: [],
      // });
      // setImagePreview([]);
    } catch (error) {
      console.error("Submit Error:", error);
      toast.error(error.response?.data?.message || "Failed to create product", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="w-full">
      <div className="w-full">
        <div className="text-xl flex flex-row gap-2">
          <div>
            <Link className="hover:text-blue-900" href={"/home"}>
              Home
            </Link>
          </div>
          /
          <div>
            <Link
              className="hover:text-blue-900"
              href={"/home/products/list-products"}
            >
              Products
            </Link>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-start w-full">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-5xl space-y-6"
          encType="multipart/form-data"
        >
          <h2 className="text-2xl font-semibold">Create Product</h2>

          {/* Name */}
          <input
            type="text"
            placeholder="Product name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border px-4 py-2 rounded-md"
            required
          />

          {/* Overview */}
          <textarea
            rows={4}
            placeholder="Product overview"
            value={form.productOverview}
            onChange={(e) =>
              setForm({ ...form, productOverview: e.target.value })
            }
            className="w-full border px-4 py-2 rounded-md"
            required
          />

          {/* Price & Stock */}
          <div className="flex gap-4">
            <input
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-1/2 border px-4 py-2 rounded-md"
              required
            />
            <input
              type="number"
              placeholder="Stock"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              className="w-1/2 border px-4 py-2 rounded-md"
              required
            />
          </div>

          {/* Highlights */}
          <div>
            <label className="font-medium">Highlights</label>
            {form.highlights.map((highlight, i) => (
              <div key={i} className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={highlight}
                  onChange={(e) =>
                    handleArrayChange("highlights", i, e.target.value)
                  }
                  className="w-full border px-3 py-1 rounded"
                />
                <button
                  type="button"
                  onClick={() => removeFromArray("highlights", i)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addToArray("highlights", "")}
              className="text-blue-600 bg-blue-100 py-2 px-4 ml-2 rounded-lg mt-2"
            >
              + Add Highlight
            </button>
          </div>

          {/* Category */}
          <div>
            <label className="mb-2 font-bold">Select Categories</label>
            <ul className="flex flex-row gap-4 flex-wrap">
              {categories.map((category, i) => (
                <li key={i} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`${category._id}`}
                    checked={checkSolutionAndCategoryCheckBox(
                      "categoryName",
                      category.name
                    )}
                    onChange={(e) => {
                      handleCategoryChange(
                        e.target.checked,
                        category.name,
                        "categoryName"
                      );
                    }}
                  />
                  <label htmlFor={`${category._id}`}>
                    {category.name || "N/A"}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <label className="mb-2 font-bold">Select Solutions</label>
            <ul className="flex flex-row gap-4 flex-wrap">
              {solutions.map((sol, i) => (
                <li className="" key={i}>
                  <input
                    type="checkbox"
                    id={`${sol._id}`}
                    checked={checkSolutionAndCategoryCheckBox(
                      "solutions",
                      sol.name
                    )}
                    onChange={(e) => {
                      handleCategoryChange(
                        e.target.checked,
                        sol.name,
                        "solutions"
                      );
                    }}
                  />
                  <label htmlFor={`${sol._id}`}>{sol.name || "N/A"}</label>
                </li>
              ))}
            </ul>
          </div>

          {/* Attributes */}
          <div>
            <label className="mb-2 font-bold">Attributes</label>

            <ul className="flex flex-row gap-4 flex-wrap">
              {attributes.map((attr, i) => (
                <li key={i} className="min-w-[200px]">
                  <div className="flex justify-start items-center">
                    <label className="font-semibold" htmlFor={`${attr._id}`}>
                      {attr.name}
                    </label>
                  </div>
                  <ul className="flex flex-col">
                    {attr.varients.map((variant, i) => (
                      <li key={i} className="ms-2 flex flex-row gap-3">
                        <p>{i + 1}</p>
                        <input
                          type="checkbox"
                          id={`${variant._id}`}
                          checked={checkVarientInitially(
                            attr.name,
                            variant.name
                          )}
                          onChange={(e) => {
                            handleAttributeChange(
                              e.target.checked,
                              attr.name,
                              variant.name
                            );
                          }}
                        />
                        <label htmlFor={`${variant._id}`}>{variant.name}</label>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>

          {/* Images */}
          <div>
            <label className="font-medium">Upload Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="block mt-1"
            />
            <div className="flex flex-wrap mt-3 gap-3">
              {imagePreview.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="preview"
                  className="w-24 h-24 object-cover rounded-md border"
                />
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProducts;
