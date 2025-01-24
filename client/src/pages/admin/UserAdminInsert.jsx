import React from "react";

const UserAdminInsert = () => {
  return (
    <div className="p-4">
      <div className="h-[1px] bg-black w-full mb-4 rounded-md border-[1px]"></div>
      <div className="flex flex-col">
        <div className="flex gap-2">
          <div className="container-input w-full">
            <label>
              ชื่อผู้ใช้งาน <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="ชื่อผู้ใช้งาน"
              className="input-field "
            />
          </div>
          <div className="container-input w-full">
            <label>
              รหัสผ่าน <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              placeholder="รหัสผ่าน"
              className="input-field w-full"
            />
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <div className="container-input w-full">
            <label>
              ชื่อ <span className="text-red-500">*</span>
            </label>
            <input type="text" placeholder="ชื่อ" className="input-field" />
          </div>
          <div className="container-input w-full">
            <label>
              นามสกุล <span className="text-red-500">*</span>
            </label>
            <input type="text" placeholder="นามสกุล" className="input-field" />
          </div>
        </div>
        <div className="container-input w-full mt-4">
          <label>
            อีเมล์ <span className="text-red-500">*</span>
          </label>
          <input type="text" placeholder="อีเมล์" className="input-field" />
        </div>
        <div className="flex gap-2 mt-4">
          <div className="container-input w-full">
            <label>
              เบอร์โทร <span className="text-red-500">*</span>
            </label>
            <input type="text" placeholder="เบอร์โทร" className="input-field" />
          </div>
          <div className="container-input w-full">
            <label>
              กำหนดบทบาท <span className="text-red-500">*</span>
            </label>{" "}
            <select className="border text-base p-2 focus:outline-none focus:border-black">
              <option>กรุณาเลือก</option>
              <option>USER</option>
              <option>ADMIN</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button className="btn-cancel text-md">ยกเลิก</button>
          <button className="btn-success text-md">ยืนยัน</button>
        </div>
      </div>
    </div>
  );
};

export default UserAdminInsert;
