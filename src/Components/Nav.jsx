import React from 'react'
import logo from '../Logo/AnyNotes_Logo.png'

const Nav = () => {
  return (
    <>
    {/* design a login page */}
    <div className='flex items-center justify-between px-6 bg-[#212121] pl-20 pr-10 border-b border-b-white'>
        <div className='flex justify-center items-center'>
            <img className='' src={logo} alt='AnyNotes Logo' width={70} height={70}/>
            
        </div>
        <div>
            <button className='bg-white text-black font-semibold hover:bg-gray-700 px-3 py-2 rounded-md'>github</button>
        </div>
    </div>
    </>
  )
}

export default Nav