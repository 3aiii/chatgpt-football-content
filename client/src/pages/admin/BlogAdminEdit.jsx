import React, { useState } from "react";

const BlogAdminEdit = () => {
  const [formData, setFormData] = useState({
    image: null,
    title: "",
    content: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
    alert("ข้อมูลถูกส่งเรียบร้อยแล้ว");
  };

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

        {/* Show Uploaded Image */}
        {formData.image && (
          <div className="mt-4">
            <img
              src={formData.image}
              alt="Uploaded"
              className="mt-2 w-full max-w-xs rounded-md shadow-md"
            />
          </div>
        )}

        {/* Title */}
        <div className="container-input w-full mt-4">
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
            onClick={() => setFormData({ image: null, title: "", content: "" })}
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

export default BlogAdminEdit;
