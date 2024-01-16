import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

function App() {
   return (
      <div className='text-white'>
         <div className="fixed left-0 top-0 -z-10 h-full w-full">
            <div className="relative h-full w-full bg-slate-950"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div></div>
         </div>
         <NavBar />
         <BrowserRouter>
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/signup" element={<SignUp />} />
               <Route path="/signin" element={<SignIn />} />
               <Route path="*" element={<div className="fixed w-full h-full flex flex-row justify-center items-center text-4xl font-semibold"><h1>404 | Page Not Found</h1></div>} />
            </Routes>
         </BrowserRouter>
      </div>
   );
}

export default App;
