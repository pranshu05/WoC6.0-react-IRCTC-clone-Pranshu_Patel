import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/auth';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged } from 'firebase/auth';
import { FaUserAlt, FaLock, FaSignInAlt, } from 'react-icons/fa';

const SignUp = () => {
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

    const handleSignUp = async (e) => {
        e.preventDefault()

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                navigate("/signin")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                setError(errorMessage);
            });
    }

    return (
        <div className="fixed left-0 top-0 h-full w-full">
            <div className="flex flex-col items-center justify-center h-full text-center content-center">
                <div className='mx-auto w-11/12 sm:w-3/4 md:w-2/3 lg:w-2/5'>
                    <div className='backdrop-filter backdrop-blur-sm py-10 bg-black bg-opacity-50 border border-gray-500 rounded-lg flex flex-col'>
                        <h2 className="mb-4 text-2xl font-extrabold leading-none tracking-tight md:text-3xl lg:text-4xl text-white">Sign Up</h2>
                        <label className="text-white flex justify-center mb-2 mt-10">Email address <FaUserAlt className='mt-1 mx-2' /></label>
                        <input className="bg-transparent border border-gray-500 mb-2 rounded-lg p-2 mx-auto w-11/12 sm:w-4/5 md:w-3/4 lg:w-2/3" type="email" label="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email address" />
                        <label className="text-white flex justify-center mb-2">Password <FaLock className='mt-1 mx-2' /></label>
                        <input className="bg-transparent border border-gray-500 mb-10 rounded-lg p-2 mx-auto w-11/12 sm:w-4/5 md:w-3/4 lg:w-2/3" type="password" label="Create password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password" />
                        {error && <p className="text-red-500 my-4">{error}</p>}
                        <button className="bg-[#303030] bg-opacity-50 hover:bg-opacity-60 border border-gray-500 mb-4 rounded-lg p-2 mx-auto w-11/12 sm:w-4/5 md:w-3/4 lg:w-1/3 flex justify-center" onClick={handleSignUp}><FaSignInAlt className='mt-1 mx-2' /> Sign Up</button>
                        <p className="text-gray-400">
                            Already have an account? <a className='text-blue-500' href="/signin">Sign In here</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
