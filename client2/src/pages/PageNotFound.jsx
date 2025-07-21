import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-9xl">404</h1>
        <h2 className="text-4xl">Page Not Found</h2>
        <Link
          to="/"
          className="text-white hover:underline bg-slate-600 px-4 py-2 rounded-md mt-4"
        >
          Go to Home
        </Link>
      </div>
    </>
  );
};

export default PageNotFound;
