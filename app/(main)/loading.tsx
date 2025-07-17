import React from "react";
import Spiner from "../loading";

function Loading() {
  return (
    <div className="h-screen grid place-items-center">
      <Spiner />
    </div>
  );
}

export default Loading;
