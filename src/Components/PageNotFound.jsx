import React from 'react'
import error from '../Logo/error-404.png'
  import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {

  const navigate = useNavigate();
  const handleBack = () =>{
    navigate('/');
  }

  
  return (
    <>
    <div className = "w-screen h-screen">
        <div className="flex flex-col gap-8 justify-center items-center h-full w-full">
            <div className = "flex flex-col gap-3">
              <div className="">
                <img src = {error} width={240} height = {240} alt='error'></img>
            </div>
            <div className = "font-semibold text-3xl">
              Page Not Found
            </div>
            </div>
            <button className = "font-semibold text-xl border-2 border-slate-600 shadow-lg w-36 h-12 rounded-lg hover:bg-slate-100 " onClick={handleBack}>
              Home Page
            </button>
            <div className = "h-[2px] w-[60%] bg-gray-500">
             
            </div>
        </div>

    </div>
    </>
  )
}

export default PageNotFound