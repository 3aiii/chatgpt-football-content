import React from "react";
import { IMAGE_URL } from "../../secret";
import { Link } from "react-router-dom";

const RecommendCard = ({ recommand }) => {
  return (
    <Link
      to={`/blog/${recommand?.blogs?.id}`}
      className="flex mt-2 cursor-pointer"
    >
      <img
        src={
          recommand?.blogs?.image
            ? `${IMAGE_URL}/${recommand?.blogs?.image}`
            : `https://placehold.co/48x48`
        }
        className="w-12 h-12 bg-cover object-cover rounded-md"
      />
      <div className="ml-2">
        <h1 className="text-sm leading-5 font-semibold text-left line-clamp-2">
          {recommand?.blogs?.name}{" "}
        </h1>
        <p className="text-xs line-clamp-1 text-left break-words break-all">
          {recommand?.blogs?.content}{" "}
        </p>
      </div>
    </Link>
  );
};

export default RecommendCard;
