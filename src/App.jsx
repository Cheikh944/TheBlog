import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home.jsx";
import Blog from "./pages/Blog.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profil from "./pages/Profil.jsx";
import CreateBlog from "./pages/CreateBlog.jsx";
import UpdateBlog from "./pages/UpdateBlog.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import "./App.css";
import { AuthProvider } from "./context/authContext.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import PersistLogin from "./components/PersistLogin.jsx";

function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route element={<PersistLogin />}>
            <Route path="/" element={<Home />} />
            <Route path="/blog/:id" element={<Blog />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<RequireAuth />}>
              <Route path="/profil" element={<Profil />} />
              <Route path="/create" element={<CreateBlog />} />
              <Route path="/update/:id" element={<UpdateBlog />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
