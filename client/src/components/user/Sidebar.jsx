import React from "react";
import RecommendCard from "./RecommendCard";

const Sidebar = () => {
  return (
    <div className="border-[1px] rounded-lg">
      <div className="font-semibold p-2 text-white rounded-tr-lg rounded-tl-lg text-2xl text-center bg-gradient-to-r from-[#37003c] to-[#6a1b9a]">
        แนะนำ
        <br />
        บทความ
      </div>
      <div className="bg-white border-[1px] rounded-br-lg rounded-bl-lg text-center px-4 py-2">
        <p className="text-lg font-semibold">บทความที่แนะนำ 5 บทความ</p>
        <RecommendCard />
        <RecommendCard />
        <RecommendCard />
        <RecommendCard />
        <RecommendCard />
        <button className="btn-purple w-full py-2 mt-4">ดูทั้งหมด</button>
      </div>
    </div>
  );
};

export default Sidebar;
