import './App.css';
import React,{useEffect, useState} from "react";
import Navbar from "./Components/Navbar/Navbar"
import { useProduct } from './Context/ProductContext';
import { RestApiCalls } from './CallRestApi';
import { ProductListingPage } from './Components/ProductListingPage/ProductListingPage';
import {
 Routes,
  Route,
} from "react-router";
import { CartListing } from './Components/Cart/CartListing';
import { WishlistListing } from './Components/Wishlist/WishlistListing';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Home } from './Components/Home/Home';
import { Login } from './Components/Login/Login';
import { SignUp } from './Components/Login/SignUp';
import { PrivateRoutes } from './Components/Navbar/PrivateRoutes';
import { AuthProvider, useAuth } from './Context/AuthContext';



function App() {
  const [openHamburger, setOpenHamburger] = useState(false);
  const {state,dispatch} = useProduct();
  const [status,setStatus] = useState({
    loading:true,
    error:false
  })
  const {auth} = useAuth();
  console.log(auth)
  useEffect(() => {
    // setStatus({...status,loading:true})
    //fetching products
    (async function () {
      const { response, error } = await RestApiCalls("GET", "api/products");
      if (!error) {
        dispatch({ type: "SET_PRODUCTS", payload: response });
      }
    })();

    //fetching cart
    (async function () {
      const { response, error } = await RestApiCalls("GET", "api/carts");
      if (!error) {
        dispatch({ type: "SET_CART", payload: response });
        setStatus({...status,loading:false});

      }
    })();

    //fetching wishlist
    (async function () {
      const { response, error } = await RestApiCalls("GET", "api/wishlists");
      if (!error) {
        dispatch({ type: "SET_WISHLIST", payload: response });
      }
    })();
  }, []);
  if(state.overlay){
    document.body.style.overflow="hidden"
  }
  else {
    document.body.style.overflow="scroll"
  }
  return (
    <div className ="App" style = {{display:"flex",flexDirection:"column"}}>
      
      <Navbar
      openHamburger={openHamburger}
      setOpenHamburger={setOpenHamburger}
      />
      <div>
      {status.loading ? 
      <div className = "loader">
        <CircularProgress color = "inherit"/>
      </div> : 
      <Routes>
        <Route path = "/products/women" element = {<ProductListingPage />}/>
        <Route path = "/products/men" element = {<ProductListingPage/>}/>
        <Route path = "/products/sneakers" element = {<ProductListingPage/>}/>
        <Route path = "/"  element = {<Home/>}/>
        <PrivateRoutes path = "/checkout/cart" element = {<CartListing/>}/>
        <PrivateRoutes path = "/wishlist" element = {<WishlistListing/>}/>

      </Routes>} 
      </div>
      <Routes>
      <Route path = "/login" element = {<Login/>} />
        <Route path = "/signup" element = {<SignUp/>} />
      </Routes>

      {auth.loading && <div className = "loader">
        <CircularProgress color = "inherit"/>
      </div>}
    </div>
  );
}

export default App;
