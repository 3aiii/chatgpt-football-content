import React, { useState } from "react";
import { BiSolidCategoryAlt } from "react-icons/bi";

const CategoriesAdmin = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "หมวดหมู่ตัวอย่าง 1", createdAt: "2025-01-01 10:00" },
    { id: 2, name: "หมวดหมู่ตัวอย่าง 2", createdAt: "2025-01-02 15:00" },
  ]);
  const [editingCategory, setEditingCategory] = useState(null); // เก็บข้อมูลหมวดหมู่ที่กำลังแก้ไข
  const [categoryName, setCategoryName] = useState(""); // เก็บชื่อหมวดหมู่ในฟอร์ม

  const handleEdit = (category) => {
    setEditingCategory(category);
    setCategoryName(category.name);
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    setCategoryName("");
  };

  const handleSubmit = () => {
    if (editingCategory) {
      // อัปเดตข้อมูลหมวดหมู่
      setCategories((prevCategories) =>
        prevCategories.map((cat) =>
          cat.id === editingCategory.id ? { ...cat, name: categoryName } : cat
        )
      );
      alert("แก้ไขข้อมูลสำเร็จ!");
    } else {
      // เพิ่มหมวดหมู่ใหม่
      const newCategory = {
        id: categories.length + 1,
        name: categoryName,
        createdAt: new Date().toISOString().slice(0, 16).replace("T", " "),
      };
      setCategories([...categories, newCategory]);
      alert("เพิ่มข้อมูลสำเร็จ!");
    }
    setCategoryName("");
    setEditingCategory(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("คุณต้องการลบข้อมูลนี้ใช่หรือไม่?")) {
      setCategories(categories.filter((cat) => cat.id !== id));
      alert("ลบข้อมูลสำเร็จ!");
    }
  };

  return (
    <div className="p-4">
      {/* Divider */}
      <div className="h-[1px] bg-black w-full mb-4 rounded-md border-[1px]"></div>

      {/* Header Section */}
      <h1 className="flex items-center gap-2 font-semibold text-xl mb-2">
        <BiSolidCategoryAlt />
        {editingCategory ? "แก้ไขหมวดหมู่" : "เพิ่มหมวดหมู่ใหม่"}
      </h1>
      <div className="flex mb-6 w-full">
        <div className="container-input w-full">
          <input
            type="text"
            placeholder="ชื่อหมวดหมู่"
            className="input-field"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>
        <div className="flex gap-2 justify-end ml-2">
          <button
            className="btn-success text-lg w-full cursor-pointer"
            onClick={handleSubmit}
            disabled={!categoryName.trim()}
          >
            {editingCategory ? "บันทึก" : "ยืนยัน"}
          </button>
          {editingCategory && (
            <button
              className="btn-cancel text-lg w-full"
              onClick={handleCancelEdit}
            >
              ยกเลิก
            </button>
          )}
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
            <tr>
              <th className="px-6 py-4 text-left">#</th>
              <th className="px-6 py-4 text-left">ชื่อหมวดหมู่</th>
              <th className="px-6 py-4 text-left">วันเวลาที่สร้าง</th>
              <th className="px-6 py-4 text-left"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {categories.map((category, index) => (
              <tr key={category.id}>
                <td className="px-6 py-4 text-base text-gray-700">
                  {index + 1}
                </td>
                <td className="px-6 py-4 text-base text-gray-700">
                  {category.name}
                </td>
                <td className="px-6 py-4 text-base text-gray-700">
                  {category.createdAt}
                </td>
                <td className="px-6 py-4 text-base text-gray-700 flex gap-2">
                  <button
                    className="btn-edit text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md"
                    onClick={() => handleEdit(category)}
                  >
                    แก้ไขข้อมูล
                  </button>
                  <button
                    className="btn-danger text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md"
                    onClick={() => handleDelete(category.id)}
                  >
                    ลบข้อมูล
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoriesAdmin;
