import React from "react";
import { useAuth } from "../context/authContext";

const Home = () => {
  const [auth, setAuth] = useAuth();

  return (
    <>
      <h1>home</h1>
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </>
  );
};

export default Home;
