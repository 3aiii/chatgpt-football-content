import React from "react";
import Hero from "../components/user/Hero";
import Sidebar from "../components/user/Sidebar";
import Section from "../components/user/Section";

const Home = () => {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex justify-center bg-[#37003c] py-6 w-full">
        <div className="flex w-[1280px] gap-6 ">
          <div className="w-[25%]">
            <Sidebar />
          </div>
          <div className="w-[75%]">
            <Hero />
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full">
        <div className="w-[1280px]">
          <Section />
        </div>
      </div>
    </div>
  );
};

export default Home;
