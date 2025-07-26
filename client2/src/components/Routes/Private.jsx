import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";
import axios from "axios";

const Private = () => {
  const [auth] = useAuth();
  const [ok, setOK] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const res = await axios.get("/api/auth/user/dashboard", {
        headers: { Authorization: `Bearer ${auth?.token}` },
      });
      setOK(res.data.ok);
    };

    if (auth?.token) checkAuth();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
};

export default Private;
