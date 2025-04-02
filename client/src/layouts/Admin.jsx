import React, { useEffect } from "react";
import { Outlet, useLocation, matchPath, useNavigate } from "react-router-dom";
import SidebarAdmin from "../components/admin/SidebarAdmin";
import { FaFolderOpen } from "react-icons/fa";
import { verification } from "../utils/verification";

const Admin = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getPathName = (path) => {
    if (matchPath("/admin/user/:id", path)) {
      return "ผู้ใช้งานทั้งหมด / แก้ไขผู้ใช้งาน";
    }

    if (matchPath("/admin/blog/:id", path)) {
      return "บทความทั้งหมด / แก้ไขบทความ";
    }

    switch (path) {
      case "/admin/dashboard":
        return "หน้าหลัก";
      case "/admin/users":
        return "ผู้ใช้งานทั้งหมด";
      case "/admin/users/insert":
        return "ผู้ใช้งานทั้งหมด / เพิ่มผู้ใช้งาน";
      case "/admin/blogs":
        return "บทความทั้งหมด";
      case "/admin/blogs/insert":
        return "บทความทั้งหมด / เพิ่มบทความใหม่";
      case "/admin/categories":
        return "บทความทั้งหมด / หมวดหมู่ทั้งหมด";
      case "/admin/system":
        return "บทความทั้งหมด / ใช้งาน Generate ข้อความ";
      default:
        return "หน้าที่ไม่รู้จัก";
    }
  };

  const pathName = getPathName(location.pathname);

  useEffect(() => {
    const verify = verification();

    if (!verify) {
      navigate(`/login`);
    }
  }, []);

  return (
    <div className="flex">
      <SidebarAdmin />
      <div className="bg-gray-100 w-full min-h-screen p-4">
        <h1 className="flex items-center gap-4 text-2xl text-gray-700 font-semibold my-4 ml-4 mb-0">
          <FaFolderOpen />
          {pathName}
        </h1>
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
