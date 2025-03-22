import React, { useEffect, useState } from "react";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import { fetch, logout } from "../composables/useUser";

const Navbar = () => {
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
    <div className="flex flex-col">
      <div className="flex justify-between items-center py-4 w-[1280px]">
        <div className="flex">
          <div className="bg-white p-1 px-6 rounded-lg text-xl font-medium font-[Pacifico] text-blue-500 cursor-default">
            The AI Football Desk
          </div>
          <ul className="flex text-center text-white items-center gap-x-6 ml-6 text-xl font-semibold">
            <li>
              <Link
                className={`hover:border-b-2 transition ${
                  location.pathname === "/" ? `border-b-2` : ``
                }`}
                to={"/"}
              >
                หน้าหลัก
              </Link>
            </li>
            <li>
              <Link
                className={`hover:border-b-2 transition ${
                  location.pathname === "/blogs" ||
                  matchPath("/blog/:id", location.pathname) ||
                  matchPath("/category/:name", location.pathname)
                    ? `border-b-2`
                    : ``
                }`}
                to={"/blogs"}
              >
                บทความ
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex">
          <div className="mr-4 border-r-2 rounded-md"></div>
          {token ? (
            <div className="flex gap-4">
              <div className="flex items-center text-white text-lg font-bold">
                {data?.data?.fname} {data?.data?.lname}
              </div>
              <Link to={"/edit/1"} className="btn-primary font-bold">
                ดูข้อมูล
              </Link>
              <button className="btn-primary font-bold" onClick={handleLogout}>
                ออกจากระบบ
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to={"/login"} className="btn-primary font-bold">
                เข้าสู่ระบบ
              </Link>
              <Link to={"/register"} className="btn-primary font-bold">
                สมัครสมาชิก
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
