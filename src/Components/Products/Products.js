import React, { useContext } from 'react';
import { UserContext } from '../../App';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function Products({ product }) {
    const navigate = useNavigate()
    const [loginUser,setLoginUser] = useContext(UserContext);
const handelorder = (p)=>{
    console.log({p});

    const productDetails = {name:p.name,weight:p.weight,imgeUrl:p.imageUrl,price:p.price,email:loginUser.email}
    fetch('http://localhost:4400/order',{
        method:'POST',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(productDetails)
    })
    navigate("/checkout")
}

  return (
    <div className="col-md-4 my-2">
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image={product.imageUrl}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="p" component="div">
            {product.name}-{product.weight}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">{product.price}</Button>
          <Button size="small" onClick={()=>handelorder(product)}>Buy now</Button>
        </CardActions>
      </Card>
    </div>
  );
}
