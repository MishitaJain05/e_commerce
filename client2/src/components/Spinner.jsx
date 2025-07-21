import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Spinner = ({ path = "/signin" }) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 &&
      navigate(`${path}`, {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-center text-2xl mb-6">
        Redirecting in {count} seconds...
      </h1>
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-800"></div>
      </div>
    </div>
  );
};

export default Spinner;
