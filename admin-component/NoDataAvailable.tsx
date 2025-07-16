import React from "react";

function NoDataAvailable({ message }: { message: string }) {
  return (
    <div className=" grid place-items-center text-center mt-32">
      <h1>{message}</h1>
    </div>
  );
}

export default NoDataAvailable;
