import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../composables/useUser";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      Swal.fire({
        title: "ข้อผิดพลาด!",
        text: "กรุณากรอกชื่อผู้ใช้งานและรหัสผ่านให้ครบถ้วน",
        icon: "warning",
        confirmButtonText: "ตกลง",
      });
      return;
    }

    try {
      const response = await login(formData.username, formData.password);

      if (response.success) {
        Cookies.set("token", response.token, {
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "Strict",
          expires: 2,
        });

        if (response.role === "ADMIN") {
          Swal.fire({
            title: "สำเร็จ!",
            text: "เข้าสู่ระบบสำเร็จ!",
            icon: "success",
            timer: 1000,
            timerProgressBar: true,
          }).then(() => {
            navigate("/admin/dashboard");
          });
        } else {
          Swal.fire({
            title: "สำเร็จ!",
            text: "เข้าสู่ระบบสำเร็จ!",
            icon: "success",
            timer: 1000,
            timerProgressBar: true,
          }).then(() => {
            navigate("/");
          });
        }
      } else {
        Swal.fire({
          title: "เข้าสู่ระบบไม่สำเร็จ!",
          text: response.message || "ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง",
          icon: "error",
          confirmButtonText: "ลองใหม่",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "เกิดข้อผิดพลาด!",
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "ตกลง",
      });
    }
  };

  return (
    <>
      <div className="w-[50%] border-gray-300 rounded-tl-lg rounded-bl-lg p-8 pb-12 flex flex-col justify-between bg-gradient-to-b from-[#f5faff] to-[#e9f3fc]">
        <div>
          <h1 className="text-4xl font-bold text-center text-[#0d4fa4]">
            เข้าสู่ระบบ
          </h1>
          <p className="text-center text-gray-600 mt-6 leading-relaxed">
            กรุณากรอกชื่อผู้ใช้งานและรหัสผ่านของคุณ
            <br />
            เพื่อเข้าสู่ระบบและใช้งานฟีเจอร์ต่าง ๆ ของเรา
            <br />
            <span className="font-medium text-gray-700">
              ติดตามข่าวสารฟุตบอลล่าสุด และสิทธิพิเศษสำหรับสมาชิก!
            </span>
          </p>
        </div>
        <div className="mt-8 text-center">
          <p className="text-gray-600">ยังไม่มีบัญชีผู้ใช้งาน?</p>
          <Link
            to={"/register"}
            className="mt-2 text-[#0d4fa4] hover:text-blue-700 underline font-medium"
          >
            สมัครสมาชิก
          </Link>
        </div>
      </div>

      <div className="flex flex-col w-[50%] m-12">
        <div className="p-8 pt-0 text-center text-5xl font-[Pacifico] text-[#0d4fa4]">
          The AI Football Desk
        </div>
        <div className="container-input w-full">
          <label>ชื่อผู้ใช้งาน</label>
          <input
            type="text"
            placeholder="ชื่อผู้ใช้งาน"
            name="username"
            className="input-field w-full"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="container-input w-full mt-4">
          <label>รหัสผ่าน</label>
          <input
            type="password"
            placeholder="รหัสผ่าน"
            name="password"
            className="input-field w-full"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-end gap-2 mt-8">
          <button className="btn-success text-lg w-full" onClick={handleSubmit}>
            เข้าสู่ระบบ
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
