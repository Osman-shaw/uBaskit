import {BrowserRouter , Routes, Route} from 'react-router-dom';
import Navbar from  './components/Navbar'
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import Support from './pages/support';
import About from './pages/About';
import Service from './pages/Service';
import Edsa from './pages/edsa';
import Airtime from './pages/Airtime';
import Bundle from './pages/Bundle';
import Movies from './pages/Movies';
import Transaction from './pages/Transactions';
import AdminDashboard from './Dashboard/index';


import './index.css'


import PropTypes from 'prop-types';

const App=()=> {


  const MainLayout = ({ children }) => (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );

   MainLayout.propTypes = {
    children: PropTypes.node.isRequired,
  };
  

  return (
    <div className="main-app-container">
         <BrowserRouter>
           <Routes>
            <Route path="/" element={<MainLayout><Home/></MainLayout>}/> 
            <Route path="/Login" element={<MainLayout><Login/></MainLayout>}/>
            <Route path="/signUp" element={<MainLayout><SignUp/></MainLayout>}/>
            <Route path="/bundle" element={<MainLayout><Bundle/></MainLayout>}/>
            <Route path="/support" element={<MainLayout><Support/></MainLayout>}/>
            <Route path="/about" element={<MainLayout><About/></MainLayout>}/>
             <Route path="/service" element={<MainLayout><Service/></MainLayout>}/>
            <Route path="/movies" element={<MainLayout><Movies/></MainLayout>}/>
            <Route path="/edsa" element={<MainLayout><Edsa/></MainLayout>}/>
            <Route path="/transactions" element={<MainLayout><Transaction/></MainLayout>}/>
            <Route path="/airtime" element={<MainLayout><Airtime/></MainLayout>}/>
            <Route path="/admin" element={<AdminDashboard/>}/> 
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
