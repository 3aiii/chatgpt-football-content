import React, { useEffect, useState } from "react";
import { createComment, getComment } from "../../composables/useblog";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const Comment = () => {
  const { id } = useParams();
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);
  const token = Cookies.get("token");

  const handleComment = async () => {
    if (!token) {
      return Swal.fire({
        title: "เกิดข้อผิดพลาด!",
        text: "กรุณาเข้าสู่ระบบก่อนส่งความคิดเห็น",
        icon: "warning",
        confirmButtonText: "ตกลง",
      });
    }

    const decoded = jwtDecode(token);

    try {
      const response = await createComment(id, decoded?.userId, text);

      if (response.success) {
        await Swal.fire({
          title: "สำเร็จ!",
          text: "ความคิดเห็นของคุณถูกส่งเรียบร้อยแล้ว!",
          icon: "success",
          confirmButtonText: "ปิด",
        }).then(() => {
          fetchComment();
        });
      } else {
        Swal.fire({
          title: "เกิดข้อผิดพลาด!",
          text: response.message,
          icon: "error",
          confirmButtonText: "ลองใหม่",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "เกิดข้อผิดพลาด!",
        text: error.message,
        icon: "error",
        confirmButtonText: "ลองใหม่",
      });
    }
  };

  const fetchComment = async () => {
    try {
      const response = await getComment(id);

      if (response.success) {
        setComments(response.data);
      } else {
        Swal.fire({
          title: "เกิดข้อผิดพลาด!",
          text: response.message,
          icon: "error",
          confirmButtonText: "ลองใหม่",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "เกิดข้อผิดพลาด!",
        text: error.message,
        icon: "error",
        confirmButtonText: "ลองใหม่",
      });
    }
  };

  useEffect(() => {
    fetchComment();
  }, []);

  return (
    <div className="w-[800px]">
      <h2 className="text-2xl font-semibold pt-42 my-2 text-[#37003c]">
        ความคิดเห็น
      </h2>
      <div className="flex flex-col items-center justify-end">
        <textarea
          type="text"
          placeholder="ความคิดเห็นของคุณ"
          onChange={(e) => setText(e.target.value)}
          className="w-full h-28 p-2 rounded-lg border-[1px] focus:outline-none focus:border-[#37003c]"
        ></textarea>
        <div className="flex justify-end w-full">
          <button
            onClick={handleComment}
            className="bg-[#37003c] w-fit mt-4 text-white px-4 py-2 rounded-lg"
          >
            ส่งความคิดเห็น
          </button>
        </div>
      </div>
      <div className="mt-4">
        {comments?.map((comment, index) => (
          <div key={index} className={`flex items-center gap-4 mb-4 `}>
            <img
              src="https://placehold.co/50x50"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <div className="font-semibold text-lg">
                {comment?.user?.fname} {comment?.user?.lname}
              </div>
              <div className="break-words">{comment?.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
