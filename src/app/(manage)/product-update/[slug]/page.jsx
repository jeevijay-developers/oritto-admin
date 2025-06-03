import React from "react";

const Page = async ({ params }) => {
  return <div>{params.slug}</div>;
};

export default Page;
