import React from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import { FaHome, FaUser, FaBlogger, FaUserCircle } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";

const SidebarAdmin = () => {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path || matchPath(path, location.pathname);

  return (
    <div className="flex flex-col items-center w-[20%] min-h-screen p-4 shadow-lg">
      {/* Sidebar Header */}
      <div className="w-full pb-4 border-b-2 text-center text-4xl font-[Pacifico] text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500 from-purple-500 to-pink-500 transition duration-300">
        Control Panel
      </div>

      {/* Sidebar Links */}
      <ul className="w-full space-y-2 pt-6">
        <li>
          <Link
            to={"/admin"}
            className={`li-field ${
              isActive("/admin")
                ? "bg-gradient-to-r from-purple-500 to-indigo-500 font-semibold text-white"
                : "text-gray-700"
            }`}
          >
            <FaHome size={22} />
            <span>หน้าหลัก</span>
          </Link>
        </li>
        <li>
          <Link
            to={"/admin/users"}
            className={`li-field ${
              isActive("/admin/users") ||
              isActive("/admin/users/insert") ||
              isActive("/admin/user/:id")
                ? "bg-gradient-to-r from-purple-500 to-indigo-500 font-semibold text-white"
                : "text-gray-700"
            }`}
          >
            <FaUser size={22} />
            <span>ผู้ใช้งาน</span>
          </Link>
        </li>
        <li>
          <Link
            to={"/admin/blogs"}
            className={`li-field ${
              isActive("/admin/blogs") ||
              isActive("/admin/blogs/insert") ||
              isActive("/admin/blog/:id") ||
              isActive("/admin/categories")
                ? "bg-gradient-to-r from-purple-500 to-indigo-500 font-semibold text-white"
                : ""
            }`}
          >
            <FaBlogger size={22} />
            <span>บทความ</span>
          </Link>
        </li>
      </ul>

      <div className="mt-auto w-full">
        <div className="flex justify-center items-center gap-2 text-gray-700 font-medium mb-4">
          <FaUserCircle size={24} className="text-blue-500" />
          <span className="text-base">Sirapat Wongphatsawek</span>
        </div>
        <button className="btn-danger w-full flex items-center justify-center gap-2 py-2 rounded-lg text-white font-semibold bg-red-500 hover:bg-red-600 transition duration-200">
          <IoIosLogOut size={22} />
          <span>ออกจากระบบ</span>
        </button>
      </div>
    </div>
  );
};

export default SidebarAdmin;