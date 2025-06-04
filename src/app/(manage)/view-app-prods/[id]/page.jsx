import React from "react";
import ApplicationProducts from "../../../../components/admin/application/ApplicationProducts";
const page = async ({ params }) => {
  const id = params.id;
  return (
    <div>
      <ApplicationProducts id={id} />{" "}
    </div>
  );
};

export default page;
