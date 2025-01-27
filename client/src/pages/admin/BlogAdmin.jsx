import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { fetchs, remove } from "../../composables/useblog";
import { formatDate } from "./../../utils/formatDate";
import Pagination from "../../components/admin/Pagination";
import Swal from "sweetalert2";

const BlogAdmin = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const fetchBlogs = async () => {
    const data = await fetchs(searchTerm, page, pageSize);
    if (data.message === "Not found this record") {
      return setBlogs([]);
    }
    setBlogs(data.data);
    setTotalPages(data.pagination.totalPages);
  };

  const handleRemove = async (blogId) => {
    const confirmResult = await Swal.fire({
      title: "คุณแน่ใจหรือไม่?",
      text: "คุณจะไม่สามารถกู้คืนข้อมูลนี้ได้อีก!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยืนยันการลบ",
      cancelButtonText: "ยกเลิก",
    });

    if (confirmResult.isConfirmed) {
      try {
        const response = await remove(blogId);
        if (response.success) {
          Swal.fire({
            title: "ลบสำเร็จ!",
            text: "ข้อมูลผู้ใช้งานถูกลบเรียบร้อยแล้ว",
            icon: "success",
            confirmButtonText: "ตกลง",
          }).then(() => {
            fetchBlogs();
          });
        } else {
          Swal.fire({
            title: "เกิดข้อผิดพลาด",
            text: response.message || "ไม่สามารถลบผู้ใช้งานได้",
            icon: "error",
            confirmButtonText: "ตกลง",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "เกิดข้อผิดพลาด",
          text: error.response?.data?.message || "ไม่สามารถลบผู้ใช้งานได้",
          icon: "error",
          confirmButtonText: "ตกลง",
        });
      }
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [searchTerm, page, pageSize]);

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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
              <th className="col-field w-[15%]">หัวข้อ</th>
              <th className="col-field">เนื้อหาข้างต้น</th>
              <th className="col-field">หมวดหมู่</th>
              <th className="col-field">ผู้สร้าง</th>
              <th className="col-field w-[10%]">วันเวลาที่สร้าง</th>
              <th className="col-field">สถานะ</th>
              <th className="px-6 py-3 w-[20%]"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {blogs.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  className="px-6 py-4 text-base text-gray-700 text-center"
                >
                  <div>
                    <p className="text-lg font-semibold">ไม่มีบทความในระบบ</p>
                    <p className="text-gray-500">
                      คุณสามารถลองค้นหาใหม่โดยใช้คำค้นหาอื่น
                      หรือเพิ่มบทความใหม่ได้โดยคลิกที่ปุ่ม
                      <span className="text-purple-500 font-medium">
                        "สร้างบทความ"
                      </span>
                      ด้านบน
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              <>
                {blogs?.map((blog, index) => (
                  <tr key={index}>
                    <td className="px-6 py-1 text-gray-700">
                      {(page - 1) * pageSize + index + 1}
                    </td>
                    <td className="px-6 py-1 text-gray-700">{blog.name}</td>
                    <td className="px-6 py-1 text-gray-700 line-clamp-3 break-words">
                      {blog.content}
                    </td>
                    <td className="px-6 py-1 text-gray-700">
                      {blog?.Category?.name}
                    </td>
                    <td className="px-6 py-1 text-gray-700">
                      {blog?.user?.username}
                    </td>
                    <td className="px-6 py-1 text-gray-700">
                      {formatDate(blog.createdAt)}
                    </td>
                    <td className="px-6 py-1 text-gray-700">{blog.status}</td>
                    <td
                      className="flex items-center justify-center gap-2 
                       text-gray-700 py-1"
                    >
                      <Link to={`/admin/blog/${blog.id}`} className="btn-edit">
                        แก้ไขข้อมูล
                      </Link>
                      <button
                        className="btn-danger"
                        onClick={() => handleRemove(blog?.id)}
                      >
                        ลบข้อมูล
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
      <div className="container mx-auto p-4">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};
export default BlogAdmin;
