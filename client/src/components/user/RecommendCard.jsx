import React from "react";

const RecommendCard = () => {
  return (
    <div className="flex mt-2 cursor-pointer">
      <img
        src="https://resources.premierleague.pulselive.com/photo-resources/2025/01/22/9adfab93-6ee7-48b7-ab38-d6aa658907ca/GettyImages-2195359048.jpg?width=451&height=268"
        className="w-12 h-12 bg-cover object-cover rounded-md"
      />
      <div className="ml-2">
        <h1 className="text-sm leading-5 font-semibold text-left line-clamp-2">
          Man City surrender two-goal lead to leave qualification in the balance
        </h1>
        <p className="text-xs line-clamp-1 text-left">
          A music superstar, a world champion, a 13-time Premier League winner
          and more. How many did you spot last weekend?
        </p>
      </div>
    </div>
  );
};

export default RecommendCard;
