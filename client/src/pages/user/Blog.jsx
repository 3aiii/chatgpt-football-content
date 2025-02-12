import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetch, removeRating } from "../../composables/useblog";
import { formatDate } from "../../utils/formatDate";
import { HOST_URL, IMAGE_URL } from "../../secret";
import Comment from "../../components/user/comment";
import { FaRegStar, FaStar } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import axios from "axios";
import { ratings } from "./../../composables/useblog";

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState([]);
  const [user, setUser] = useState(null);
  const [rating, setRating] = useState(0);
  const [userRating, setUserRating] = useState(null);

  const handleRating = async (index) => {
    const newRating = index + 1;
    setRating(newRating);

    const response = await ratings({ rating: newRating, userId: user.id }, id);
    setUserRating(response.data);
  };

  const resetRating = async () => {
    if (userRating) {
      const response = await removeRating({ userId: user.id }, id);
      setUserRating(null);
      setRating(0);
    }
  };

  const fetchUser = async () => {
    const token = Cookies.get("token");
    const decoded = jwtDecode(token);
    const response = await axios.get(`${HOST_URL}/user/${decoded.userId}`, {
      withCredentials: true,
    });
    setUser(response?.data?.data);
  };

  const fetchBlog = async () => {
    const response = await fetch(id);
    setBlog(response?.data);

    // ค้นหา Rating ของ user ที่ล็อกอินอยู่
    const existingRating = response?.data?.Rating?.find(
      (r) => r.userId === user?.id
    );

    if (existingRating) {
      setRating(existingRating.rating);
      setUserRating(existingRating);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchBlog();
    }
  }, [user]);

  return (
    <>
      <div className="flex flex-col text-left justify-center items-center bg-gradient-to-r from-[#37003c] to-[#6a1b9a] text-white">
        <div className="my-8">
          <span className="font-semibold">{blog?.Category?.name}</span>
          <h1 className="text-5xl font-bold w-[800px] mt-2 mb-6 line-clamp-3 break-words">
            {blog?.name}
          </h1>
          <p className="text-xl"> {formatDate(blog?.createdAt)}</p>
        </div>
      </div>
      <div className="flex justify-center items-center mt-4">
        <div className="w-[800px]">
          <img
            src={
              blog?.image
                ? `${IMAGE_URL}/${blog.image}`
                : `https://placehold.co/800x400`
            }
            className="w-[800px] h-[400px] object-contain rounded-lg"
          />
          <div>
            <h2 className="text-2xl font-semibold my-2 mt-6 text-[#37003c] break-words">
              {blog?.name}
            </h2>
            <p className="break-words">{blog?.content}</p>
          </div>
        </div>
      </div>
      {/* Rating System */}
      <div className="flex flex-col text-left justify-center items-center mt-2">
        {user ? (
          <div className="w-[800px]">
            <div className="flex flex-col items-center space-y-2 p-4 pt-4 rounded-lg w-full">
              <h2 className="text-xl font-semibold">ให้คะแนนแก่บทความนี้</h2>
              <p className="text-sm text-gray-500">
                เลือกจำนวนดาวที่ต้องการให้คะแนน (1 ถึง 5 ดาว)
              </p>
              <div className="flex justify-center items-center space-x-2">
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    onClick={() => handleRating(index)}
                    className="cursor-pointer"
                  >
                    {index < rating ? (
                      <FaStar className="w-8 h-8 text-yellow-400" />
                    ) : (
                      <FaRegStar className="w-8 h-8 text-gray-300" />
                    )}
                  </div>
                ))}
              </div>

              {rating > 0 ? (
                <button
                  onClick={resetRating}
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  ยกเลิกการให้คะแนน
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>
        ) : (
          <></>
        )}
        <Comment />
      </div>
    </>
  );
};

export default Blog;
