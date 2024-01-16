import React, { useState} from 'react';
import authFunctions from '../firebase/auth';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = async () => {
        try {
            const user = await authFunctions.signUpWithEmailAndPassword(email, password);
            console.log("Signed up successfully:", user);
            navigate('/signin'); 
        } catch (error) {
            console.error("Error signing up:", error);
        }
    };

    return (
        <div className="fixed left-0 top-0 h-full w-full">
            <div className="flex flex-col items-center justify-center h-full text-center content-center">
                <h2 className="mb-4 text-2xl font-extrabold leading-none tracking-tight md:text-3xl lg:text-4xl text-white">Sign Up</h2>
                <input className="bg-transparent border border-gray-500 my-2 rounded-lg p-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className="bg-transparent border border-gray-500 my-2 rounded-lg p-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="bg-black bg-opacity-5 hover:bg-opacity-10 border border-gray-500 my-2 rounded-lg p-2" onClick={handleSignUp}>Sign Up</button>
                <p className="text-gray-400">
                    Already have an account? <a className='text-blue-500' href="/signin">Sign In here</a>
                </p>
            </div>
        </div>
    );
};

export default SignUp;