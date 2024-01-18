import React from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import Axios from "../../Api/Axios";

const Navbar = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    const response = await Axios.get("/auth/logout", {
      withCredentials: true, // Inclure les informations du cookie
    });
    setAuth({});
    navigate("/");
  };

  return (
    <nav>
      <h2>Hello {auth.name}</h2>
      <ul>
        <Link to="/">Home</Link>
        <Link to="/profil">Profil</Link>
        {auth.name ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
