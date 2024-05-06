import React, { useState } from "react";
import "../stylings/Navbar.css";
import googleImage from "../assets/google.png";
import Login from "./Login";
import Logo from "../assets/projicon.png";

export default function Navbar({
  showLogin,
  setShowLogin,
  loginStatus,
  setLoginStatus,
  user,
  setUser,
  isEmployee,
  setIsEmployee
}) {


  const handleGoogleAuthClick = () => {
    setShowLogin(true);
  };

  const handleLogout = () => {
    setLoginStatus(false);
    setUser(null);
    setShowLogin(false);
  };

  return (
    <nav className="navbar">
      <h1 className="logo" style={{ display: "flex", alignItems: "center" }}>
        <img src={Logo} style={{ height: "44px", width: "44px" }} /> CDMS
      </h1>
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
      {loginStatus ? (
        <>
          <p style={{ paddingRight: "9px" }}>Welcome {user}</p>
          <button className="button-55" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : showLogin ? (
        <Login
          loginStatus={loginStatus}
          user={user}
          setLoginStatus={setLoginStatus}
          setUser={setUser}
          isEmployee={isEmployee}
          setIsEmployee={setIsEmployee}
        />
      ) : (
        <button className="button-55" onClick={handleGoogleAuthClick}>
          Login
        </button>
      )}
    </nav>
  );
}
