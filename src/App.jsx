import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Profile from './pages/Profile';

function App() {
   return (
      <div className='text-white'>
         <div className="fixed left-0 top-0 -z-10 h-full w-full bg-[url('https://images.pexels.com/photos/716834/pexels-photo-716834.jpeg')] bg-cover">
         </div>
         <NavBar />
         <BrowserRouter>
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/signup" element={<SignUp />} />
               <Route path="/signin" element={<SignIn />} />
               <Route path="/profile" element={<Profile />} />
               <Route path="*" element={<div className="fixed w-full h-full flex flex-row justify-center items-center text-4xl font-semibold"><h1>404 | Page Not Found</h1></div>} />
            </Routes>
         </BrowserRouter>
      </div>
   );
}

export default App;
