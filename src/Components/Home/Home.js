import React, { useEffect, useState } from 'react';
import Products from '../Products/Products';
import SearchBar from '../SearchBar/SearchBar';
import  './Home.css';


const Home = () => {

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
            <div className="container">
            <div className="row">
            { 
                products.map(product=><Products key={product._id} product={product}/>)
                
            }
            </div>
            </div>
        </div>
    );
};

export default Home;