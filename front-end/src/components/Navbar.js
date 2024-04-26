import React from "react";
import "../stylings/Navbar.css";
import googleImage from "../assets/google.png"
export default function Navbar() {
  const handleGoogleAuthClick = () => {
    const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID
    const CLIENT_SECRET_ID = process.env.REACT_APP_GOOGLE_CLIENT_SECRET
    const REDURECT_URL = process.env.REACT_APP_REDURECT_URL
    const oauthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    oauthUrl.searchParams.set('client_id', CLIENT_ID); // Replace with your ID
    oauthUrl.searchParams.set('redirect_uri', REDURECT_URL); 
    oauthUrl.searchParams.set('scope', 'profile email'); 
    oauthUrl.searchParams.set('response_type', 'code'); 
  
    window.location.href = oauthUrl.toString();
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
      <button className="button-55" onClick={handleGoogleAuthClick} ><img src={googleImage} alt='Google' style={{ width: '12px', height: '12px', marginRight: "5px" }}/>
Login</button>
    </nav>
  );
}
