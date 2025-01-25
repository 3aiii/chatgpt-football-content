import React, { useEffect, useState } from "react";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaUser, FaBlogger, FaUserCircle } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import { fetch } from "../../composables/useUser";

const SidebarAdmin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const [data, setData] = useState([]);

  const handleLogout = async () => {
    // Decode token เพื่อใช้ข้อมูล
    const decoded = jwtDecode(token);

    Swal.fire({
      title: "ยืนยันการออกจากระบบ",
      text: "คุณแน่ใจหรือว่าต้องการออกจากระบบ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ใช่, ออกจากระบบ",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await logout(decoded?.userId);

          if (response.success) {
            Swal.fire({
              title: "สำเร็จ!",
              text: "ออกจากระบบสำเร็จ!",
              icon: "success",
              timer: 1000,
              timerProgressBar: true,
            }).then(() => {
              Cookies.remove("token");
              navigate("/login");
            });
          } else {
            Swal.fire({
              title: "ข้อผิดพลาด!",
              text: response.message || "ไม่สามารถออกจากระบบได้",
              icon: "error",
              confirmButtonText: "ตกลง",
            });
          }
        } catch (error) {
          Swal.fire({
            title: "เกิดข้อผิดพลาด!",
            text: error.message || "เกิดข้อผิดพลาดบางอย่าง กรุณาลองใหม่",
            icon: "error",
            confirmButtonText: "ลองใหม่",
          });
        }
      }
    });
  };

  const isActive = (path) =>
    location.pathname === path || matchPath(path, location.pathname);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        const decoded = jwtDecode(token);
        const response = await fetch(decoded?.userId);
        setData(response);
      } else {
        setData([]);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="flex flex-col items-center w-[20%] min-h-screen p-4 shadow-lg">
      {/* Sidebar Header */}
      <div className="w-full pb-4 border-b-2 text-center text-4xl font-[Pacifico] text-transparent bg-clip-text bg-gradient-to-r bg-from-blue-500 bg-to-indigo-500 from-purple-500 to-pink-500 transition duration-300">
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
          <span className="text-base">
            {data?.data?.fname} {data?.data?.lname}
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="btn-danger w-full flex items-center justify-center gap-2 py-2 rounded-lg text-white font-semibold bg-red-500 hover:bg-red-600 transition duration-200"
        >
          <IoIosLogOut size={22} />
          <span>ออกจากระบบ</span>
        </button>
      </div>
    </div>
  );
};

export default SidebarAdmin;
