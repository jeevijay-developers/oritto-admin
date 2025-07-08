import Navbar from "../../components/Navbar";
import React from "react";
import Sidebar from "../../components/Sidebar";

const layout = ({ children }) => {
  return (
    <div>
      {" "}
      <Navbar />
      <div className="flex flex-row">
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default layout;
