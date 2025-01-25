import React, { useEffect, useState } from "react";
import { fetch, update } from "../../composables/useUser";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

const UserAdminEdit = () => {
  const token = Cookies.get("token");
  const { id } = useParams();
  const [data, setData] = useState({
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
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const { username, fname, lname, tel, email, role } = data;
    if (!username || !fname || !lname || !tel || !email || !role) {
      Swal.fire({
        title: "ข้อผิดพลาด!",
        text: "กรุณากรอกข้อมูลให้ครบถ้วน",
        icon: "warning",
        confirmButtonText: "ตกลง",
      });
      return;
    }

    try {
      const response = await update(id, data);
      if (response.success) {
        Swal.fire({
          title: "สำเร็จ!",
          text: "ข้อมูลผู้ใช้งานถูกแก้ไขสำเร็จ",
          icon: "success",
          confirmButtonText: "ตกลง",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "เกิดข้อผิดพลาด",
        text: error?.message || "ไม่สามารถแก้ไขข้อมูลได้",
        icon: "error",
        confirmButtonText: "ตกลง",
      });
    }
  };

  const fetchData = async () => {
    if (token) {
      const response = await fetch(id);
      setData({
        username: response?.data?.username || "",
        password: "",
        fname: response?.data?.fname || "",
        lname: response?.data?.lname || "",
        email: response?.data?.email || "",
        tel: response?.data?.tel || "",
        role: response?.data?.role || "",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  return (
    <div className="p-4">
      <div className="h-[1px] bg-black w-full mb-4 rounded-md border-[1px]"></div>
      <form className="flex flex-col" onSubmit={handleUpdate}>
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
              value={data.username}
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
              value={data.password}
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
              value={data.fname}
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
              value={data.lname}
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
            value={data.email}
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
              value={data.tel}
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
              value={data.role}
              onChange={handleChange}
            >
              <option value="">กรุณาเลือก</option>
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            className="btn-cancel text-md"
            onClick={() => fetchData()}
          >
            ยกเลิก
          </button>
          <button type="submit" className="btn-success text-md">
            ยืนยันการเปลี่ยนแปลง
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserAdminEdit;
