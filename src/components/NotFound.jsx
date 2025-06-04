import Image from "next/image";
import React from "react";

const NotFound = ({ message }) => {
  return (
    <div className="w-full h-full mx-auto flex flex-col justify-center items-center mt-10">
      <Image src="/not-found.svg" alt="" height={400} width={400} />
      <p>
        <b>{message}</b>
      </p>
    </div>
  );
};

export default NotFound;
