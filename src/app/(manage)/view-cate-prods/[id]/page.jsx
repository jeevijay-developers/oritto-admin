import React from "react";
import CategoryProducts from "../../../../components/admin/category/CategoryProducts";

const page = async ({ params }) => {
  const { id } = await params;
  return (
    <div>
      <CategoryProducts id={id} />
    </div>
  );
};

export default page;
