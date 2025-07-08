import {BrowserRouter , Routes, Route} from 'react-router-dom';
import Navbar from  './components/Navbar'
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import Support from './pages/support';
import About from './pages/About';
//import Service from './pages/Service';
//import Dashboard from './Dashboard/index.jsx';

import './index.css'

const App=()=> {

  return (
    <div className="main-app-container">
         <BrowserRouter>
          <Navbar />
           <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/Login" element={<Login/>}/>
            <Route path="/signUp" element={<SignUp/>}/>
            <Route path="/support" element={<Support/>}/>
            <Route path="/about" element={<About/>}/>
            {/* <Route path="/service" element={<Service/>}/> */}
            {/* <Route path="/dashboard" element={<Dashboard/>}/> */}
          </Routes>
          <Footer />
        </BrowserRouter>
    </div>
  )
}

export default App
