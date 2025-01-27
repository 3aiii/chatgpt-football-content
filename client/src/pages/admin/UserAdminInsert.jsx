import React, { useState } from "react";
import Swal from "sweetalert2";
import { register } from "../../composables/useUser";

const UserAdminInsert = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fname: "",
    lname: "",
    tel: "",
    email: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const reset = async () => {
    setFormData({
      username: "",
      password: "",
      fname: "",
      lname: "",
      tel: "",
      email: "",
      role: "",
    });
  };

  const create = async (data) => {
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
          text: "เพิ่มผู้ใช้งานสำเร็จ",
          icon: "success",
          confirmButtonText: "ตกลง",
        });
        setFormData({
          username: "",
          password: "",
          fname: "",
          lname: "",
          tel: "",
          email: "",
          role: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, password, fname, lname, tel, email, role } = formData;

    if (!username || !password || !fname || !lname || !tel || !email || !role) {
      Swal.fire({
        title: "ข้อผิดพลาด!",
        text: "กรุณากรอกข้อมูลให้ครบถ้วน",
        icon: "warning",
        confirmButtonText: "ตกลง",
      });
      return;
    }

    const englishOnlyRegex = /^[A-Za-z]+$/;
    if (
      !englishOnlyRegex.test(username) ||
      !englishOnlyRegex.test(password) ||
      !englishOnlyRegex.test(fname) ||
      !englishOnlyRegex.test(lname)
    ) {
      Swal.fire({
        title: "ข้อผิดพลาด!",
        text: "กรุณากรอกชื่อผู้ใช้, รหัสผ่าน, ชื่อ และนามสกุลเป็นภาษาอังกฤษเท่านั้น",
        icon: "warning",
        confirmButtonText: "ตกลง",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        title: "ข้อผิดพลาด!",
        text: "กรุณากรอกอีเมลให้ถูกต้อง",
        icon: "warning",
        confirmButtonText: "ตกลง",
      });
      return;
    }

    const telRegex = /^\d{10}$/;
    if (!telRegex.test(tel)) {
      Swal.fire({
        title: "ข้อผิดพลาด!",
        text: "กรุณากรอกเบอร์โทรให้ถูกต้อง (ตัวเลข 10 หลักเท่านั้น)",
        icon: "warning",
        confirmButtonText: "ตกลง",
      });
      return;
    }

    create(formData);
  };

  return (
    <div className="p-4">
      <div className="h-[1px] bg-black w-full mb-4 rounded-md border-[1px]"></div>
      <form className="flex flex-col" onSubmit={handleSubmit}>
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
              className="input-field"
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
            type="text"
            name="email"
            placeholder="อีเมล์"
            className="input-field"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-2 mt-4">
          <div className="container-input w-full">
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
          <div className="container-input w-full">
            <label>
              กำหนดบทบาท <span className="text-red-500">*</span>
            </label>
            <select
              name="role"
              className="border text-base p-2 focus:outline-none focus:border-black"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="">กรุณาเลือก</option>
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button type="button" className="btn-cancel text-md" onClick={reset}>
            ยกเลิก
          </button>
          <button type="submit" className="btn-success text-md">
            ยืนยัน
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserAdminInsert;
