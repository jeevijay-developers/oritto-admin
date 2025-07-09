import Link from "next/link";
import React from "react";

const UpdateCategory = () => {
  return (
    <div>
      <div className="text-xl flex flex-row gap-2">
        <div>
          <Link className="hover:text-blue-900" href={"/home"}>
            Home
          </Link>
        </div>
        /
        <div>
          <Link className="hover:text-blue-900" href={"/home/category"}>
            Categories
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UpdateCategory;
