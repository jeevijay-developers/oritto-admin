import React from "react";
import { fetchAllSolar } from "@/server/admin";
import ManageSolar from "@/components/solar/ManageSolar";
const Page = async () => {
  const solars = await fetchAllSolar();
  return (
    <div className="w-full">
      <ManageSolar solars={solars} />
    </div>
  );
};

export default Page;
