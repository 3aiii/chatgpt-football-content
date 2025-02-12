import React from "react";
import { Link } from "react-router-dom";
import { FaStar, FaComment, FaClock } from "react-icons/fa";
import { formatDate } from "./../../utils/formatDate";
import { IMAGE_URL } from "../../secret";

const CardBlog = ({ blog }) => {
  console.log(blog);
  return (
    <Link
      to={`/blog/${blog.id}`}
      className="w-full cursor-pointer flex flex-col justify-start h-full"
    >
      <img
        src={
          blog.image
            ? `${IMAGE_URL}/${blog.image}`
            : `https://placehold.co/350x200`
        }
        className="w-[350px] h-[200px] object-cover rounded-md aspect-[16/9]"
      />
      <div className="text-sm font-bold my-1 mb-0">{blog?.Category?.name}</div>
      <div className="flex-grow">
        <h2 className="font-bold text-lg line-clamp-2 break-words">
          {blog?.name}
        </h2>
        <p className="line-clamp-2 text-sm font-light break-words">
          {blog?.content}
        </p>
      </div>
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center gap-2">
          <FaClock className="text-purple-500" />
          <span className="text-sm font-light">
            {formatDate(blog?.createdAt)}
          </span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <FaStar className="text-yellow-500" />
            <p className="text-sm font-light">
              {blog?.averageRating?.toFixed(2)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <FaComment className="text-purple-500" />
            <p className="text-sm font-light">{blog?._count?.Comment}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardBlog;
