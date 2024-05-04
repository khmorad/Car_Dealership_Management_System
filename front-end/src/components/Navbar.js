import React, { useState } from "react";
import "../stylings/Navbar.css";
import googleImage from "../assets/google.png";
import Login from "./Login";

export default function Navbar() {
  const [showLogin, setShowLogin] = useState(false);

  const handleGoogleAuthClick = () => {
    setShowLogin(true);
  };

  return (
    <nav className="navbar">
      <h1 className="logo">Logo</h1>
      <ul className="nav-menu">
        <li className="nav-item">
          <a className="bruh" href="#home">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a href="#about">About</a>
        </li>
        <li className="nav-item">
          <a href="#services">Services</a>
        </li>
        <li className="nav-item">
          <a href="#contact">Contact</a>
        </li>
      </ul>
      {showLogin ? (
        <Login />
      ) : (
        <button className="button-55" onClick={handleGoogleAuthClick}>
          Login
        </button>
      )}
    </nav>
  );
}
