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
import Manageproduct from './Components/Addporduct/Addproduct';
import Addproduct from './Components/Test/Test';
function App() {
  return (
    <Router>
      <Header/>
      <Routes > 
        <Route path='/' element={<Home/>} /> 
        
        <Route path='/home' element={<Home/>} /> 
        <Route path='/orders' element={<Order/>} /> 
        <Route path='/admin' element={<Admin/>} /> 
        <Route path='/deals' element={<Deals/>} /> 
        <Route path='/login' element={<Login/>} /> 
        <Route path='/manageproduct' element={<Manageproduct/>} /> 
        <Route path='/addproduct' element={<Addproduct/>} /> 
        <Route path='/checkout' element={<Checkout/>} /> 
        <Route path='*' element={<Nomatch/>} /> 
          
      </Routes >
    </Router>
  );
}

export default App;
