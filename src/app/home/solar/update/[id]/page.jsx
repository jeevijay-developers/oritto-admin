import React from "react";
import { getSolarById } from "@/server/admin";
import ManageSolar from "@/components/solar/ManageSolar";
import UpdateSolar from "@/components/solar/UpdateSolar";
const Page = async ({ params }) => {
  const { id } = await params;
  const solar = await getSolarById(id);
  return (
    <div className="w-full">
      <UpdateSolar solar={solar} />
    </div>
  );
};

export default Page;
