"use client";
import React, { useEffect, useState } from "react";
import sidebar from "@/layout/sidebar";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
const Sidebar = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [mobileScreen, setMobileScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setOpenSidebar(false);
        setMobileScreen(true);
      } else {
        setOpenSidebar(true);
        setMobileScreen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="md:w-[35%]  lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div
        className={` h-fit bg-gray-800 md:w-[100%] lg:w-[100%] md:relative absolute  top-0 left-0  md:shadow-lg pb-15  ${
          mobileScreen && openSidebar
            ? "w-[350px]"
            : "w-[0px] md:w-[35%] lg:w-[30%] overflow-hidden "
        } transition-all duration-300 ease-in-out `}
      >
        <ul className="h-fit">
          {sidebar.map((item, index) => (
            <li
              key={index}
              className="text-white p-4  cursor-pointer relative md:top-0 top-15 "
            >
              <h2 className="font-bold text-lg">{item.name}</h2>
              <ul className="mt-2">
                {item.links.map((link, linkIndex) => (
                  <li
                    key={linkIndex}
                    className="text-gray-300 hover:text-white ml-2"
                  >
                    -{" "}
                    <Link className="text-sm" href={link.path}>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      {openSidebar ? (
        <div
          className="flex items-center justify-center md:hidden absolute top-2 right-0 z-10  bg-gray-800 p-4"
          onClick={() => setOpenSidebar(false)}
        >
          <IoIosArrowBack className="text-3xl font-bold" color="white" />
        </div>
      ) : (
        <div
          className="flex items-center justify-center md:hidden absolute top-2 right-0  bg-gray-800 p-4"
          onClick={() => setOpenSidebar(true)}
        >
          <IoIosArrowForward className="text-3xl font-bold" color="white" />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
