import React, { useEffect, useState } from "react";
import { fetchs } from "../composables/useCate";
import { Link, useLocation } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const location = useLocation(); // ดึง URL ปัจจุบัน

  const fetchCategories = async () => {
    const response = await fetchs();
    setCategories(response);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="text-[#8f8f89] font-semibold py-3">
      <ul className="flex gap-4">
        {categories?.data?.map((category, index) => {
          const isActive =
            decodeURIComponent(location.pathname) ===
            `/category/${category?.name}`;
          return (
            <Link
              to={`category/${category?.name}`}
              key={index}
              className={`cursor-pointer relative ${
                isActive ? "text-black" : ""
              }`}
            >
              {category.name}
              {isActive && (
                <div className="absolute left-0 right-0 h-[2px] bg-black bottom-[-5px]" />
              )}
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
