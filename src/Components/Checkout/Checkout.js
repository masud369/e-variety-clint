import React, { useEffect, useState, useContext } from "react";
import { UserContext } from '../../App';


const Checkout = () => {
  const [orders, setOrders] = useState([]);
  const [loginUser,setLoginUser] = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:4400/getorder?email="+loginUser.email,{
      method:"GET",
      headers:  {
       "Content-Type":"application/json",
       authorization: `Bearer ${sessionStorage.getItem("token")}`,
      
       }
})
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        console.log(data);
      })


  },[]);
//   const pInfo = JSON.parse(sessionStorage.getItem('porductInfo'));

// setOrders(pInfo);

// console.log(orders)


const totalPrice = (porders)=>{
  return <div>
    {porders.map(order=>console.log(order.price))}
  </div>
}

  return (
    <div style={{ marginTop: "125px" }}>
      {()=>totalPrice(orders)}
      <div className="container box">
        <h5
          style={{
            display: "flex",
            borderBottom: "1px solid #dbdbdb",
            padding: "20px",
            color: "#7e7777",
          }}
        >
          <span style={{ width: "40%" }}>Description</span>
          <span style={{ width: "30%" }}>Quantity</span>{" "}
          <span style={{ width: "30%" }}>Price</span>
        </h5>
        {orders.map((order) => (
          <div>
            <h5 style={{ display: "flex" }}>
              <span style={{ width: "40%" }}>{order.name}</span>
              <span className="px-3" style={{ width: "30%" }}>
                {order.quantity || 1}
              </span>
              <span style={{ width: "30%" }}>{order.price}</span>
            </h5>
          </div>
       ))} 
        <h5
          style={{
            display: "flex",
            borderTop: "1px solid #dbdbdb",
            padding: "20px",
          }}
        >
          <span style={{ width: "40%" }}>Total</span>
          <span style={{ width: "30%" }}></span>{" "}
          <span style={{ width: "30%" }}>{()=>totalPrice(orders)}</span>
        </h5>
      </div>
    </div>
  );
};

export default Checkout;
