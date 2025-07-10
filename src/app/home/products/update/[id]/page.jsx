import React from "react";
import UpdateProducts from "../../../../../components/products/UpdateProducts";
import { getProductsById } from "../../../../../server/admin";
const Page = async ({ params }) => {
  const { id } = await params;
  const prods = await getProductsById(id);
  return (
    <div className="w-full">
      <UpdateProducts prods={prods} />
    </div>
  );
};

export default Page;
