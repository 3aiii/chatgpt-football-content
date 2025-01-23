import React from "react";
import { Outlet, useLocation } from "react-router-dom";

const Auth = () => {
  const location = useLocation();
  const containerWidth =
    location.pathname === "/login" ? "w-[900px]" : "w-[1280px]";

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gradient-to-b from-[#0d4fa4] via-[#187bcd] to-[#8fcffd]">
      <div
        className={`flex ${containerWidth} bg-white border rounded-lg shadow-md`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Auth;
