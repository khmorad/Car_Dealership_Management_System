import React from 'react'
import { Space } from "antd";
import PageContent from "./components/PageContent";
import SideMenu from "./components/SideMenu";
import "./App.css"
import Navbar from './components/Navbar';

export default function Cardash() {
  return (
    <div className='App'>
    <div className="SideMenuAndPageContent">
      
      <SideMenu></SideMenu>
      <PageContent></PageContent>
    </div>
    </div>
  )
}
