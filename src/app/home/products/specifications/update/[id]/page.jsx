import React from "react";
import { getProductsById } from "../../../../../../server/admin";
import AddMechanicalFeatures from "@/components/products/AddMechanicalFeatures";
const Page = async ({ params }) => {
  const { id } = await params;
  const prod = await getProductsById(id); // Assuming you have a function to fetch product by ID
  return <AddMechanicalFeatures product={prod} />;
};

export default Page;
