import React from "react";
import UpdateCategory from "@/components/category/UpdateCategory";
const Page = async ({ params }) => {
  const { id } = await params;
  return <UpdateCategory />;
};

export default Page;
