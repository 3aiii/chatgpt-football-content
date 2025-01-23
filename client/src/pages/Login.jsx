import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
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
            className="input-field w-full"
          />
        </div>
        <div className="container-input w-full mt-4">
          <label>รหัสผ่าน</label>
          <input
            type="password"
            placeholder="รหัสผ่าน"
            className="input-field w-full"
          />
        </div>
        <div className="flex justify-end gap-2 mt-8">
          <button className="btn-success text-lg w-full">เข้าสู่ระบบ</button>
        </div>
      </div>
    </>
  );
};

export default Login;
