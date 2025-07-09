import Navbar from "../../components/Navbar";
import React from "react";
import Sidebar from "../../components/Sidebar";
import { ToastContainer } from "react-toastify";
const layout = ({ children }) => {
  return (
    <div>
      {" "}
      <Navbar />
      <div className="flex flex-row">
        <Sidebar />
        <ToastContainer />
        {children}
      </div>
    </div>
  );
};

export default layout;
