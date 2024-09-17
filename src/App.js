import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import { useEffect, useState } from 'react'


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
 

  return (
    <div className="w-screen h-screen bg-deepBlue flex flex-col">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>

      <Routes>

        <Route path="/execution" element= {<Home isLoggedIn={isLoggedIn}/>} />
        <Route path="/dashboard" element = {<Dashboard/>} />
      </Routes>

    </div>
    )
}

export default App;
