import {BrowserRouter , Routes, Route} from 'react-router-dom';
import Navbar from  './components/Navbar'
//import Footer from './components/Footer';
import Home from './pages/Home';
//import Login from './Auth/Login';
//import SignUp from './Auth/SignUp';
//import Support from './pages/support';
//import About from './pages/About';
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
          </Routes>
        </BrowserRouter>
     
    </div>
  )
}

export default App
