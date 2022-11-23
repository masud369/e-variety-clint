import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import Products from '../Products/Products';
import SearchBar from '../SearchBar/SearchBar';
import Spineer from '../Spineer/Spineer';
import  './Home.css';


const Home = () => {
    const [loginUser,setLoginUser] = useContext(UserContext);
    const [products, setProducts] = useState([]);


    useEffect(()=>{
        fetch("http://localhost:4400/allproducts")
        .then(res=>res.json())
        .then(data=>{
            setProducts(data)
        })
    },[])
    return (
        <div className='homContainer' style={{color:'red',marginTop:"200px"}}>
            <div className="searchContainer"> 
            <SearchBar style={{display:'block',margin:'0 auto'}} />
            </div>
            <div className='spneerContainer' style={{margin:'0 auto',textAlign:'center'}} id="spineer"> 
                <Spineer/>
            </div>
            
             <div style={{display:'none'}}>
             {products.length && (document.getElementById("spineer").style.display = "none")}
             </div>
            
            <div className="container">
            <div className="row">
            { 
                products.map((product)=>(
                   
                    <Products key={product._id} product={product}/>
                   
                ))
                
            }
            </div>
            <h2>{loginUser.name}</h2>
            </div>
        </div>
    );
};

export default Home;