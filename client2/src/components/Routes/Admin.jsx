import { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { Outlet, useNavigate } from "react-router-dom";
import Spinner from "../Spinner";
import axios from "axios"; // ✅ Make sure axios is imported

const Admin = () => {
  const [auth] = useAuth();
  const [ok, setOK] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/api/auth/admin/dashboard", {
          headers: {
            Authorization: auth?.token,
          },
        });

        if (res.data.ok) {
          setOK(true);
        } else {
          setOK(false);
          navigate("/signin");
        }
      } catch (error) {
        console.error("Error verifying admin:", error);
        setOK(false);
        navigate("/signin");
      }
    };

    if (auth?.token) checkAuth(); // ✅ only run if token exists
  }, [auth?.token, navigate]);

  return ok ? <Outlet /> : <Spinner path="" />;
};

export default Admin;
