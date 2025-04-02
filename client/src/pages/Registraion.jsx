import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../composables/useUser";
import Swal from "sweetalert2";

const Registraion = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fname: "",
    lname: "",
    email: "",
    tel: "",
    role: "USER",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const [key, value] of Object.entries(formData)) {
      if (!value.trim()) {
        Swal.fire({
          title: "ข้อผิดพลาด!",
          text: `กรุณากรอก ${key} ให้ครบถ้วน`,
          icon: "warning",
          confirmButtonText: "ตกลง",
        });
        return;
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Swal.fire({
        title: "ข้อผิดพลาด!",
        text: "กรุณากรอกอีเมลให้ถูกต้อง",
        icon: "warning",
        confirmButtonText: "ตกลง",
      });
      return;
    }

    const telRegex = /^\d{10}$/;
    if (!telRegex.test(formData.tel)) {
      Swal.fire({
        title: "ข้อผิดพลาด!",
        text: "กรุณากรอกเบอร์โทรศัพท์ 10 หลัก",
        icon: "warning",
        confirmButtonText: "ตกลง",
      });
      return;
    }

    const usernameRegex = /^[A-Za-z0-9_]+$/;
    if (!usernameRegex.test(formData.username)) {
      Swal.fire({
        title: "ข้อผิดพลาด!",
        text: "กรุณากรอก username เป็นภาษาอังกฤษเท่านั้น",
        icon: "warning",
        confirmButtonText: "ตกลง",
      });
      return;
    }

    const passwordRegex = /^[A-Za-z0-9]+$/;
    if (!passwordRegex.test(formData.password)) {
      Swal.fire({
        title: "ข้อผิดพลาด!",
        text: "กรุณากรอก password เป็นภาษาอังกฤษเท่านั้น",
        icon: "warning",
        confirmButtonText: "ตกลง",
      });
      return;
    }

    try {
      const response = await register(
        formData.username,
        formData.password,
        formData.fname,
        formData.lname,
        formData.tel,
        formData.email,
        formData.role
      );

      if (response.success) {
        Swal.fire({
          title: "สำเร็จ!",
          text: "สมัครสมาชิกสำเร็จ!",
          icon: "success",
          timer: 1000,
          timerProgressBar: true,
        }).then(() => {
          navigate("/login");
        });
      }
    } catch (error) {
      if (error.response.data.message === "This email is already taken") {
        Swal.fire({
          title: "เกิดข้อผิดพลาด",
          text: "ไม่สามารถเพิ่มผู้ใช้งานได้เนื่องจากมีการใช้ email นี้ไปแล้ว",
          icon: "warning",
          confirmButtonText: "ตกลง",
        });
      } else if (error.response.data.message === "username is already exist") {
        Swal.fire({
          title: "เกิดข้อผิดพลาด",
          text: "ไม่สามารถเพิ่มผู้ใช้งานได้เนื่องจากมีการใช้ username นี้ไปแล้ว",
          icon: "warning",
          confirmButtonText: "ตกลง",
        });
      } else {
        Swal.fire({
          title: "เกิดข้อผิดพลาด",
          text: error.message || "ไม่สามารถเพิ่มผู้ใช้งานได้",
          icon: "error",
          confirmButtonText: "ตกลง",
        });
      }
    }
  };

  return (
    <>
      <div className="w-[50%] border-gray-300 rounded-tl-lg rounded-bl-lg p-8 pb-12 flex flex-col justify-between bg-gradient-to-b from-[#f5faff] to-[#e9f3fc]">
        <div>
          <h1 className="text-4xl font-bold text-center text-[#0d4fa4]">
            สมัครสมาชิก
          </h1>
          <p className="text-center text-gray-600 mt-6 leading-relaxed">
            กรุณากรอกข้อมูลของคุณเพื่อสมัครสมาชิกและเป็นส่วนหนึ่งของเรา
            <br />
            เมื่อเป็นสมาชิก คุณจะสามารถเข้าถึงสิทธิพิเศษต่าง ๆ เช่น
            <br />
            <span className="font-medium text-gray-700">
              เนื้อหาพิเศษ โปรโมชั่นสุดคุ้ม
              และข่าวสารอัปเดตใหม่ล่าสุดได้ก่อนใคร!
            </span>
          </p>
        </div>
        <div className="text-center text-5xl font-[Pacifico] text-[#0d4fa4]">
          The AI Football Desk
        </div>
        <div className="mt-8 text-center">
          <p className="text-gray-600">มีบัญชีผู้ใช้งานอยู่แล้ว?</p>
          <Link
            to={"/login"}
            className="mt-2 text-[#0d4fa4] hover:text-blue-700 underline font-medium"
          >
            เข้าสู่ระบบ
          </Link>
        </div>
      </div>

      <div className="flex flex-col w-[50%] m-12">
        <div className="flex gap-2">
          <div className="container-input w-full">
            <label>
              ชื่อผู้ใช้งาน <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="username"
              placeholder="ชื่อผู้ใช้งาน"
              className="input-field"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="container-input w-full">
            <label>
              รหัสผ่าน <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="รหัสผ่าน"
              className="input-field w-full"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <div className="container-input w-full">
            <label>
              ชื่อ <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="fname"
              placeholder="ชื่อ"
              className="input-field"
              value={formData.fname}
              onChange={handleChange}
            />
          </div>
          <div className="container-input w-full">
            <label>
              นามสกุล <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="lname"
              placeholder="นามสกุล"
              className="input-field"
              value={formData.lname}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="container-input w-full mt-4">
          <label>
            อีเมล์ <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="อีเมล์"
            className="input-field"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="container-input w-full mt-4">
          <label>
            เบอร์โทร <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="tel"
            placeholder="เบอร์โทร"
            className="input-field"
            value={formData.tel}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button type="button" className="btn-cancel text-md">
            ยกเลิก
          </button>
          <button
            type="submit"
            className="btn-success text-md"
            onClick={handleSubmit}
          >
            สมัครสมาชิก
          </button>
        </div>
      </div>
    </>
  );
};

export default Registraion;
