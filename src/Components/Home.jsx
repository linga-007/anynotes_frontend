import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie"; 
import { jwtDecode } from "jwt-decode";

const Home = () => {
  const navigate = useNavigate();
  const token = Cookies.get('token'); 
  const decoded = jwtDecode(token);
  useEffect(()=>{
    if(decoded){
      console.log(decoded);
      navigate('/notes');
    }
  },[])

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <>
      <div className="h-screen w-screen relative">
        
        <div className="flex justify-center items-center h-full w-full p-2 bg-gradient-to-br from-black via-gray-900 to-green-600 text-green-400">

          <div className="flex flex-col gap-10 md:gap-16 lg:gap-20 justify-center items-center w-[90%] md:w-[80%] lg:w-[70%] font-custom relative z-10 text-center">
            <p className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-[#A4FFAF]">
              AnyNotes
            </p>
            <p className="text-xl md:text-3xl lg:text-4xl font-semibold text-[#FFFFFF]">
              Your Notes, Organized Effortlessly – Anytime, Anywhere
            </p>
            <div className="flex gap-5">
              <button
                className="px-6 py-3 bg-[#0C0C0C] text-[#A4FFAF] text-base md:text-lg lg:text-xl rounded-lg border border-[#A4FFAF] hover:bg-[#1A1A1A] transition duration-300"
                onClick={handleLogin}
              >
                Login
              </button>
              
            </div>
          </div>
        </div>

     
        <div className="absolute inset-0 z-0">
          <div className="absolute text-[#A4FFAF] text-xl md:text-2xl font-semibold animate-bounce" style={{ top: '20%', left: '10%' }}>
            copy
          </div>
          <div className="absolute text-[#A4FFAF] text-xl md:text-2xl font-semibold animate-bounce" style={{ top: '30%', left: '70%' }}>
            paste
          </div>
          <div className="absolute text-[#A4FFAF] text-xl md:text-2xl font-semibold animate-bounce" style={{ top: '50%', left: '20%' }}>
            share
          </div>
          <div className="absolute text-[#A4FFAF] text-xl md:text-2xl font-semibold animate-bounce " style={{ top: '70%', left: '80%' }}>
            type
          </div>
          <div className="absolute text-[#A4FFAF] text-xl md:text-2xl font-semibold  animate-bounce" style={{ top: '60%', left: '40%' }}>
            text
          </div>
        </div>
      </div>

   
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');

        .font-custom {
          font-family: 'Orbitron', sans-serif;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.7;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
        }

        .animate-pulse {
          animation: pulse 3s infinite ease-in-out;
        }
      `}</style>
    </>
  );
};

export default Home;
