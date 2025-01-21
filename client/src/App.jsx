import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Index from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/blog/:id" />
        <Route path="/admin/dashboard" />
        <Route path="/admin/blog" />
        <Route path="/admin/user" />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
