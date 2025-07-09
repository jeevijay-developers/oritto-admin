import React from "react";
import UpdateCategory from "@/components/category/UpdateCategory";
import { getCategoryById } from "../../../../../server/admin";
const Page = async ({ params }) => {
  const { id } = await params;
  const category = await getCategoryById(id);
  return <UpdateCategory category={category} />;
};

export default Page;
