import React from "react";

function FetchingError({
  message,
  refetch,
}: {
  message: string;
  refetch: () => void;
}) {
  return (
    <div className=" grid place-items-center text-center ">
      <div>
        <h2 className="heading3">Error Fetching {message}</h2>
        <p>Please try again later</p>
        <button
          className="bg-accent hover:opacity/60 mt-1 px-4 py-1 rounded cursor-pointer"
          onClick={() => refetch()}
        >
          Retry now
        </button>
      </div>
    </div>
  );
}

export default FetchingError;
