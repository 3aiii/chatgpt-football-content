import React, { useEffect, useState } from "react";
import axios from "axios";
import { fetchs } from "../../composables/useCate";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { create, saveLog } from "../../composables/useblog";
import { useNavigate } from "react-router-dom";
import SpeechToText from "../../components/SpeechToText";

const System = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();

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

  const fetchData = async (prompt) => {
    if (!token) {
      return Swal.fire({
        title: "กรุณาเข้าสู่ระบบ!",
        text: "คุณต้องเข้าสู่ระบบเพื่อใช้งานระบบนี้",
        icon: "warning",
        confirmButtonText: "ตกลง",
        timer: 2000,
        timerProgressBar: true,
      });
    }

    try {
      setLoading(true);
      const apiResponse = await axios.post("http://localhost:3001/api/system", {
        message: prompt,
      });

      const generatedContent = apiResponse.data.data;

      setResponse(generatedContent);
      setEditedResponse(generatedContent);

      setFormData((prevFormData) => ({
        ...prevFormData,
        content: generatedContent,
      }));
    } catch (error) {
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

  const handlePromptSubmit = async () => {
    if (userPrompt.trim() === "") return;

    if (!token) {
      return Swal.fire({
        title: "กรุณาเข้าสู่ระบบ!",
        text: "คุณต้องเข้าสู่ระบบเพื่อใช้งานระบบนี้",
        icon: "warning",
        confirmButtonText: "ตกลง",
        timer: 2000,
        timerProgressBar: true,
      });
    }

    try {
      const decoded = jwtDecode(token);
      const userId = decoded.userId;

      await saveLog(userPrompt, userId);

      fetchData(userPrompt);
    } catch (error) {
      console.error("Error saving log:", error);
      Swal.fire({
        title: "เกิดข้อผิดพลาด!",
        text: "ไม่สามารถบันทึก Log ได้",
        icon: "error",
        confirmButtonText: "ลองอีกครั้ง",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (
      !formData.title.trim() ||
      !formData.content.trim() ||
      !formData.category
    ) {
      return Swal.fire({
        title: "ข้อมูลไม่ครบ!",
        text: "โปรดกรอกข้อมูลให้ครบทุกช่อง (ชื่อบทความ, เนื้อหา, หมวดหมู่)",
        icon: "warning",
        confirmButtonText: "ตกลง",
      });
    }

    try {
      // if (imageFile) {
      //   const filetypes = /jpeg|jpg|png/;
      //   const isValidType = filetypes.test(imageFile.type); // Validate MIME type
      //   const isValidExtension = filetypes.test(
      //     imageFile.name.split(".").pop().toLowerCase()
      //   );

      //   if (!isValidType || !isValidExtension) {
      //     return Swal.fire({
      //       title: "รูปภาพไม่ถูกต้อง!",
      //       text: "โปรดอัพโหลดไฟล์รูปภาพประเภท JPEG, JPG หรือ PNG เท่านั้น",
      //       icon: "error",
      //       confirmButtonText: "ตกลง",
      //     });
      //   }
      // }

      const response = await create({
        name: formData.title,
        content: formData.content,
        cateId: formData.category,
        userId: formData.user_id,
      });

      if (response.success) {
        // const blogId = response.data; // Assuming the API response includes the created blog's ID
        // let uploadedImageUrl = null;

        // if (imageFile) {
        //   const uploadResponse = await uploadImg(blogId, imageFile); // Use blogId in the API call
        //   uploadedImageUrl = uploadResponse.url; // Adjust based on your API response structure
        // }

        Swal.fire({
          title: "สำเร็จ!",
          text: "บทความถูกสร้างเรียบร้อยแล้ว",
          icon: "success",
          confirmButtonText: "ตกลง",
        }).then(() => {
          // Clear form
          setFormData({
            upload: null,
            title: "",
            content: "",
            category: "",
          });
          navigate("/admin/blogs");
          // setImageFile(null);
        });
      } else {
        Swal.fire({
          title: "เกิดข้อผิดพลาด!",
          text: "ไม่สามารถสร้างบทความได้",
          icon: "error",
          confirmButtonText: "ลองอีกครั้ง",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "เกิดข้อผิดพลาด!",
        text: error.message,
        icon: "error",
        confirmButtonText: "ลองอีกครั้ง",
      });
    }
  };

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setFormData({
        ...formData,
        user_id: decoded.userId,
      });
    }

    fetchCategories();
  }, []);

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 px-4">
      <div className="bg-white w-full shadow-lg rounded-xl p-6 mt-4">
        {/* Header */}
        <div className="flex items-center text-3xl font-semibold text-gray-800 border-b pb-4">
          <div className="flex-grow h-1 bg-gray-300"></div>
          <h1 className="mx-4">📝 ใช้งานระบบ</h1>
          <div className="flex-grow h-1 bg-gray-300"></div>
        </div>

        {/* Input Prompt */}
        <div className="mt-6 space-y-4">
          <div className="relative">
            <input
              type="text"
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              placeholder="💬 พิมพ์ข้อความของคุณ..."
              className="w-full px-4 py-3 pr-28 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
            />
            <div className="absolute top-1/2 transform -translate-y-1/2 right-1 text-gray-500">
              <SpeechToText setPromp={setUserPrompt} />
            </div>
          </div>

          {/* Speech to Text Button */}
          <div className="flex justify-end items-center space-x-4">
            <button
              onClick={handlePromptSubmit}
              className="w-full sm:w-auto bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:bg-blue-600 active:scale-95"
            >
              🚀 ส่งคำขอ
            </button>
          </div>
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
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium">
                ✍️ เนื้อหาบทความ
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
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
              <button onClick={handleSubmit} className="btn-success">
                🚀 สร้างบทความจาก AI
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default System;
