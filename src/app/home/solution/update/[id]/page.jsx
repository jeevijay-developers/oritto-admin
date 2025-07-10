import React from "react";
import { getSolutionById } from "../../../../../server/admin";
import UpdateSolution from "../../../../../components/solution/UpdateSolution";

const Page = async ({ params }) => {
  const { id } = await params;
  const solution = await getSolutionById(id);
  return <UpdateSolution solution={solution} />;
};

export default Page;
