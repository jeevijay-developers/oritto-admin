import React from "react";
import { fetchAllSolar } from "@/server/admin";
import ListSolar from "@/components/solar/ListSolar";
const Page = async () => {
  const solars = await fetchAllSolar();
  return (
    <div className="w-full">
      <ListSolar solars={solars} />
    </div>
  );
};

export default Page;
