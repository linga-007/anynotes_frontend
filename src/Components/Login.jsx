import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate , useLocation} from 'react-router-dom';
import logo from '../Logo/AnyNotes_Logo.png'
import Cookies from "js-cookie";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = new URLSearchParams(location.search).get("from") || "/notes";

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false); // New loading state

    const handleLogin = async () => {
        setIsLoading(true); // Start loading
        try {
            const res = await axios.post(
                `https://anynotes-backend.vercel.app/user/login`,
                { username, password },
                { headers: { 'Content-Type': 'application/json' } }
            );
            Cookies.set("token", res.data.token, { expires: 1 });
            if (res.status === 201) {
                navigate(from, { replace: true });
            }
        } catch (error) {
            console.error('Error logging in:', error);
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-[#212121] text-white">
            <div className="w-full max-w-md p-8 space-y-6 bg-[#5E686D] rounded-lg shadow-md">
                <div className="flex flex-col items-center">
                    <img src={logo} alt=" Logo" className="w-20 h-30" />
                    <h2 className="mt-6 text-2xl font-semibold text-center">
                        Sign in to AnyNotes
                    </h2>
                </div>
                <div className="mt-8 space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="w-full mt-1 p-2 text-black border rounded-md focus:outline-none"
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full mt-1 p-2 text-black border rounded-md focus:outline-none"
                            onChange={(e) => setPassword(e.target.value)}
                        />
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
                            Sign in
                        </button>
                    )}
                </div>
                <div className="text-center text-sm">
                    <p className="mt-2">
                        New to AnyNotes?{" "}
                        <button
                            className="text-blue-400 hover:underline  font-semibold text-md"
                            onClick={() => navigate('/signup')}
                        >
                            Create an account
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
