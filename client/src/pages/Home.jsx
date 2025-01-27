import React, { useEffect, useState } from "react";
import Hero from "../components/user/Hero";
import Sidebar from "../components/user/Sidebar";
import Section from "../components/user/Section";
import { fetchs } from "../composables/useblog";

const Home = () => {
  const [heroblogs, setheroBlogs] = useState([]);
  const [blogs, setBlogs] = useState([]);

  const fetchheroBlogs = async () => {
    const response = await fetchs("", 1, 3);

    setheroBlogs(response.data);
  };

  const fetchBlogs = async () => {
    const response = await fetchs("", 1, 5);

    setBlogs(response.data);
  };

  useEffect(() => {
    fetchheroBlogs();
    fetchBlogs();
  }, []);

  return (
    <div className="flex flex-col justify-center">
      <div className="flex justify-center bg-[#37003c] py-6 w-full">
        <div className="flex w-[1280px] gap-6 ">
          <div className="w-[25%]">
            <Sidebar />
          </div>
          <div className="w-[75%]">
            <Hero heroblogs={heroblogs} />
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full">
        <div className="w-[1280px]">
          <Section blogs={blogs} />
        </div>
      </div>
    </div>
  );
};

export default Home;
