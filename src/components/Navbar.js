import React from 'react'
// import logo from "../assets/Logo.svg"
import {Link} from "react-router-dom"
import {toast} from "react-hot-toast"


const Navbar = (props) => {

  return (
    <div className='flex justify-between items-center w-11/12 max-w-[1160px] py-4 mx-auto bg-d'>

        {/* <Link to="/"> 
            <img src={logo} alt="Logo" width={160} height={32} loading="lazy"/>
        </Link> */}

        <nav>
            <ul className='text-richblack-100 flex gap-x-6'>
                <li>
                    <Link to="/execution">Execution</Link>
                </li>
                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                {/* <li>
                    <Link to="/">Execution</Link>
                </li>
                <li>
                    <Link to="/">Contact</Link>
                </li> */}
            </ul>
        </nav>
      
    </div>
  )
}

export default Navbar
