import React from "react";
import { GoogleLogin } from 'react-google-login';
import "../stylings/Navbar.css";

export default function Navbar() {
  const responseGoogle = (response) => {
    console.log(response);
    // Here you can handle the response from Google login
  };

  const onFailure = (error) => {
    console.error("Google login failed:", error);
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
      <GoogleLogin
        clientId="864226610425-r76gr5i0irkil13r7kn7cfsds5s244uf.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        className="button-55"
      />
    </nav>
  );
}
