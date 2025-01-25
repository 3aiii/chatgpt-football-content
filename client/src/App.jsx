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
import BlogAdmin from "./pages/admin/BlogAdmin";
import UserAdmin from "./pages/admin/UserAdmin";
import BlogAdminInsert from "./pages/admin/BlogAdminInsert";
import BlogAdminEdit from "./pages/admin/BlogAdminEdit";
import UserAdminInsert from "./pages/admin/UserAdminInsert";
import UserAdminEdit from "./pages/admin/UserAdminEdit";
import CategoriesAdmin from "./pages/admin/CategoriesAdmin";
import DashAdmin from "./pages/admin/DashAdmin";

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
        <Route path="/admin" element={<Admin />}>
          <Route path="dashboard" element={<DashAdmin />} />
          <Route path="blogs" element={<BlogAdmin />} />
          <Route path="blogs/insert" element={<BlogAdminInsert />} />
          <Route path="blog/:id" element={<BlogAdminEdit />} />
          <Route path="users" element={<UserAdmin />} />
          <Route path="users/insert" element={<UserAdminInsert />} />
          <Route path="user/:id" element={<UserAdminEdit />} />
          <Route path="categories" element={<CategoriesAdmin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
