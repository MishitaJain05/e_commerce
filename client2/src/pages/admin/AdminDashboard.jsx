import React from "react";
import AdminMenu from "./AdminMenu.jsx";
import { useAuth } from "../../context/authContext.jsx";

const AdminDashboard = () => {
  const { auth } = useAuth();

  return (
    <>
      {/* <h1 className="text-2xl font-bold">Admin Dashboard</h1> */}
      <div>
        <AdminMenu />
        <h3>Admin : {auth?.user?.name}</h3>
      </div>
    </>
  );
};

export default AdminDashboard;
