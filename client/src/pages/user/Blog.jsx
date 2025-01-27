import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetch } from "../../composables/useblog";
import { formatDate } from "../../utils/formatDate";
import { IMAGE_URL } from "../../secret";

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState([]);

  const fetchBlog = async () => {
    const response = await fetch(id);

    setBlog(response.data);
  };

  useEffect(() => {
    fetchBlog();
  }, []);

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
    </>
  );
};

export default Blog;
