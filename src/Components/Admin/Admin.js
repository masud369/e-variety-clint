import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Admin = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

const [imgUrl,setImgUrl] = useState(null);

const handelUploadImg = (e)=>{
    console.log(e.target.files[0]);
    const imgData = new FormData();
    imgData.set("key", "53433d21376253ff0f620ce96344c01d")
    imgData.append('image', e.target.files[0])

    axios.post('https://api.imgbb.com/1/upload',imgData)
    .then((res)=>{
        setImgUrl(res.data.data.display_url);
    })
    .catch((err)=>{
        console.log(err);
    })

}

  const onSubmit = (data) => {
    const productDetails = {name:data.name,weight:data.weight,price:data.price,imageUrl:imgUrl}
    console.log(productDetails);
    fetch(`http://localhost:4400/addproducts`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(productDetails)
    })
};

  return (
    <div style={{ color: "red", fontSize: "23px", marginTop: "200px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input name="name" {...register("name")} placeholder="product name" /><br /><br />
        <input name="weight" {...register("weight")} placeholder="product weight" /><br /><br />
        <input name="price" {...register("price")} placeholder="product price" /><br /><br />
        <input type="file"  name="price" onChange={handelUploadImg} /><br /><br />

        <input type="submit" />
      </form>
    </div>
  );
};

export default Admin;
