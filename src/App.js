import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import {useState } from 'react'


function App() {
  return (
    <div className="w-screen h-screen bg-deepBlue flex flex-col">
      <Navbar/>

      <Routes>
        <Route path="/execution" element= {<Home/>} />
      </Routes>

    </div>
    )
}

export default App;
