import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Reset from './pages/Auth/Reset';
import Register from './pages/Auth/Register';
import Forgot from './pages/Auth/Forgot';
import Login from './pages/Auth/Login';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home__ from './pages/Home/Home__';

axios.defaults.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
    <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/forgot' element={<Forgot />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/resetpassword/:resettoken' element={<Reset />}/>
        <Route path='/dashboard' element={<Home__ />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
