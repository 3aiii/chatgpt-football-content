import React, { useEffect, useState } from "react";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { fetchs, create, update, remove } from "../../composables/useCate";
import Swal from "sweetalert2";
import Pagination from "../../components/admin/Pagination";
import { formatDate } from "../../utils/formatDate";

const CategoriesAdmin = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null); // เก็บข้อมูลหมวดหมู่ที่กำลังแก้ไข
  const [categoryName, setCategoryName] = useState(""); // เก็บชื่อหมวดหมู่ในฟอร์ม
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [totalPages, setTotalPages] = useState(1);

  // เพิ่มหรือแก้ไขหมวดหมู่
  const handleSubmit = async () => {
    try {
      if (editingCategory) {
        // แก้ไขหมวดหมู่
        await update({ name: categoryName }, editingCategory.id);
        Swal.fire({
          icon: "success",
          title: "สำเร็จ",
          text: "แก้ไขหมวดหมู่สำเร็จ!",
        }).then(() => {
          loadCategories();
        });
      } else {
        // เพิ่มหมวดหมู่ใหม่
        await create({ name: categoryName });
        Swal.fire({
          icon: "success",
          title: "สำเร็จ",
          text: "เพิ่มหมวดหมู่ใหม่สำเร็จ!",
        }).then(() => {
          loadCategories();
        });
      }
      setCategoryName("");
      setEditingCategory(null);
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: error.message,
      });
    }
  };

  // ลบหมวดหมู่
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "ยืนยันการลบ",
      text: "คุณต้องการลบข้อมูลนี้ใช่หรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    });

    if (result.isConfirmed) {
      try {
        await remove(id); // เรียก API เพื่อลบหมวดหมู่
        Swal.fire({
          icon: "success",
          title: "สำเร็จ",
          text: "ลบหมวดหมู่สำเร็จ!",
        }).then(() => {
          loadCategories();
        });
      } catch (error) {
        await Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: error.message,
        });
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    setCategoryName("");
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const loadCategories = async () => {
    try {
      const data = await fetchs(page, pageSize);
      setCategories(data);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: error.message,
      });
    }
  };

  useEffect(() => {
    loadCategories();
  }, [page, pageSize]);

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
            {categories?.data?.map((category, index) => (
              <tr key={category.id}>
                <td className="px-6 py-4 text-base text-gray-700">
                  {(page - 1) * pageSize + index + 1}
                </td>
                <td className="px-6 py-4 text-base text-gray-700">
                  {category.name}
                </td>
                <td className="px-6 py-4 text-base text-gray-700">
                  {formatDate(category?.createdAt)}
                </td>
                <td className="px-6 py-4 text-base text-gray-700 flex gap-2">
                  <button
                    className="btn-edit text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md"
                    onClick={() => {
                      setEditingCategory(category);
                      setCategoryName(category.name);
                    }}
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
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default CategoriesAdmin;
