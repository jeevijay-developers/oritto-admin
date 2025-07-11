import React from "react";
import { getAttributeById } from "../../../../../server/admin";
import UpdateAttributes from "@/components/attributes/UpdateAttribute";

const Page = async ({ params }) => {
  const { id } = await params;
  const attributes = await getAttributeById(id);
  return (
    // <div>
    <UpdateAttributes attribute={attributes} />
    // </div>
  );
};

export default Page;
