import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const Profile = () => {
    const navigate = useNavigate();
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [uid, setUid] = useState(''); 

    const userAuth = getAuth();
    useEffect(() => {
        onAuthStateChanged(userAuth, (user) => {
            if (!user) {
                navigate("/");
            } else {
                setDisplayName(user.displayName || 'User');
                setEmail(user.email);
                setUid(user.uid);
            }
        });
    }, [userAuth, navigate]);

    const handleSignOut = async () => {
        try {
            await signOut(userAuth);
            navigate("/");
        } catch (error) {
            console.error("Error signing out", error);
        }
    };

    return (
        <div className="fixed left-0 top-0 -z-10 h-full w-full">
            <div className="flex flex-col items-center justify-center h-full text-center content-center">
                <div className='mx-auto w-11/12 sm:w-3/4 md:w-2/3 lg:w-2/5'>
                    <div className='backdrop-filter backdrop-blur-sm py-5 px-2 bg-black bg-opacity-5 border border-gray-500 rounded-lg flex flex-col'>
                        <h2 className="mb-2 text-2xl font-extrabold leading-none tracking-tight text-white">Welcome {displayName}</h2>
                        <p className="text-gray-400">Email: {email}</p>
                        <p className="text-gray-400">UID: {uid}</p>
                        <button className="bg-black bg-opacity-5 hover:bg-opacity-10 border border-gray-500 my-2 rounded-lg p-2 mx-auto w-11/12 sm:w-4/5 md:w-3/4 lg:w-1/3" onClick={handleSignOut}>Sign Out</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
