import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { fetch } from "../../composables/useCate";
import CardBlog from "../../components/user/CardBlog";
import { MdOutlineError } from "react-icons/md";
const Category = () => {
  const [categoryData, setCategoryData] = useState([]);
  const { name } = useParams();
  const location = useLocation();

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await fetch(name);
      setCategoryData(response.data);
    };
    fetchCategory();
  }, [name]);

  return (
    <div className="flex justify-center">
      <div className="w-[1280px]">
        <div
          className="flex flex-col justify-center items-center gap-y-4 py-12 
            border-b-[1px]"
        >
          <h1 className="flex items-center w-full text-4xl font-semibold gap-4">
            <div className="flex-grow h-1 bg-black"></div>
            <span>{categoryData?.findCate?.name}</span>
            <div className="flex-grow h-1 bg-black"></div>
          </h1>

          <Link
            to={`/`}
            className={`btn-purple w-fit px-4 py-2 text-xl ${
              location.pathname === "/" ? "bg-purple-700 text-white" : ""
            }`}
          >
            GO TO HOME PAGE
          </Link>
        </div>
        <div className="grid grid-cols-4 mt-6 gap-4">
          {categoryData?.blogs?.length !== 0 ? (
            categoryData?.blogs?.map((blog, index) => (
              <CardBlog key={index} blog={blog} />
            ))
          ) : (
            <div className="col-span-4 text-center text-[#37003c] flex flex-col items-center">
              <MdOutlineError size={78} />
              <p className="mt-2 text-2xl font-semibold">
                ขออภัย ไม่มีข้อมูลบล็อกในขณะนี้
              </p>
              <p className="mt-1 text-sm text-gray-500">
                กรุณากลับมาตรวจสอบอีกครั้งในภายหลัง
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;
