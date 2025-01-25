import React, { useEffect, useState } from "react";
import { FaUser, FaClipboard, FaFolder } from "react-icons/fa";
import { sumOfData, UserLogData } from "./../../composables/useDash";
import Pagination from "../../components/admin/Pagination";
import { formatDate } from "../../utils/formatDate";

const DashAdmin = () => {
  const [data, setData] = useState({
    SumOfUser: 0,
    SumOfBlog: 0,
    SumOfCategory: 0,
  });
  const [userLogs, setUserLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Load summary data
  const loadSummaryData = async () => {
    try {
      const result = await sumOfData();
      setData(result.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถโหลดข้อมูลสรุปได้ กรุณาลองใหม่",
      });
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const loadUserLogs = async (page = 1, pageSize = 10) => {
    try {
      const result = await UserLogData(page, pageSize);
      setUserLogs(result.data);
      setTotalPages(result.pagination.totalPages);
      setCurrentPage(result.pagination.currentPage);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถโหลดข้อมูลบันทึกผู้ใช้ได้ กรุณาลองใหม่",
      });
    }
  };

  useEffect(() => {
    loadSummaryData();
  }, []);

  useEffect(() => {
    loadUserLogs(currentPage);
  }, [currentPage]);

  return (
    <div className="p-4">
      {/* Card Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="card bg-blue-500 text-white rounded-lg shadow-lg p-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">{data.SumOfUser}</h2>
            <p className="text-xl font-semibold">จำนวณผู้ใช้งานทั้งหมด</p>
          </div>
          <FaUser className="text-3xl" />
        </div>

        <div className="card bg-green-500 text-white rounded-lg shadow-lg p-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">{data.SumOfBlog}</h2>
            <p className="text-xl font-semibold">จำนวนบทความทั้งหมด</p>
          </div>
          <FaClipboard className="text-3xl" />
        </div>

        <div className="card bg-purple-500 text-white rounded-lg shadow-lg p-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">{data.SumOfCategory}</h2>
            <p className="text-xl font-semibold">จำนวณหมวดหมู่ทั้งหมด</p>
          </div>
          <FaFolder className="text-3xl" />
        </div>
      </div>

      {/* User Log Table */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">User Logs</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">ผู้ใช้งาน</th>
                <th className="border px-4 py-2">สถานะ</th>
                <th className="border px-4 py-2">ข้อความ</th>
                <th className="border px-4 py-2">ล็อกอินเมื่อ</th>
              </tr>
            </thead>
            <tbody>
              {userLogs.map((log, index) => (
                <tr key={log.id}>
                  <td className="text-center border px-4 py-2">{index + 1}</td>
                  <td className="text-center border px-4 py-2">
                    {log.username}
                  </td>
                  <td className={`text-center border px-4 py-2`}>
                    {log.status}
                  </td>
                  <td className=" border px-4 py-2">{log.message}</td>
                  <td className="text-center border px-4 py-2">
                    {formatDate(log.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="container mx-auto p-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default DashAdmin;
