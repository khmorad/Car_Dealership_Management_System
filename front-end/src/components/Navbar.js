import React, {useEffect} from "react";
import "../stylings/Navbar.css";
import googleImage from "../assets/google.png"
export default function Navbar() {
  const handleGoogleAuthClick = () => {
    const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID
    const CLIENT_SECRET_ID = process.env.REACT_APP_GOOGLE_CLIENT_SECRET
    const REDURECT_URL = process.env.REACT_APP_REDURECT_URL
    const oauthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    oauthUrl.searchParams.set('client_id', "864226610425-r76gr5i0irkil13r7kn7cfsds5s244uf.apps.googleusercontent.com"); // Replace with your ID
    oauthUrl.searchParams.set('redirect_uri', "http://localhost:3000"); 
    oauthUrl.searchParams.set('scope', 'profile email'); 
    oauthUrl.searchParams.set('response_type', 'code'); 
  
    window.location.href = oauthUrl.toString();
    console.log(window.location.href)
  };
  useEffect(() => {
    // Check if there is an authorization code in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      // Perform the exchange of the authorization code for an access token on your server-side
      // Once you have the access token, you can make requests to Google APIs to fetch user data
      fetchUserData(code);
    }
  }, []);

  const fetchUserData = async (code) => {
    // Perform the exchange of the authorization code for an access token on your server-side
    // For demonstration purposes, let's assume you have a backend API endpoint that handles this exchange
    const response = await fetch(`/api/google-auth?code=${code}`);
    const data = await response.json();

    // Assuming the response contains the user's data
    console.log("User's name:", data.name);
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
      <button className="button-55" onClick={handleGoogleAuthClick} >
Login</button>
    </nav>
  );
}
