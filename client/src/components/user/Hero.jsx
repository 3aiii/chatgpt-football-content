import React from "react";
import { IMAGE_URL } from "../../secret";
import { Link } from "react-router-dom";

const Hero = ({ heroblogs }) => {
  return (
    <div className="text-white">
      <div className="grid grid-cols-3 grid-rows-2 gap-4">
        {heroblogs[0] && (
          <Link
            to={`/blog/${heroblogs?.[0]?.id}`}
            className="flex flex-col row-span-2 col-span-2 cursor-pointer"
          >
            <img
              src={
                heroblogs?.[0]?.image
                  ? `${IMAGE_URL}/${heroblogs[0]?.image}`
                  : `https://placehold.co/600x300`
              }
              alt={heroblogs[0]?.name}
              className="w-full h-[300px] object-cover rounded-lg"
            />
            <div className="font-bold my-2">{heroblogs[0]?.Category?.name}</div>
            <div className="text-2xl font-bold mb-2 hover:underline line-clamp-2 break-words">
              {heroblogs[0]?.name}
            </div>
            <div className="text-sm line-clamp-4 break-words">
              {heroblogs[0]?.content}
            </div>
          </Link>
        )}

        {heroblogs.slice(1, 3).map((blog, index) => (
          <Link to={`/blog/${blog?.id}`} key={index} className="cursor-pointer">
            <img
              src={
                blog?.image
                  ? `${IMAGE_URL}/${blog?.image}`
                  : `https://placehold.co/300x170`
              }
              alt={blog?.name}
              className="w-[300px] object-cover rounded-lg"
            />
            <div className="text-sm font-bold my-2 mb-1">
              {blog?.Category?.name}
            </div>
            <div className="text-base hover:underline mb-2 line-clamp-2">
              {blog?.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Hero;
