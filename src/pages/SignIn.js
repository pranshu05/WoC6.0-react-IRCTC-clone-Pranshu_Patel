import React, { useState} from 'react';
import authFunctions from '../firebase/auth';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSignIn = async () => {
        try {
            const user = await authFunctions.signInWithEmailAndPassword(email, password);
            console.log("Signed in successfully:", user);
            navigate('/');
        } catch (error) {
            console.error("Error signing in:", error);
            setError("Incorrect email or password. Please try again.");
        }
    };

    return (
        <div className="fixed left-0 top-0 h-full w-full">
            <div className="flex flex-col items-center justify-center h-full text-center content-center">
                <h2 className="mb-4 text-2xl font-extrabold leading-none tracking-tight md:text-3xl lg:text-4xl text-white">Sign In</h2>
                <input className="bg-transparent border border-gray-500 my-2 rounded-lg p-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className="bg-transparent border border-gray-500 my-2 rounded-lg p-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {error && <p className="text-red-500">{error}</p>}
                <button className="bg-black bg-opacity-5 hover:bg-opacity-10 border border-gray-500 my-2 rounded-lg p-2" onClick={handleSignIn}>Sign In</button>
                <p className="text-gray-400">
                    Don't have an account? <a className='text-blue-500' href="/signup">Sign Up here</a>
                </p>
            </div>
        </div>
    );
};

export default SignIn;
