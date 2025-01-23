import React from "react";
import Card from "./Card";
import { Link } from "react-router-dom";

const Section = () => {
  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-1 bg-[#37003c]"></div>
          <h1 className="flex text-3xl font-semibold">บทความ</h1>
          <div className="w-64 h-1 bg-[#37003c]"></div>
        </div>
        <Link to={"/blogs"} className="btn-purple px-6 py-1 text-lg mt-2">
          ดูทั้งหมด
        </Link>
      </div>
      <div className="flex gap-4">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default Section;
