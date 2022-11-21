import React, { useContext } from 'react';
import { UserContext } from '../../App';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AddBoxIcon from '@mui/icons-material/AddBox';
import InventoryIcon from '@mui/icons-material/Inventory';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Button } from '@mui/material';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";


const drawerWidth = 240;

function Addproduct(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

const [imgUrl,setImgUrl] = React.useState(null);

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

const [loginUser, setLoginUser] = useContext(UserContext);

  const onSubmit = (data) => {
    const productDetails = {name:data.name,weight:data.weight,price:data.price,imageUrl:imgUrl,email:loginUser.email}
    console.log(productDetails);
    fetch(`http://localhost:4400/addproducts`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(productDetails)
    })
};
const navigate = useNavigate();
const handelActivate = (e)=>{
    console.log(e.target.innerText)
    if(e.target.innerText === 'Manage Product'){
        navigate("/manageproduct");
    }
}
const active = {
    backgroundColor:"6c3f3fde",
}

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {['Manage Product', 'Add Product', 'Edit Product'].map((text, index) => (
          <ListItem className={active} style={{backgroundColor:"6c3f3fde"}} key={text} disablePadding>
            <ListItemButton onClick={handelActivate} >
              <ListItemIcon>
                {index % 2 === 0 ? <InventoryIcon /> : <AddBoxIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

//api calling
const [products, setProducts] = React.useState([]);


    React.useEffect(()=>{
        fetch("http://localhost:4400/allproducts")
        .then(res=>res.json())
        .then(data=>{
            setProducts(data)
            console.log(data);
        })
    },[])




  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
           <h2 id="title"> Add Product</h2>
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <div style={{marginTop: "20px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input name="name" {...register("name")} placeholder="product name" /><br /><br />
        <input name="weight" {...register("weight")} placeholder="product weight" /><br /><br />
        <input name="price" {...register("price")} placeholder="product price" /><br /><br />
        <input type="file"  name="price" onChange={handelUploadImg} /><br /><br />

        <input type="submit" />
      </form>
    </div>
      </Box>
    </Box>
  );
}



export default Addproduct;