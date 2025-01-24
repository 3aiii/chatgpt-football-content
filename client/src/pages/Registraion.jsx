import React from "react";
import { Link } from "react-router-dom";

const Registraion = () => {
  return (
    <>
      <div className="w-[50%] border-gray-300 rounded-tl-lg rounded-bl-lg  p-8 pb-12 flex flex-col justify-between bg-gradient-to-b from-[#f5faff] to-[#e9f3fc]">
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
        <div className="container-input w-full mt-4">
          <label>
            เบอร์โทร <span className="text-red-500">*</span>
          </label>
          <input type="text" placeholder="เบอร์โทร" className="input-field" />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button className="btn-cancel text-md">ยกเลิก</button>
          <button className="btn-success text-md">สมัครสมาชิก</button>
        </div>
      </div>
    </>
  );
};

export default Registraion;
