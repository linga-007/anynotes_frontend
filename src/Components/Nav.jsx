import React from 'react'
import logo from '../Logo/AnyNotes_Logo.png'
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
const Nav = () => {
  
  const navigate = useNavigate();

  const handleLogout = () => {   
    Cookies.remove("token");
    navigate("/login");
  }

  return (
    <>
    {/* design a login page */}
    <div className='flex items-center justify-between px-6 bg-[#212121] pl-20 pr-10 border-b border-b-white'>
        <div className='flex justify-center items-center cursor-pointer' onClick={(e)=> navigate('/notes')}>
            <img className='' src={logo} alt='AnyNotes Logo' width={70} height={70}/>
            
        </div>
        <div>
            <button className='bg-white text-black font-semibold hover:bg-gray-700 px-3 py-2 rounded-md' onClick={handleLogout}>Logout</button>
        </div>
    </div>
    </>
  )
}

export default Nav