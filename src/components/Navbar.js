import React from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className='flex justify-between items-center w-full py-4 mx-auto bg-navback'>
      <nav>
        <ul className='text-richblack-100 flex gap-x-6'>
          <li>
            <Link to="/execution" className='text-white hover:text-grayText ml-10'>Execution</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
