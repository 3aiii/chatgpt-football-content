import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Registraion from "./pages/Registraion";
import Auth from "./layouts/Auth";
import Index from "./layouts/Index";
import Home from "./pages/Home";
import Blogs from "./pages/user/Blogs";
import Blog from "./pages/user/blog";
import Admin from "./layouts/Admin";
import Edit from "./pages/user/Edit";
import System from "./pages/user/System";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Index />}>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/system" element={<System />} />
        </Route>
        <Route path="/" element={<Auth />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Registraion />} />
        </Route>
        <Route element={<Admin />}>
          <Route path="/admin/dashboard" />
          <Route path="/admin/blog" />
          <Route path="/admin/user" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
