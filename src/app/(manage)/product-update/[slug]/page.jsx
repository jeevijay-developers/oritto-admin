import React from "react";
import UpdateProduct from "../../../../components/admin/products/UpdateProduct";

const Page = async ({ params }) => {
  const { slug } = await params;
  return (
    <div>
      <UpdateProduct slug={slug} />{" "}
    </div>
  );
};

export default Page;
