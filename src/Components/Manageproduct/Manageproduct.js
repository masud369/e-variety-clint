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
import { useNavigate } from "react-router-dom";


const drawerWidth = 240;

function Manageproduct(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
const navigate = useNavigate();
const handelButton = (e)=>{
    console.log(e.target.innerText)
    if(e.target.innerText === 'Add Product'){
      navigate('/addproduct');
    }
}

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {['Manage Product', 'Add Product', 'Edit Product'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={handelButton}>
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
const [loginUser, setLoginUser] = useContext(UserContext);

    React.useEffect(()=>{
        fetch("http://localhost:4400/wonproducts?email="+loginUser.email,{
          method:"GET",
          headers:{
            "Content-Type":"application/json",
            authorization: `Bearer ${sessionStorage.getItem("token")}`,
          
          }
        })
        .then(res=>res.json())
        .then(data=>{
            setProducts(data)
        })
    },[])


const handelDelete =(id)=>{
  fetch(`http://localhost:4400/product/${id}`,{method:"DELETE"})
  navigate('/manageproduct');
}


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
           <h2 id="title"> Manage Product</h2>
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
        <div className="container box">
        <h5
          style={{
            display: "flex",
            borderBottom: "1px solid #dbdbdb",
            padding: "20px",
            color: "#7e7777",
          }}
        >
          <span style={{ width: "40%" }}>Name</span>
          <span style={{ width: "20%" }}>Weight</span>{" "}
          <span style={{ width: "20%" }}>Price</span>
          <span style={{ width: "20%" }}>Action</span>
        </h5>
        {products.map((product) => (
          <div>
            <h6 style={{ display: "flex" }}>
              <span style={{ width: "40%" }}>{product.name}</span>
              <span className="px-3" style={{ width: "20%" }}>
                {product.weight}
              </span>
              <span style={{ width: "20%" }}>{product.price}</span>
              <span style={{ width: "20%" }}> <Button size="small" color="success" variant="contained"><BorderColorIcon/></Button> <Button variant="contained" color="error" size='small' onClick={()=>handelDelete(product._id)}><DeleteForeverIcon/></Button>  </span>
            </h6>
          </div>
        ))}
        
      </div>
      </Box>
    </Box>
  );
}



export default Manageproduct;