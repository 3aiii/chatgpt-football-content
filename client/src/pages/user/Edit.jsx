import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { fetch, update } from "../../composables/useUser";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

const Edit = () => {
  const [data, setData] = useState({
    userId: "",
    username: "",
    password: "",
    fname: "",
    lname: "",
    email: "",
    tel: "",
    role: "USER",
  });
  const [isLoading, setIsLoading] = useState(false);
  const token = Cookies.get("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const decoded = jwtDecode(token);
      const response = await update(decoded.userId, data);
      if (response.success) {
        Swal.fire({
          title: "สำเร็จ!",
          text: "ข้อมูลของคุณได้รับการอัปเดตเรียบร้อยแล้ว!",
          icon: "success",
          confirmButtonText: "ตกลง",
        }).then(() => {
          window.location.reload();
        });
      } else {
        Swal.fire({
          title: "ข้อผิดพลาด!",
          text: response.message || "ไม่สามารถอัปเดตข้อมูลได้",
          icon: "error",
          confirmButtonText: "ลองใหม่",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "เกิดข้อผิดพลาด!",
        text: error.message,
        icon: "error",
        confirmButtonText: "ลองใหม่",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        const decoded = jwtDecode(token);
        const response = await fetch(decoded?.userId);
        setData({
          userId: response?.data?.id,
          username: response?.data?.username || "",
          password: "",
          fname: response?.data?.fname || "",
          lname: response?.data?.lname || "",
          email: response?.data?.email || "",
          tel: response?.data?.tel || "",
          role: "USER",
        });
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="flex justify-center items-center">
      <div className="flex w-[1280px] rounded-md p-4 border-[1px]">
        <div className="w-[50%]">
          <h1 className="flex items-center gap-2 text-4xl font-semibold text-[#37003c]">
            <FaRegEdit />
            แก้ไขข้อมูลส่วนตัว
          </h1>
          <div className="flex gap-2 mt-4">
            <div className="container-input w-full">
              <label>ชื่อผู้ใช้งาน</label>
              <input
                name="username"
                placeholder="ชื่อผู้ใช้งาน"
                type="text"
                className="input-field w-full"
                value={data.username}
                onChange={handleChange}
              />
            </div>
            <div className="container-input w-full">
              <label>รหัสผ่าน</label>
              <input
                name="password"
                placeholder="รหัสผ่าน"
                type="password"
                className="input-field w-full"
                value={data.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            <div className="container-input w-full">
              <label>ชื่อ</label>
              <input
                name="fname"
                placeholder="ชื่อ"
                type="text"
                className="input-field w-full"
                value={data.fname}
                onChange={handleChange}
              />
            </div>
            <div className="container-input w-full">
              <label>นามสกุล</label>
              <input
                name="lname"
                placeholder="นามสกุล"
                type="text"
                className="input-field w-full"
                value={data.lname}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="container-input mt-2">
            <label>อีเมล์</label>
            <input
              name="email"
              placeholder="อีเมล์"
              type="text"
              className="input-field w-full"
              value={data.email}
              onChange={handleChange}
            />
          </div>
          <div className="container-input mt-2">
            <label>เบอร์โทร</label>
            <input
              name="tel"
              placeholder="เบอร์โทร"
              type="text"
              className="input-field w-full"
              value={data.tel}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-end">
            <button
              className="btn-success mt-4"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "กำลังอัปเดต..." : "ยืนยันการเปลี่ยนแปลง"}
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center w-[50%]">
          <img
            src="/fruit_object.png"
            className="w-[400px] h-[400px] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Edit;
