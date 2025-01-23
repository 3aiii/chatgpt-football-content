import React from "react";
import { Outlet } from "react-router-dom";
import SidebarAdmin from "../components/admin/SidebarAdmin";

const Admin = () => {
  return (
    <div className="flex">
      <SidebarAdmin />
      <Outlet />
    </div>
  );
};

export default Admin;
