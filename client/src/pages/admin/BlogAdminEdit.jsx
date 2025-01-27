import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { fetch, update, uploadImg } from "../../composables/useblog";
import { fetchs } from "../../composables/useCate";
import { IMAGE_URL } from "../../secret";

const BlogAdminEdit = () => {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    upload: null,
    title: "",
    content: "",
    category: "",
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
        const isValidType = filetypes.test(imageFile?.type); // Validate MIME type
        const isValidExtension = filetypes.test(
          imageFile?.name?.split(".").pop().toLowerCase()
        ); // Validate extension

        if (!isValidType || !isValidExtension) {
          return Swal.fire({
            title: "รูปภาพไม่ถูกต้อง!",
            text: "โปรดอัพโหลดไฟล์รูปภาพประเภท JPEG, JPG หรือ PNG เท่านั้น",
            icon: "error",
            confirmButtonText: "ตกลง",
          });
        }
      }

      if (formData.category === null) {
        return Swal.fire({
          title: "กรุณาใส่หมวดหมู่!",
          text: "โปรดเลือกหมวดหมู่ของบทความ",
          icon: "error",
          confirmButtonText: "ตกลง",
        });
      }

      await update(
        {
          name: formData.title,
          content: formData.content,
          cateId: formData.category,
        },
        id
      );
      const blogId = id;
      let uploadedImageUrl = null;

      if (imageFile && imageFile instanceof File) {
        console.log(imageFile);
        const uploadResponse = await uploadImg(blogId, imageFile); // Use blogId in the API call
        uploadedImageUrl = uploadResponse.url; // Adjust based on your API response structure
      }

      return Swal.fire({
        title: "สำเร็จ!",
        text: "บทความถูกอัปเดตเรียบร้อยแล้ว",
        icon: "success",
        confirmButtonText: "ตกลง",
      }).then(() => {
        setImageFile(null);
        fetchData(); // ดึงข้อมูลที่อัปเดตมาแสดงใหม่
      });
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

  const fetchData = async () => {
    const response = await fetch(id);
    setFormData({
      upload: response?.data?.image || null,
      title: response?.data?.name,
      content: response?.data?.content,
      category: response?.data?.categoryId,
      user_id: response?.data?.user_id,
    });
  };

  useEffect(() => {
    fetchData();
    fetchCategories();
  }, []);

  return (
    <div className="p-4">
      {/* Divider */}
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

        {formData.upload && (
          <img
            src={
              formData.upload.startsWith("blob:")
                ? formData.upload
                : IMAGE_URL + "/" + formData.upload
            }
            alt="Selected Preview"
            className="mt-2 w-full max-w-xs rounded-md shadow-md"
          />
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
          <button className="btn-cancel text-md" onClick={() => fetchData()}>
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

export default BlogAdminEdit;
