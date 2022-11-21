import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes ,
  Route,
  Link
} from "react-router-dom";
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Nomatch from './Components/Nomatch/Nomatch';
import Deals from './Components/Deals/Deals';
import Admin from './Components/Admin/Admin';
import Order from './Components/Orders/Order';
import Login from './Components/Login/Login';
import Checkout from './Components/Checkout/Checkout';
import Manageproduct from './Components/Manageproduct/Manageproduct';
import Addproduct from './Components/Addproduct/Addproduct';
import { createContext, useState } from 'react';
import PrivetRout from './Components/PrivetRoute/PrivetRout';

export const UserContext = createContext();

function App() {
const [loginUser, setLoginUser] = useState({});

  return (
    <UserContext.Provider value={[loginUser, setLoginUser]}>
    <Router>
      <Header/>
      <Routes > 
        <Route path='/' element={<Home/>} /> 
        
       <Route  path="/home" element={ <Home />} />
        {/* <Route path='/home' element={<Home/>} />  */}
        <Route path='/orders' element={<Order/>} /> 
        <Route path='/admin' element={<Admin/>} /> 
        <Route path='/deals' element={<Deals/>} /> 
        <Route path='/login' element={<Login/>} /> 
        <Route path="/manageproduct" element={<PrivetRout />}>
          <Route path='/manageproduct' element={<Manageproduct/>} /> 
        </Route>
        <Route path="/addproduct" element={<PrivetRout />}>
           <Route path='/addproduct' element={<Addproduct/>} />   
        </Route>  
        <Route path="/checkout" element={<PrivetRout />}>
         <Route path='/checkout' element={<Checkout/>} />
        </Route>
           
        <Route path='*' element={<Nomatch/>} /> 
          
      </Routes >
    </Router>
    </UserContext.Provider>
  );
}

export default App;
