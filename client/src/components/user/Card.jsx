import React from "react";

const Card = () => {
  return (
    <div className="w-[246px]">
      <img
        src="https://resources.premierleague.pulselive.com/photo-resources/2024/09/18/ec0afef3-bb9a-4709-a12c-338e793a0ca9/Ollie-Watkins-Villa.jpg?width=451&height=268"
        className="w-[250px] h-[150px] object-cover rounded-lg"
      />
      <div className="font-bold my-1">วิเคราะห์ก่อนแข่ง</div>
      <h1 className="text-base font-light hover:underline cursor-pointer">
        QUIZ: Test your knowledge of Matchweek 23's fixtures
      </h1>
    </div>
  );
};

export default Card;
