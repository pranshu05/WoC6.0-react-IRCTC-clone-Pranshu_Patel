import { Route, Routes } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/Home'

function App() {
   return (
      <div className='text-white'>
         <div className="fixed left-0 top-0 -z-10 h-full w-full">
            <div className="flex h-full w-full bg-slate-950 pt-[40%]">
               <div className="absolute max-sm:hidden left-[-200px] top-[-100px] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
               <div className="mx-auto -mt-[150px] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.10),rgba(0,0,0,0))]"></div>
               <div className="absolute max-sm:hidden right-[-200px] top-[-100px] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
            </div>
         </div>
         <NavBar />
         <BrowserRouter>
            <Routes>
               <Route path="/" element={<Home />} />\
            </Routes>
         </BrowserRouter>
      </div>
   )
}

export default App
