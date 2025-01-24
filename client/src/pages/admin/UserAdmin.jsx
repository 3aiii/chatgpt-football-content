import React from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";

const UserAdmin = () => {
  return (
    <div className="p-4">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        {/* Search Box */}
        <div className="flex items-center">
          <div className="flex items-center bg-[#f3f6f9] rounded-lg h-[47px] border-[2px]">
            <CiSearch className="text-3xl text-[#c5c5c5] mx-2" />
            <input
              className="bg-transparent outline-none px-2 "
              type="text"
              placeholder="คำค้นหา"
            />
          </div>
        </div>
        {/* Add User Button */}
        <Link
          className="btn-success flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-lg"
          to={"/admin/users/insert"}
        >
          <FaPlus />
          สร้างผู้ใช้งาน
        </Link>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto border-collapse">
          <thead className=" bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
            <tr>
              <th className="col-field">#</th>
              <th className="col-field">ชื่อผู้ใช้งาน</th>
              <th className="col-field">อีเมล์</th>
              <th className="col-field">เบอร์โทรศัพท์</th>
              <th className="col-field">วันเวลาที่สร้าง</th>
              <th className="col-field">บทบาท</th>
              <th className="w-[15%] lg:w-[20%] xl:w-[25%]"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 text-base text-gray-700">1</td>
              <td className="px-6 py-4 text-base text-gray-700">R1C2</td>
              <td className="px-6 py-4 text-base text-gray-700">R1C3</td>
              <td className="px-6 py-4 text-base text-gray-700">R1C3</td>
              <td className="px-6 py-4 text-base text-gray-700">R1C1</td>
              <td className="px-6 py-4 text-base text-gray-700">R1C2</td>
              <td className="px-6 py-4 text-base text-gray-700 flex gap-2">
                <Link to={"/admin/user/1"} className="btn-edit">
                  แก้ไขข้อมูล
                </Link>
                <button className="btn-danger">ลบข้อมูล</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserAdmin;
