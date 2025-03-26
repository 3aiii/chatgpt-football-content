import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { fetchs, remove } from "./../../composables/useUser";
import { formatDate } from "./../../utils/formatDate";
import Pagination from "../../components/admin/Pagination";
import Swal from "sweetalert2";

const UserAdmin = () => {
  const [users, setUser] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async () => {
    const data = await fetchs(searchTerm, page, pageSize);
    if (data.message === "Not found this record") {
      return setUser([]);
    }
    setUser(data.data);
    setTotalPages(data.pagination.totalPages);
  };

  const handleRemove = async (userId, status) => {
    let confirmResult;

    if (status === "ACTIVE") {
      confirmResult = await Swal.fire({
        title: "คุณแน่ใจหรือไม่?",
        text: "คุณจะไม่สามารถกู้คืนข้อมูลนี้ได้อีก!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ยืนยันการลบ",
        cancelButtonText: "ยกเลิก",
      });
    } else {
      confirmResult = await Swal.fire({
        title: "คุณแน่ใจหรือไม่?",
        text: "คุณจะกู้คืนข้อมูลนี้หรือไม่!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ยืนยันการลบ",
        cancelButtonText: "ยกเลิก",
      });
    }

    if (confirmResult.isConfirmed) {
      try {
        const response = await remove(userId);
        if (response.success) {
          if (status === "ACTIVE") {
            Swal.fire({
              title: "ลบสำเร็จ!",
              text: "ข้อมูลผู้ใช้งานถูกลบเรียบร้อยแล้ว",
              icon: "success",
              confirmButtonText: "ตกลง",
            }).then(() => {
              fetchData();
            });
          } else {
            Swal.fire({
              title: "กู้คืนสำเร็จ!",
              text: "ข้อมูลผู้ใช้งานถูกกู้คืนเรียบร้อยแล้ว",
              icon: "success",
              confirmButtonText: "ตกลง",
            }).then(() => {
              fetchData();
            });
          }
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

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    fetchData();
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
              <th className="col-field w-[10%]">วันที่สร้าง</th>
              <th className="col-field">บทบาท</th>
              <th className="w-[15%] lg:w-[20%] xl:w-[25%]"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-4 text-base text-gray-700 text-center"
                >
                  <div>
                    <p className="text-lg font-semibold">
                      ไม่มีผู้ใช้งานในระบบ
                    </p>
                    <p className="text-gray-500">
                      คุณสามารถลองค้นหาใหม่โดยใช้คำค้นหาอื่น
                      หรือเพิ่มผู้ใช้งานใหม่ได้โดยคลิกที่ปุ่ม{" "}
                      <span className="text-purple-500 font-medium">
                        "สร้างผู้ใช้งาน"
                      </span>{" "}
                      ด้านบน
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 text-base text-gray-700">
                    {(page - 1) * pageSize + index + 1}
                  </td>
                  <td className="px-6 py-4 text-base text-gray-700">
                    {user.username}
                  </td>
                  <td className="px-6 py-4 text-base text-gray-700">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 text-base text-gray-700">
                    {user.tel}
                  </td>
                  <td className="px-6 py-4 text-base text-gray-700">
                    {formatDate(user.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-base text-gray-700">
                    {user.role}
                  </td>
                  <td className="px-6 py-4 text-base text-gray-700 flex gap-2">
                    <Link to={`/admin/user/${user?.id}`} className="btn-edit">
                      แก้ไขข้อมูล
                    </Link>
                    {user.status === "ACTIVE" ? (
                      <button
                        className="btn-danger"
                        onClick={() => handleRemove(user?.id, user?.status)}
                      >
                        ลบข้อมูล
                      </button>
                    ) : (
                      <button
                        className="btn-warning"
                        onClick={() => handleRemove(user?.id, user?.status)}
                      >
                        คืนกลับ
                      </button>
                    )}
                  </td>
                </tr>
              ))
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

export default UserAdmin;
