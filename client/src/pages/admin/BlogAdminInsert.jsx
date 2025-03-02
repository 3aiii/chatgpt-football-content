import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { fetchs } from "../../composables/useCate";
import { create, uploadImg } from "../../composables/useblog";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const BlogAdminInsert = () => {
  const token = Cookies.get("token");
  const [categories, setCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    upload: null,
    title: "",
    content: "",
    category: "",
    user_id: "",
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setFormData({ ...formData, upload: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = async () => {
    try {
      if (imageFile) {
        const filetypes = /jpeg|jpg|png/;
        const isValidType = filetypes.test(imageFile.type); // Validate MIME type
        const isValidExtension = filetypes.test(
          imageFile.name.split(".").pop().toLowerCase()
        );

        if (!isValidType || !isValidExtension) {
          return Swal.fire({
            title: "รูปภาพไม่ถูกต้อง!",
            text: "โปรดอัพโหลดไฟล์รูปภาพประเภท JPEG, JPG หรือ PNG เท่านั้น",
            icon: "error",
            confirmButtonText: "ตกลง",
          });
        }
      }

      const response = await create({
        name: formData.title,
        content: formData.content,
        cateId: formData.category,
        userId: formData.user_id,
      });

      if (response.success) {
        const blogId = response.data; // Assuming the API response includes the created blog's ID
        let uploadedImageUrl = null;

        if (imageFile) {
          const uploadResponse = await uploadImg(blogId, imageFile); // Use blogId in the API call
          uploadedImageUrl = uploadResponse.url; // Adjust based on your API response structure
        }

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
          setImageFile(null);
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

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setFormData({
        ...formData,
        user_id: decoded.userId,
      });
    }

    fetchCategories();
  }, [token]);

  return (
    <div className="p-4">
      <div className="h-[1px] bg-black w-full mb-4 rounded-md border-[1px]"></div>

      <div className="flex flex-col">
        {/* Upload Image */}
        <div className="container-input w-full">
          <label>รูปภาพบทความ</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="border text-base bg-white p-2 focus:outline-none focus:border-black"
          />
        </div>

        {/* Show Uploaded Image */}
        {formData.upload && (
          <div className="mt-4">
            <img
              src={formData.upload}
              alt="Uploaded"
              className="mt-2 w-full max-w-xs rounded-md shadow-md"
            />
          </div>
        )}

        {/* Title */}
        <div className="flex gap-4 mt-4">
          <div className="container-input w-full">
            <label>
              หัวข้อ <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="หัวข้อบทความ"
              value={formData.title}
              onChange={handleInputChange}
              className="input-field"
            />
          </div>
          <div className="container-input w-full">
            <label>
              หมวดหมู่บทความ <span className="text-red-500">*</span>
            </label>
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
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2 mt-4">
          <label>
            เนื้อหาบทความ <span className="text-red-500">*</span>
          </label>
          <textarea
            name="content"
            className="w-full h-[200px] input-field"
            placeholder="พิมพ์เนื้อหาบทความ"
            value={formData.content}
            onChange={handleInputChange}
          ></textarea>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            className="btn-cancel text-md"
            onClick={() =>
              setFormData({
                upload: null,
                title: "",
                content: "",
                category: "",
              })
            }
          >
            ยกเลิก
          </button>
          <button className="btn-success text-md" onClick={handleSubmit}>
            ยืนยัน
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogAdminInsert;
