"use client";
import React, { useState, useRef, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { IoLogOut } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import AddNewCategory from "../components/admin/category/AddNewCategory";
import AddNewApplication from "../components/admin/application/AddNewApplication";

const NAV_BUTTONS = [
  {
    key: "query",
    label: "Query",
    newHref: "/view-product-query",
    viewHref: "/view-product-query",
  },
  {
    key: "category",
    label: "Category",
    newHref: "/category/new",
    viewHref: "/view-categories",
  },

  {
    key: "application",
    label: "Application",
    newHref: "/application/new",
    viewHref: "/view-applications",
  },
  {
    key: "products",
    label: "Products",
    newHref: "/products-new",
    viewHref: "/home/products",
  },

  // {
  //   key: "blogs",
  //   label: "Blogs",
  //   newHref: "/home/create-blog",
  //   viewHref: "/blogs/view",
  // },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const dropdownRef = useRef(null);

  const [mobileActiveMenu, setMobileActiveMenu] = useState(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  const [applicationImagePreview, setApplicationImagePreview] = useState(null);
  const [isApplicationFormOpen, setIsApplicationFormOpen] = useState(false);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("lnp-landing-admin-page");
    window.location.href = "/";
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <nav className="bg-gray-800 dark:bg-gray-900 shadow-md">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section */}
          <div className="w-[140px] h-[80px] flex items-center">
            <img
              className="w-full h-full object-contain"
              src="/image 4.0.png"
              alt="oritto-logo"
            />
          </div>

          {/* Desktop Menu */}
          <div
            ref={dropdownRef}
            className="hidden md:flex md:items-center md:space-x-4"
          >
            {NAV_BUTTONS.map((btn) => (
              <div className="relative" key={btn.key}>
                <button
                  onClick={() => toggleDropdown(btn.key)}
                  className="px-4 py-2 rounded-lg font-semibold text-white shadow-md flex items-center space-x-2 transform hover:scale-105 transition-all duration-200"
                  style={{
                    background:
                      "linear-gradient(90deg, #f44336 0%, #ff9800 100%)",
                  }}
                >
                  <span>{btn.label}</span>
                  <FaChevronDown
                    className={`ml-1 transform ${
                      activeDropdown === btn.key ? "rotate-180" : ""
                    } transition-transform duration-200`}
                  />
                </button>
                {activeDropdown === btn.key && (
                  <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10 py-1 border border-gray-200 dark:border-gray-700">
                    {btn.key === "category" ? (
                      <button
                        onClick={() => setIsFormModalOpen(true)}
                        className="block w-full text-left px-4 py-3 text-[1rem] font-semibold text-gray-800 dark:text-white border-b border-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/30 transition bg-gradient-to-r "
                      >
                        New
                      </button>
                    ) : btn.key === "application" ? (
                      <button
                        onClick={() => setIsApplicationFormOpen(true)}
                        className="block w-full text-left px-4 py-3 text-[1rem] font-semibold text-gray-800 dark:text-white border-b border-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/30 transition bg-gradient-to-r "
                      >
                        New
                      </button>
                    ) : btn.key === "query" ? (
                     <></>
                    ) :(
                      <a
                        href={btn.newHref}
                        className="block w-full px-4 py-3 text-[1rem] font-semibold text-gray-800 dark:text-white border-b border-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/30 transition bg-gradient-to-r "
                      >
                        New
                      </a>
                    )}
                    <a
                      href={btn.viewHref}
                      className="block w-full px-4 py-3 text-[1rem] font-semibold text-gray-800 dark:text-white hover:bg-orange-50 dark:hover:bg-orange-900/30 transition"
                    >
                      View
                    </a>
                  </div>
                )}
              </div>
            ))}

            {/* Logout Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 rounded-lg font-semibold text-white bg-red-700 hover:bg-red-800 transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2 transform hover:scale-105"
            >
              <span className="flex items-center gap-2">
                <IoLogOut /> Logout
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}

          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-gray-800 focus:outline-none"
              aria-label="Main menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <XMarkIcon className="block h-7 w-7" />
              ) : (
                <Bars3Icon className="block h-7 w-7" />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="mx-auto px-2 pt-4 pb-6 space-y-3 flex flex-col">
            {NAV_BUTTONS.map((btn) => (
              <div className="border-b border-gray-200 pb-2 mb-2" key={btn.key}>
                <button
                  onClick={() =>
                    setMobileActiveMenu(
                      mobileActiveMenu === btn.key ? null : btn.key
                    )
                  }
                  className="w-full text-left text-base font-semibold text-gray-800 dark:text-gray-100 mb-1 flex items-center gap-2 uppercase tracking-wide px-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-[#23272f]/50 transition"
                >
                  {btn.label}
                  <span
                    className={`ml-auto transition-transform ${
                      mobileActiveMenu === btn.key ? "rotate-90" : ""
                    }`}
                  >
                    <FaChevronDown />
                  </span>
                </button>
                {mobileActiveMenu === btn.key && (
                  <div className="bg-gray-100 dark:bg-[#23272f] rounded-lg overflow-hidden mt-1">
                    {btn.key === "category" ? (
                      <button
                        onClick={() => setIsFormModalOpen(true)}
                        className="block w-full text-left px-4 py-3 text-[1rem] font-semibold text-gray-800 dark:text-white border-b border-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/30 transition"
                        style={{
                          background:
                            "linear-gradient(90deg, #f4433608 0%, #ff980008 100%)",
                        }}
                      >
                        New
                      </button>
                    ) : btn.key === "application" ? (
                      <button
                        onClick={() => setIsApplicationFormOpen(true)}
                        className="block w-full text-left px-4 py-3 text-[1rem] font-semibold text-gray-800 dark:text-white border-b border-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/30 transition"
                        style={{
                          background:
                            "linear-gradient(90deg, #f4433608 0%, #ff980008 100%)",
                        }}
                      >
                        New
                      </button>
                    ) : (
                      <a
                        href={btn.newHref}
                        className="block w-full px-4 py-3 text-[1rem] font-semibold text-gray-800 dark:text-white border-b border-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/30 transition"
                        style={{
                          background:
                            "linear-gradient(90deg, #f4433608 0%, #ff980008 100%)",
                        }}
                      >
                        New
                      </a>
                    )}

                    <a
                      href={btn.viewHref}
                      className="block w-full px-4 py-3 text-[1rem] font-semibold text-gray-800 dark:text-white hover:bg-orange-50 dark:hover:bg-orange-900/30 transition"
                      style={{
                        background:
                          "linear-gradient(90deg, #f4433608 0%, #ff980008 100%)",
                      }}
                    >
                      View
                    </a>
                  </div>
                )}
              </div>
            ))}
            {/* Mobile Logout Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full mt-2 px-4 py-3 rounded-md font-semibold text-white bg-red-500 hover:bg-red-600 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
            >
              <span className="flex items-center gap-2">
                <IoLogOut /> Logout
              </span>
            </button>
          </div>
        </div>
      )}
      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-lg text-black font-semibold mb-4">
              Confirm Logout
            </h2>
            <p className="mb-4 text-gray-700 ">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="mr-2 px-4 py-2 rounded-md text-gray-700 bg-gray-300 hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md text-white bg-red-500 hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {isApplicationFormOpen && (
        <AddNewApplication
          setIsApplicationFormOpen={setIsApplicationFormOpen}
        />
      )}
      {isFormModalOpen && (
        <AddNewCategory setIsFormModalOpen={setIsFormModalOpen} />
      )}
    </nav>
  );
};

export default Navbar;
