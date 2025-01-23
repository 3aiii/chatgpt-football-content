import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const isLogin = true;

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center py-4 w-[1280px]">
        <div className="flex">
          <div className="text-xl font-semibold font-[Pacifico] text-blue-500 cursor-default">
            The AI Football Desk
          </div>
          <ul className="flex text-center text-white items-center gap-x-6 ml-6 text-xl font-semibold">
            <li>
              <Link className="hover:border-b-2 transition" to={"/"}>
                หน้าหลัก
              </Link>
            </li>
            <li>
              <Link className="hover:border-b-2 transition" to={"/blogs"}>
                บทความ
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center gap-2 transition"
                to={"/system"}
              >
                ใช้งานระบบ{" "}
                <div className="bg-blue-500 text-xs rounded-md px-4 py-[2px]">
                  แนะนำ
                </div>
                {/* <MdRecommend className="text-blue-500"/> */}
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex">
          <div className="mr-4 border-r-2 rounded-md"></div>
          {isLogin ? (
            <div className="flex gap-4">
              <div className="flex items-center text-white text-lg font-bold">
                Sirapat Wongphatsawek
              </div>
              <Link to={"/edit/1"} className="btn-primary font-bold">
                ดูข้อมูล
              </Link>
              <button className="btn-primary font-bold">ออกจากระบบ</button>
            </div>
          ) : (
            <Link to={"/register"} className="btn-primary font-bold">
              สมัครสมาชิก
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
