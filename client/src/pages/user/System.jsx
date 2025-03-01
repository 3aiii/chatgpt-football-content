import React, { useEffect, useState } from "react";
import axios from "axios";
import { fetchs } from "../../composables/useCate";
import Swal from "sweetalert2";

const System = () => {
  const [userPrompt, setUserPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [editedResponse, setEditedResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    upload: null,
    title: "",
    content: "",
    category: "",
    user_id: "",
  });
  console.log(response);
  const fetchData = async (prompt) => {
    try {
      setLoading(true);
      const apiResponse = await axios.post("http://localhost:3001/api/system", {
        message: prompt,
      });

      setResponse(apiResponse.data.data);
      setEditedResponse(apiResponse.data.data);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const categories = await fetchs();
      setCategories(categories);
    } catch (error) {
      Swal.fire({
        title: "เกิดข้อผิดพลาด!",
        text: error.message,
        icon: "error",
        confirmButtonText: "ลองอีกครั้ง",
      });
    }
  };

  const handlePromptSubmit = () => {
    if (userPrompt.trim() === "") return;
    fetchData(userPrompt);
  };

  const handleChange = (e) => {
    setEditedResponse(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 px-4">
      <div className="w-[1280px] bg-white shadow-lg rounded-xl p-6 mt-4">
        {/* Header */}
        <div className="flex items-center text-3xl font-semibold text-gray-800 border-b pb-4">
          <div className="flex-grow h-1 bg-gray-300"></div>
          <h1 className="mx-4">📝 ใช้งานระบบ</h1>
          <div className="flex-grow h-1 bg-gray-300"></div>
        </div>

        {/* Input Prompt */}
        <div className="mt-6 space-y-4">
          <input
            type="text"
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            placeholder="💬 พิมพ์ข้อความของคุณ..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-lg "
          />
          <button
            onClick={handlePromptSubmit}
            className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg shadow-md transition-all duration-300 transform hover:bg-blue-600 active:scale-95"
          >
            🚀 ส่งคำขอ
          </button>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="text-center mt-6">
            <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-600 mt-2">กำลังโหลด...</p>
          </div>
        )}

        {/* Response Section */}
        {response && !loading && (
          <div className="mt-6 border-t pt-6 space-y-4">
            <div>
              <label className="text-gray-700 font-medium">📌 หัวข้อ</label>
              <input
                type="text"
                className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium">
                ✍️ เนื้อหาบทความ
              </label>
              <textarea
                value={editedResponse}
                onChange={handleChange}
                rows="6"
                className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end gap-4">
              <select
                name="category"
                value={formData.category}
                className="input-field"
                onChange={handleInputChange}
              >
                <option value="">เลือกหมวดหมู่</option>
                {categories?.data?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <button className="btn-success">🚀 สร้างบทความจาก AI</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default System;
