import React, { useEffect, useState } from "react";
import RecommendCard from "./RecommendCard";
import { FaSignsPost } from "react-icons/fa6";
import { recommand } from "../../composables/useblog";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [recommands, setRecommends] = useState([]);

  useEffect(() => {
    const fetchReccomand = async () => {
      const { data } = await recommand();
      setRecommends(data);
    };

    fetchReccomand();
  }, []);

  return (
    <div className="border-[1px] rounded-lg">
      <div className="font-semibold p-2 text-white rounded-tr-lg rounded-tl-lg text-2xl text-center bg-gradient-to-r from-[#37003c] to-[#6a1b9a]">
        แนะนำ
        <br />
        บทความ
      </div>
      <div className="bg-white border-[1px] rounded-br-lg rounded-bl-lg text-center px-4 py-2">
        <p className="flex items-center gap-2 text-lg font-semibold text-[#37003c]">
          <FaSignsPost />
          บทความที่แนะนำ 5 บทความ
        </p>
        {recommands?.map((recommand, index) => (
          <RecommendCard recommand={recommand} key={index} />
        ))}
        <button
          onClick={() => navigate("/blogs")}
          className="btn-purple w-full py-2 mt-4"
        >
          ดูทั้งหมด
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
