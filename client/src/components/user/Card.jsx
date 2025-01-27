import React from "react";
import { Link } from "react-router-dom";

const Card = ({ blog }) => {
  return (
    <Link to={`/blog/1`} className="w-[246px] cursor-pointer">
      <img
        src="https://resources.premierleague.pulselive.com/photo-resources/2024/09/18/ec0afef3-bb9a-4709-a12c-338e793a0ca9/Ollie-Watkins-Villa.jpg?width=451&height=268"
        className="w-[250px] h-[150px] object-cover rounded-lg"
      />
      <div className="text-sm font-bold my-1">วิเคราะห์ก่อนแข่ง</div>
      <h1 className="text-base font-light hover:underline cursor-pointer line-clamp-2 break-words">
        QUIZ: Test your knowledge of Matchweek 23's fixtures
      </h1>
    </Link>
  );
};

export default Card;
