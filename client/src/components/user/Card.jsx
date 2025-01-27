import React from "react";
import { Link } from "react-router-dom";
import { IMAGE_URL } from "../../secret";

const Card = ({ blog }) => {
  return (
    <Link to={`/blog/${blog?.id}`} className="w-[246px] cursor-pointer">
      <img
        src={
          blog.image
            ? `${IMAGE_URL}/${blog.image}`
            : `https://placehold.co/350x200`
        }
        className="w-[250px] h-[150px] object-cover rounded-lg"
      />
      <div className="text-sm font-bold my-1">{blog?.Category?.name}</div>
      <h1 className="text-base font-light hover:underline cursor-pointer line-clamp-2 break-words">
        {blog?.name}
      </h1>
    </Link>
  );
};

export default Card;
