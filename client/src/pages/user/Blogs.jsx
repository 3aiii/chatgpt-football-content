import React, { useEffect, useState } from "react";
import CardBlog from "../../components/user/CardBlog";
import { fetchs } from "../../composables/useblog";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const response = await fetchs();
    setBlogs(response.data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="w-[1280px]">
        <div className="flex items-center w-full text-4xl font-semibold gap-4">
          <div className="flex-grow h-1 bg-black"></div>
          <h1 className="flex justify-center text-3xl font-semibold">
            บทความทั้งหมด
          </h1>
          <div className="flex-grow h-1 bg-black"></div>
        </div>
        <div className="grid grid-cols-4 mt-6 gap-4">
          {blogs?.map((blog, index) => (
            <CardBlog blog={blog} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
