import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../Logo/AnyNotes_Logo.png'
import toast, { Toaster } from 'react-hot-toast';

const Signup = () => {
    const navigate = useNavigate();
    const [username , setUserName] = useState();
    const [password , setPassword] = useState();
    const [isLoading, setIsLoading] = useState(false); // New loading state
    
    // console.log(process.env.REACT_APP_BACKEND_URL);
    const handleLogin = async() =>{
      setIsLoading(true);
        try{
            const res = await axios.post(`https://anynotes-backend.vercel.app/user/signup` , {
                username,
                password
            },
            {
                headers : { 'Content-Type': 'application/json'}
            } 
        )
        console.log(res);
        if(res.status === 201){
          toast.success('User created successfully!');
          setIsLoading(false)
          
          setTimeout(() => {
            navigate('/notes');
          }, 2000);
        }
        else if(res.status === 400){
          toast.error('Invalid credentials. Please try again.');
          setIsLoading(false);
        }
        }
        catch(error){
          if(error.status === 400){
            toast.error('Username already Exists');
            setUserName("");
            setPassword("");
            setIsLoading(false);
          }
            console.error('Error logging in:', error);
        }
    }
  return (
    <div className="flex justify-center items-center h-screen bg-[#212121] text-white">
      <Toaster />
      <div className="w-full max-w-md p-8 space-y-6  bg-[#5E686D] rounded-lg shadow-md">
        <div className="flex flex-col items-center">
          <img
            src={logo}
            alt=" Logo"
            className="w-20 h-30  "
          />
          <h2 className="mt-6 text-2xl font-semibold text-center">
            Sign up to AnyNotes
          </h2>
        </div>
        <div className="mt-8 space-y-4" >
          <div>
            <label htmlFor="username" className="block text-sm font-medium">
              Username 
            </label>
            <input
              type="text"
              id="username"
              className="w-full mt-1 p-2 text-black border rounded-md focus:outline-none "
              onChange={(e)=>setUserName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium ">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full mt-1 p-2 text-black border rounded-md focus:outline-none"
              onChange={(e)=>setPassword(e.target.value)}
            />
            {/*  */}
          </div>
          {isLoading ? (
                        <div className="flex justify-center">
                            <div className="w-6 h-6 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <button
                            type="submit"
                            className="w-full py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600"
                            onClick={handleLogin}
                        >
                            Sign up
                        </button>
                    )}
        </div>
        <div className="text-center text-sm">
          
          <p className="mt-2">
            Already have an Account ? {" "}
            <button className="text-blue-400 hover:underline font-semibold text-md" onClick={(e)=> navigate('/login')}>
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup