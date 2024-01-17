import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/auth';
import { signInWithEmailAndPassword, getAuth, onAuthStateChanged } from 'firebase/auth';
import { FaUserAlt, FaLock, FaSignInAlt } from 'react-icons/fa';

const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const userAuth = getAuth();
    onAuthStateChanged(userAuth, (user) => {
        if (user) {
            navigate("/")
        }
    });

    const handleSignIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigate("/")
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
                setError(errorMessage);
            })
    };

    return (
        <div className="fixed left-0 top-0 h-full w-full">
            <div className="flex flex-col items-center justify-center h-full text-center content-center">
                <div className='mx-auto w-11/12 sm:w-3/4 md:w-2/3 lg:w-2/5'>
                    <div className='backdrop-filter backdrop-blur-sm py-10 bg-black bg-opacity-5 border border-gray-500 rounded-lg flex flex-col'>
                        <h2 className="mb-4 text-2xl font-extrabold leading-none tracking-tight md:text-3xl lg:text-4xl text-white">Sign In</h2>
                        <label className="text-white flex justify-center mb-2 mt-10">Email address <FaUserAlt className='mt-1 mx-2' /></label>
                        <input className="bg-transparent border border-gray-500 mb-2 rounded-lg p-2 mx-auto w-11/12 sm:w-4/5 md:w-3/4 lg:w-2/3" type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label className="text-white flex justify-center mb-2">Password <FaLock className='mt-1 mx-2' /></label>
                        <input className="bg-transparent border border-gray-500 mb-10 rounded-lg p-2 mx-auto w-11/12 sm:w-4/5 md:w-3/4 lg:w-2/3" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        {error && <p className="text-red-500 my-4">{error}</p>}
                        <button className="bg-black bg-opacity-5 hover:bg-opacity-10 border border-gray-500 mb-4 rounded-lg p-2 mx-auto w-11/12 sm:w-4/5 md:w-3/4 lg:w-1/3 flex justify-center" onClick={handleSignIn}><FaSignInAlt className='mt-1 mx-2' /> Sign In</button>
                        <p className="text-gray-400">
                            Don't have an account? <a className='text-blue-500' href="/signup">Sign Up here</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
