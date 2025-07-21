import { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";

const Private = () => {
  const [auth, setAuth] = useAuth();
  const [ok, setOK] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const res = await axios.get("/api/auth/user/dashboard", {
        headers: {
          Authorization: auth?.token,
        },
      });

      if (res.data.ok) {
        setOK(true);
      } else {
        setOK(false);
      }
    };
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
};

export default Private;
