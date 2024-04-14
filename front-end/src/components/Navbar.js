import React from "react";
import "../stylings/Navbar.css";

export default function Navbar() {
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
      <button className="button-55">Login</button>
    </nav>
  );
}
