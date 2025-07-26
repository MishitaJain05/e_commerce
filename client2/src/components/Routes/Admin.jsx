import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import Spinner from "../Spinner";

const Admin = () => {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/auth/admin/dashboard",
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          }
        );

        if (res.data?.ok) {
          setOk(true);
        } else {
          navigate("/signin");
        }
      } catch (err) {
        navigate("/signin");
      }
    };

    if (auth?.token) checkAdmin();
    else navigate("/signin");
  }, [auth?.token, navigate]);

  return ok ? <Outlet /> : <Spinner />;
};

export default Admin;
