import { matchPath, Outlet, useLocation } from "react-router-dom";

import React from "react";
import Navbar from "./../components/Navbar";
import Footer from "./../components/Footer";
import Categories from "../components/Categories";

const Index = () => {
  const location = useLocation();
  const isEditPage = matchPath("/edit/:id", location.pathname);

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center items-center bg-[#37003c] w-full">
        <Navbar />
      </div>
      <div className="flex w-[1280px]">
        <Categories />
      </div>
      <div className="w-full">
        <Outlet />
      </div>
      {isEditPage ? (
        <></>
      ) : (
        <div className="w-full bg-[#37003c] text-white mt-6">
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Index;
