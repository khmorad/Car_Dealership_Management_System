import React, { useState } from "react";
import "../stylings/Navbar.css";
import googleImage from "../assets/google.png";
import Login from "./Login";
import Logo from "../assets/projicon.png"
export default function Navbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false); // Initialize login status as false
  const [user, setUser] = useState(null); // State for current user

  const handleGoogleAuthClick = () => {
    setShowLogin(true);
  };

  const handleLogout = () => {
    setLoginStatus(false); // Set login status to false
    setUser(null); // Clear user state
    setShowLogin(false); // Hide the login component
  };

  return (
    <nav className="navbar">
      <h1 className="logo"><img src={Logo} style={{height: "44px", width:"44px", }}/></h1>
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
          <p style={{paddingRight: "9px"}}>Welcome {user}</p>
          <button className="button-55" onClick={handleLogout}>Logout</button>
        </>
      ) : showLogin ? (
        <Login loginStatus={loginStatus} user={user} setLoginStatus={setLoginStatus} setUser={setUser}/>
      ) : (
        <button className="button-55" onClick={handleGoogleAuthClick}>
          Login
        </button>
      )}
    </nav>
  );
}
