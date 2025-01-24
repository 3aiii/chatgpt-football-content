import React from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";

const BlogAdmin = () => {
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
        <div className="flex gap-2">
          <Link
            className="btn-info flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-lg"
            to={"/admin/categories"}
          >
            <FaPlus />
            หมวดหมู่ของบทความ
          </Link>
          <Link
            className="btn-success flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-lg"
            to={"/admin/blogs/insert"}
          >
            <FaPlus />
            สร้างบทความ
          </Link>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto border-collapse">
          <thead className=" bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
            <tr>
              <th className="col-field">#</th>
              <th className="col-field">หัวข้อ</th>
              <th className="col-field">เนื้อหาข้างต้น</th>
              <th className="col-field">หมวดหมู่</th>
              <th className="col-field">ผู้สร้าง</th>
              <th className="col-field">วันเวลาที่สร้าง</th>
              <th className="col-field">สถานะ</th>
              <th className="w-[20%]"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 text-base text-gray-700">1</td>
              <td className="px-6 py-4 text-base text-gray-700">R1C2</td>
              <td className="px-6 py-4 text-base text-gray-700">R1C3</td>
              <td className="px-6 py-4 text-base text-gray-700">R1C1</td>
              <td className="px-6 py-4 text-base text-gray-700">R1C2</td>
              <td className="px-6 py-4 text-base text-gray-700">R1C2</td>
              <td className="px-6 py-4 text-base text-gray-700">R1C2</td>
              <td className="px-6 py-4 text-base text-gray-700 flex gap-2">
                <Link to={"/admin/blog/1"} className="btn-edit">
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
export default BlogAdmin;
