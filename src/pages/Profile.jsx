import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/auth';
import { toast, Toaster } from 'react-hot-toast';

const Profile = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [dob, setDOB] = useState('');
    const [state, setState] = useState('');
    const [username, setUsername] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [gender, setGender] = useState('');
    const [userLoaded, setUserLoaded] = useState(false);

    const userAuth = getAuth();

    useEffect(() => {
        onAuthStateChanged(userAuth, async (user) => {
            if (!user) {
                navigate('/');
            } else {
                setEmail(user.email);

                const userDocRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setFirstName(userData.firstName || '');
                    setLastName(userData.lastName || '');
                    setMiddleName(userData.middleName || '');
                    setDOB(userData.dob || '');
                    setState(userData.state || '');
                    setUsername(userData.username || '');
                    setPhoneNo(userData.phoneNo || '');
                    setGender(userData.gender || '');
                }

                setUserLoaded(true);
            }
        });
    }, [userAuth, navigate]);

    const handleSignOut = async () => {
        try {
            await signOut(userAuth);
            navigate('/');
        } catch (error) {
            console.error('Error signing out', error);
        }
    };

    const handleUpdateProfile = async () => {
        try {
            const user = userAuth.currentUser;

            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                await updateDoc(userDocRef, {
                    firstName: firstName,
                    lastName: lastName,
                    middleName: middleName,
                    dob: dob,
                    state: state,
                    username: username,
                    phoneNo: phoneNo,
                    gender: gender,
                });
            } else {
                await setDoc(userDocRef, {
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    middleName: middleName,
                    dob: dob,
                    state: state,
                    username: username,
                    phoneNo: phoneNo,
                    gender: gender,
                });
            }

            toast.success('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile. Please try again.');
        }
    };

    return (
        <div className="fixed left-0 top-0 -z-10 h-full w-full">
            <div className="flex flex-col items-center justify-center h-full text-center content-center">
                <div className="mx-auto w-11/12 md:w-5/6 lg:w-4/5 backdrop-filter backdrop-blur-sm bg-black bg-opacity-5 border border-gray-500 rounded-lg p-5">
                    <h2 className="mb-2 text-2xl font-extrabold leading-none tracking-tight text-white">Welcome</h2>
                    <p className="text-gray-50">{email}</p>
                    <div className="backdrop-filter backdrop-blur-sm py-5 px-2 bg-black bg-opacity-5 border border-gray-500 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-2 my-2">
                        <div className="grid grid-cols-2 gap-2">
                            <p className="text-gray-50 mx-2 p-2">First Name</p>
                            <input className="mx-2 p-2 rounded-md border border-gray-500 bg-transparent text-gray-200" type="text" placeholder={`Enter your first name${userLoaded ? ` ${firstName}` : ''}`} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <p className="text-gray-50 mx-2 p-2">Middle Name</p>
                            <input className="mx-2 p-2 rounded-md border border-gray-500 bg-transparent text-gray-200" type="text" placeholder={`Enter your middle name${userLoaded ? ` ${middleName}` : ''}`} value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <p className="text-gray-50 mx-2 p-2">Last Name</p>
                            <input className="mx-2 p-2 rounded-md border border-gray-500 bg-transparent text-gray-200" type="text" placeholder={`Enter your last name${userLoaded ? `${lastName}` : ''}`} value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <p className="text-gray-50 mx-2 p-2">Username</p>
                            <input className="mx-2 p-2 rounded-md border border-gray-500 bg-transparent text-gray-200" type="text" placeholder={`Enter your username${userLoaded ? `${username}` : ''}`} value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <p className="text-gray-50 mx-2 p-2">Gender</p>
                            <select className="mx-2 p-2 rounded-md border border-gray-500 bg-transparent text-gray-200" value={gender} onChange={(e) => setGender(e.target.value)}>
                                <option value="" disabled>Select your gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <p className="text-gray-50 mx-2 p-2">Date of Birth</p>
                            <input className="mx-2 p-2 rounded-md border border-gray-500 bg-transparent text-gray-200" type="date" value={dob} onChange={(e) => setDOB(e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <p className="text-gray-50 mx-2 p-2">Phone Number</p>
                            <input className="mx-2 p-2 rounded-md border border-gray-500 bg-transparent text-gray-200" type="tel" placeholder="Enter your phone number" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <p className="text-gray-50 mx-2 p-2">State</p>
                            <input className="mx-2 p-2 rounded-md border border-gray-500 bg-transparent text-gray-200" type="text" placeholder={`Enter your state${userLoaded ? `${state}` : ''}`} value={state} onChange={(e) => setState(e.target.value)} />
                        </div>
                    </div>
                    <button className="bg-black bg-opacity-5 hover:bg-opacity-10 border border-gray-500 my-2 rounded-lg p-2 mx-2 " onClick={handleUpdateProfile}>
                        Update Profile
                    </button>
                    <button className="bg-black bg-opacity-5 hover:bg-opacity-10 border border-gray-500 my-2 rounded-lg p-2 mx-2 " onClick={handleSignOut}>
                        Sign Out
                    </button>
                </div>
            </div>
            <Toaster position="top-center" />
        </div>
    );
};

export default Profile;
