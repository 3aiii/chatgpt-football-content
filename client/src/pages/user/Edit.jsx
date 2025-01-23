import React from "react";
import { FaRegEdit } from "react-icons/fa";

const Edit = () => {
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
                placeholder="ชื่อผู้ใช้งาน"
                type="text"
                className="input-field w-full"
              />
            </div>
            <div className="container-input w-full">
              <label>รหัสผ่าน</label>
              <input
                placeholder="รหัสผ่าน"
                type="password"
                className="input-field w-full"
              />
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            <div className="container-input w-full">
              <label>ชื่อ</label>
              <input
                placeholder="ชื่อ"
                type="text"
                className="input-field w-full"
              />
            </div>
            <div className="container-input w-full">
              <label>นามสกุล</label>
              <input
                placeholder="นามสกุล"
                type="text"
                className="input-field w-full"
              />
            </div>
          </div>
          <div className="container-input mt-2">
            <label>อีเมล์</label>
            <input
              placeholder="อีเมล์"
              type="text"
              className="input-field w-full"
            />
          </div>
          <div className="container-input mt-2">
            <label>เบอร์โทร</label>
            <input
              placeholder="เบอร์โทร"
              type="text"
              className="input-field w-full"
            />
          </div>
          <div className="flex justify-end">
            <button className="btn-success mt-4">ยืนยันการเปลี่ยนแปลง</button>
          </div>
        </div>
        <div className="flex justify-center items-center w-[50%]">
          <img
            src="/public/fruit_object.png"
            className="w-[400px] h-[400px] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Edit;
